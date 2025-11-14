
/**
 * 判断一个值是否为字符串类型
 * @internal
 * @param val 待判断的值
 * @returns 如果值是字符串类型，则返回true；否则返回false
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

/**
 * 判断一个值是否为函数类型
 * @internal
 * @template T 函数的类型
 * @param val 待判断的值
 * @returns 如果值为函数类型，则返回 true，否则返回 false
 */
export function isFunction<T extends (...args: any[]) => any>(val: any): val is T {
  return typeof val === 'function';
}

/**
 * 一个空函数，不执行任何操作。
 * @internal
 */
export function noop() { }


/**
 * 延迟执行一段时间
 * @internal
 * @param ms 延迟时间，单位为毫秒，默认为0，即不延迟
 * @returns 返回一个Promise对象
 */
export function sleep(ms = 0) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}


/**
 * 判断传入的对象是否是Promise类型
 * @internal
 * @param obj 需要判断的对象
 * @returns 如果传入的对象是Promise，则返回true；否则返回false
 */
export function isPromise(obj: any): obj is Promise<any> {
  return obj !== null
         && typeof obj === 'object'
         && typeof obj.then === 'function'
         && typeof obj.catch === 'function';
}

/**
 * 判断一个值是否为null或undefined
 * @internal
 * @param obj 待判断的值
 * @returns 如果值为null或undefined，则返回true；否则返回false
 */
export function isNil(obj: any): obj is null | undefined {
  return obj === null || obj === undefined;
}

