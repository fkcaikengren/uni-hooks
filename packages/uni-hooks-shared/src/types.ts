import type { Ref, WatchOptions, WatchSource  } from 'vue';

export type AnyRecord = Record<string, any>;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type RequiredProperty<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type RequiredOnly<T, K extends keyof T> = RequiredProperty<Partial<T>, K>;

export type MaybePromise<T> = T | Promise<T>;

/**
 * TryOptions
 */
export interface TryOptions {
  /**
   * 最大尝试次数
   *
   * @default 3
   */
  retry?: number;
  /**
   * 尝试间隔时长，单位 ms
   *
   * @default 300
   */
  interval?: number;

  /**
   * 当超时时是否立即执行， 值为false时将在最后无法运行时抛出异常
   *
   * @default true
   */
  runFinally?: boolean;
}


/**
 * Void function
 */
export type VoidFn = () => void;

/**
 * 任意函数类型
 */
export type AnyFn = (...args: any[]) => any;


/**
 * 指定参数和返回值的函数类型
 */
export type Fn<Args extends any[] = any[], Return = void> = (...args: Args) => Return;


/**
 * 可数组类型
 */
export type Arrayable<T> = T[] | T;


/**
 * 可空值的引用类型
 */
export type RemovableRef<T> = Omit<Ref<T>, 'value'> & {
  get value(): T
  set value(value: T | null | undefined)
};


/**
 * 可等待类型
 */
export type Awaitable<T> = Promise<T> | T;

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never;


export type Promisify<T> = Promise<Awaited<T>>;

export type PromisifyFn<T extends AnyFn> = (...args: ArgumentsType<T>) => Promisify<ReturnType<T>>;


export interface ConfigurableFlush {
  /**
   * Timing for monitoring changes, refer to WatchOptions for more details
   *
   * @default 'pre'
   */
  flush?: WatchOptions['flush']
}

export interface ConfigurableFlushSync {
  /**
   * Timing for monitoring changes, refer to WatchOptions for more details.
   * Unlike `watch()`, the default is set to `sync`
   *
   * @default 'sync'
   */
  flush?: WatchOptions['flush']
}


// Internal Types
export type MultiWatchSources = (WatchSource<unknown> | object)[];

export type MapSources<T> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? V : never;
};
export type MapOldSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? Immediate extends true ? V | undefined : V : never;
};


/**
 * Universal timer handle that works in both browser and Node.js environments
 */
export type TimerHandle = ReturnType<typeof setTimeout> | undefined;

