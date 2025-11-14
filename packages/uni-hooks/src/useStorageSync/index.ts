import type { MaybeRefOrGetter } from 'vue';
import { useStorage } from '../useStorage';
import type { UniStorageLike, UseStorageOptions } from '../useStorage';
import type { ConfigurableFlushSync, RemovableRef } from '@caikengren/uni-hooks-shared';


export type UniStorageSyncLike = Pick<Uni, 'getStorageSync' | 'setStorageSync' | 'removeStorageSync'>;

let UniStorage: UniStorageLike;
function initUniStorageIfNotInited() {
  if (UniStorage) {
    return;
  }

  UniStorage = parseUniStorageLike({
    getStorageSync: uni.getStorageSync,
    setStorageSync: uni.setStorageSync,
    removeStorageSync: uni.removeStorageSync,
  });
}

function parseUniStorageLike(storageSync: UniStorageSyncLike) {
  const storage: UniStorageLike = {
    getStorage: ({ key, success, fail, complete }: UniNamespace.GetStorageOptions) => {
      try {
        const data = storageSync.getStorageSync(key);
        success?.({ data });
      } catch (error) {
        fail?.(error);
      } finally {
        complete?.(void 0);
      }
    },
    setStorage: ({ key, data, success, fail, complete }: UniNamespace.SetStorageOptions) => {
      try {
        const raw = storageSync.setStorageSync(key, data);
        success?.({ data: raw });
      } catch (error) {
        fail?.(error);
      } finally {
        complete?.(void 0);
      }
    },
    removeStorage: ({ key, success, fail, complete }: UniNamespace.RemoveStorageOptions) => {
      try {
        storageSync.removeStorageSync(key);
        success?.({ data: void 0 });
      } catch (error) {
        fail?.(error);
      } finally {
        complete?.(void 0);
      }
    },
  };

  return storage;
}

export interface UseStorageSyncOptions<T>
  extends Omit<UseStorageOptions<T>, 'flush' | 'storage'>,
  ConfigurableFlushSync {
  /** 同步 storage */
  storage?: UniStorageSyncLike;
}

export function useStorageSync(
  key: string,
  initialValue: MaybeRefOrGetter<string>,
  options?: UseStorageSyncOptions<string>,
): RemovableRef<string>;
export function useStorageSync(
  key: string,
  initialValue: MaybeRefOrGetter<boolean>,
  options?: UseStorageSyncOptions<boolean>,
): RemovableRef<boolean>;
export function useStorageSync(
  key: string,
  initialValue: MaybeRefOrGetter<number>,
  options?: UseStorageSyncOptions<number>,
): RemovableRef<number>;

export function useStorageSync<T>(
  key: string,
  initialValue: MaybeRefOrGetter<T>,
  options?: UseStorageSyncOptions<T>,
): RemovableRef<T>;


/**
 * 响应式的本地缓存hook（同步版本），支持小程序和H5环境
 * 参考实现 https://github.com/uni-helper/uni-use
 * @function useStorageSync
 * @param {string} key - 存储的键名
 * @param {T} initialValue - 初始值，可以是ref、getter或普通值
 * @param {Object} [options] - 配置选项
 * @param {'sync'} [options.flush='sync'] - 强制同步写入存储
 * @param {UniStorageLike} [options.storage] - 自定义存储实现
 * @returns {Ref<T>} data - 响应式的存储数据
 *
 * @example
 *
 * const data = useStorageSync('key', { foo: 'bar' });
 * data.value = { bar: 'foo' }; //此时立即存入了本地缓存，不同于useStorage是异步存入的
 */
export function useStorageSync<T extends string | number | boolean | object | null>(
  key: string,
  initialValue: MaybeRefOrGetter<T>,
  options: UseStorageSyncOptions<T> = {},
): RemovableRef<T> {
  // fix uni is not defined
  initUniStorageIfNotInited();

  const { flush = 'sync', storage, ...others } = options;

  const storageAsync = storage ? parseUniStorageLike(storage) : UniStorage;

  return useStorage(key, initialValue, { flush, storage: storageAsync, ...others });
}
