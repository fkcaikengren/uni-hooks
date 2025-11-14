import { tryOnScopeDispose } from '@caikengren/uni-hooks-shared';
import { isPromise } from '@caikengren/uni-hooks-shared';

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type UniMethod = FunctionKeys<Uni>;

export interface InterceptorOptions<F extends UniMethod = UniMethod> {
  /** 返回 false 则终止执行 */
  invoke?: (args: Parameters<Uni[F]>) => void | boolean;

  success?: Parameters<Uni[F]>[0]['success'] | ReturnType<Uni[F]>;

  fail?: Parameters<Uni[F]>[0]['fail'] | ((err: any) => void);

  complete?: Parameters<Uni[F]>[0]['complete'] | (() => void);
}

const globalInterceptors: Record<string, Record<string, InterceptorOptions>> = {};
const originMethods = {} as Record<UniMethod, any>;

/**
 *
 * 参考实现 https://github.com/uni-helper/uni-use/blob/main/src/useInterceptor
 *
 */
function wrappMethod(method: UniMethod) {
  // 判断是否已经包装过
  if (method in originMethods) {
    // 直接返回
    return uni[method];
  }

  // 获取原始方法
  const origin = uni[method];
  // 记录原始方法
  originMethods[method] = origin;
  // 原函数的类型定义
  type FN = typeof origin;

  // 开始包裹函数
  uni[method] = ((...args: Parameters<FN>) => {
    // 获取拦截器
    const interceptors = globalInterceptors[method] || {};
    // 实际起作用的拦截器
    const effectInterceptors: InterceptorOptions<UniMethod>[] = [];

    // invoke 在函数执行前运行，返回false则终止此拦截器执行后续的 success / fail / complete 回调
    for (const [_key, interceptor] of Object.entries(interceptors)) {
      if (interceptor.invoke && interceptor.invoke(args) === false) {
        continue;
      }

      effectInterceptors.push(interceptor);
    }

    /**
     * 判断函数是否符合异步函数的参数
     * 含有 success / fail / complete 的async函数将不会返回promise
     * @see https://uniapp.dcloud.net.cn/api/#api-promise-%E5%8C%96
     */
    const hasAsyncOption = args.length === 1
    && ((args[0] as any).success || (args[0] as any).fail || (args[0] as any).complete);

    if (hasAsyncOption) {
      const opt = args[0];

      const oldSuccess = opt.success;
      opt.success = (result: any) => {
        for (const interceptor of effectInterceptors) {
          interceptor.success?.(result);
        }
        oldSuccess?.(result);
      };

      const oldFail = opt.fail;
      opt.fail = (err: any) => {
        for (const interceptor of effectInterceptors) {
          interceptor.fail?.(err);
        }
        oldFail?.(err);
      };

      const oldComplete = opt.complete;
      opt.complete = () => {
        for (const interceptor of effectInterceptors) {
          interceptor.complete?.();
        }
        oldComplete?.();
      };

      return (origin as any)(opt); // 保持和官方一致，不返回promise
    }

    try {
      const result = (origin as any)(...args);

      // is promise
      if (isPromise(result)) {
        // 如果返回值是 Promise，则将回调挂载在 Promise 上，直接返回当前 Promise
        return result.then((res: any) => {
          for (const interceptor of effectInterceptors) {
            interceptor.success?.(res);
          }
          return res;
        }).catch((err: any) => {
          for (const interceptor of effectInterceptors) {
            interceptor.fail?.(err);
          }
          return err;
        });
      }

      // 不是 Promise，且未报错，执行 success 回调
      for (const interceptor of effectInterceptors) {
        interceptor.success?.(result);
      }

      return result;
    } catch (err: any) { // only catch for not thenable
      // 不是 Promise，且报错，执行 fail 回调
      for (const interceptor of effectInterceptors) {
        interceptor.fail?.(err);
      }
    } finally { // finally for ALL (thenable and normal)
      // 无论是否 Promise 都执行的 complete 回调
      for (const interceptor of effectInterceptors) {
        interceptor.complete?.();
      }
    }
  }) as any;

  return uni[method];
}

/**
 * 注册拦截器，在活跃的 effect 作用域停止时自动移除
 * 参考实现 https://github.com/uni-helper/uni-use/blob/main/src/useInterceptor
 * @function useUniInterceptor
 * @param {UniMethod} method - uni-app中的方法名
 * @param {InterceptorOptions<F>} interceptor - 拦截器配置选项
 * @param {Function} interceptor.invoke - 在方法调用前执行的函数，接收原方法的参数，返回false则终止执行后续回调
 * @param {Function} interceptor.success - 方法成功时的回调函数，接收成功结果
 * @param {Function} interceptor.fail - 方法失败时的回调函数，接收错误信息
 * @param {Function} interceptor.complete - 方法完成时的回调函数，无论成功失败都会执行
 * @returns {Function} 停止拦截器的函数
 *
 *
 * @example
 * import { useUniInterceptor } from '@caikengren/uni-hooks';
 * const event = 'request';
 *
 * // 设置拦截器
 * const stop = useUniInterceptor(event, {
 *   invoke: (args) => {
 *     args[0].url = `https://www.example.com/${args[0].url}`;
 *   },
 *   success: (response) => {
 *     console.log('interceptor-success', response);
 *     response.data.code = 1;
 *   },
 *   fail: (error) => {
 *     console.log('interceptor-fail', error);
 *   },
 *   complete: () => {
 *     console.log('interceptor-complete');
 *   },
 * });
 *
 * // 删除拦截器
 * stop();
 */
export function useUniInterceptor<F extends UniMethod>(method: F, interceptor: InterceptorOptions<F>) {
  // 包裹、封装函数，注入拦截器操作
  wrappMethod(method);

  globalInterceptors[method] = globalInterceptors[method] || {};
  const key = Math.random().toString(36)
    .slice(-8);
  globalInterceptors[method][key] = interceptor;

  const stop = () => {
    delete globalInterceptors[method][key];
  };

  tryOnScopeDispose(stop);

  return stop;
}
