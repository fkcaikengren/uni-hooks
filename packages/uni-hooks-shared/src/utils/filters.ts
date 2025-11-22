import type { MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import type { AnyFn, ArgumentsType, Fn, Promisify, TimerHandle } from '../types.ts'
import { isRef, readonly, toRef, toValue } from 'vue'
import { noop } from './base'

export interface Pausable {
  /**
   * A ref indicate whether a pausable instance is active
   */
  readonly isActive: Readonly<ShallowRef<boolean>>

  /**
   * Temporary pause the effect from executing
   */
  pause: Fn

  /**
   * Resume the effects
   */
  resume: Fn
}

export interface Stoppable<StartFnArgs extends any[] = any[]> {
  /**
   * A ref indicate whether a stoppable instance is executing
   */
  readonly isPending: Readonly<Ref<boolean>>

  /**
   * Stop the effect from executing
   */
  stop: Fn

  /**
   * Start the effects
   */
  start: (...args: StartFnArgs) => void
}

/**
 * 函数包装器选项，用于存储原始函数、`this` 与参数的封装信息。
 */
export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
  fn: Fn<Args, This>
  args: Args
  thisArg: This
}

/**
 * 事件拦截器类型，用于包装目标调用以实现防抖/节流/可暂停等过滤能力。
 *
 * @template Args 目标函数的参数类型元组
 * @template This 执行时的 `this` 绑定类型
 * @template Invoke 要被过滤器控制调用的函数类型
 * @param invoke 实际执行的函数，由过滤器决定何时触发
 * @param options 包含原始函数、`this` 与参数的封装信息
 * @returns 执行结果或其 Promise
 * @property cancel 可选，取消最后一次计划的执行
 */
export type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = ((
  invoke: Invoke,
  options: FunctionWrapperOptions<Args, This>,
) => ReturnType<Invoke> | Promisify<ReturnType<Invoke>>) & {
  cancel?: () => void
}

/**
 * ConfigurableEventFilter
 * @internal
 */
export interface ConfigurableEventFilter {
  /**
   * Filter for if events should to be received.
   *
   */
  eventFilter?: EventFilter
}

/**
 * DebounceFilterOptions
 */
export interface DebounceFilterOptions {
  /**
   * 延迟的最大时间.
   * 毫秒.
   */
  maxWait?: MaybeRefOrGetter<number>

  /**
   * 当取消时，是否拒绝最后一次调用.
   *
   * @default false
   */
  rejectOnCancel?: boolean
}

/**
 * @internal
 */
export function createFilterWrapper<T extends AnyFn>(filter: EventFilter, fn: T) {
  function wrapper(this: any, ...args: ArgumentsType<T>) {
    return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      // make sure it's a promise
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args }))
        .then(resolve)
        .catch(reject)
    })
  }

  // 如果filter有cancel方法，则将其添加到wrapper上
  if (typeof filter.cancel === 'function') {
    wrapper.cancel = filter.cancel
  }

  return wrapper
}

export const bypassFilter: EventFilter = invoke => invoke()

/**
 * 防抖
 * @internal
 */
export function debounceFilter(ms: MaybeRefOrGetter<number>, options: DebounceFilterOptions = {}) {
  let timer: TimerHandle
  let maxTimer: TimerHandle
  let lastRejector: AnyFn = noop

  const _clearTimeout = (timer: TimerHandle) => {
    clearTimeout(timer)
    lastRejector()
    lastRejector = noop
  }

  let lastInvoker: () => void

  const filter: EventFilter = (invoke) => {
    const duration = toValue(ms)
    const maxDuration = toValue(options.maxWait)

    if (timer)
      _clearTimeout(timer)

    if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
      if (maxTimer) {
        _clearTimeout(maxTimer)
        maxTimer = undefined
      }
      return Promise.resolve(invoke())
    }

    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve
      lastInvoker = invoke
      // Create the maxTimer. Clears the regular timer on invoke
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer)
          maxTimer = undefined
          resolve(lastInvoker())
        }, maxDuration)
      }

      // Create the regular timer. Clears the max timer on invoke
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer)
        maxTimer = undefined
        resolve(invoke())
      }, duration)
    })
  }

  // 添加cancel方法，用于取消最后一次执行
  filter.cancel = () => {
    if (timer)
      _clearTimeout(timer)
    timer = undefined
    if (maxTimer)
      _clearTimeout(maxTimer)
    maxTimer = undefined
  }
  return filter
}

/**
 * ThrottleFilterOptions
 */
export interface ThrottleFilterOptions {
  /**
   * The maximum time allowed to be delayed before it's invoked.
   */
  delay: MaybeRefOrGetter<number>
  /**
   * Whether to invoke on the trailing edge of the timeout.
   */
  trailing?: boolean
  /**
   * Whether to invoke on the leading edge of the timeout.
   */
  leading?: boolean
  /**
   * Whether to reject the last call if it's been cancel.
   */
  rejectOnCancel?: boolean
}

/**
 * 节流
 * @internal
 */
interface ThrottleFilter {
  (ms: MaybeRefOrGetter<number>, trailing?: boolean, leading?: boolean, rejectOnCancel?: boolean): EventFilter
  (options: ThrottleFilterOptions): EventFilter
}

/**
 * throttleFilter
 * @internal
 */
export const throttleFilter: ThrottleFilter = (...args: any[]) => {
  let lastExec = 0
  let timer: TimerHandle
  let isLeading = true
  let lastRejector: AnyFn = noop
  let lastValue: any
  let ms: MaybeRefOrGetter<number>
  let trailing: boolean
  let leading: boolean
  let rejectOnCancel: boolean
  if (!isRef(args[0]) && typeof args[0] === 'object')
    ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0])
  else [ms, trailing = true, leading = true, rejectOnCancel = false] = args
  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
      lastRejector()
      lastRejector = noop
    }
  }

  const filter: EventFilter = (_invoke) => {
    const duration = toValue(ms)
    const elapsed = Date.now() - lastExec
    const invoke = () => lastValue = _invoke()

    clear()

    if (duration <= 0) {
      lastExec = Date.now()
      return invoke()
    }

    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now()
      invoke()
    }
    else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve
        timer = setTimeout(() => {
          lastExec = Date.now()
          isLeading = true
          resolve(invoke())
          clear()
        }, Math.max(0, duration - elapsed))
      })
    }

    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration)

    isLeading = false
    return lastValue
  }

  // 添加cancel方法，用于取消最后一次执行
  filter.cancel = () => {
    clear()
  }

  return filter
}

/**
 * PausableFilterOptions
 */
export interface PausableFilterOptions {
  /**
   * The initial state
   *
   * @default 'active'
   */
  initialState?: 'active' | 'paused'
}

/**
 * EventFilter that gives extra controls to pause and resume the filter
 * @internal
 * @param extendFilter  Extra filter to apply when the PausableFilter is active, default to none
 * @param options Options to configure the filter
 */
export function pausableFilter(
  extendFilter: EventFilter = bypassFilter,
  options: PausableFilterOptions = {},
): Pausable & { eventFilter: EventFilter } {
  const {
    initialState = 'active',
  } = options

  const isActive = toRef(initialState === 'active')

  function pause() {
    isActive.value = false
  }
  function resume() {
    isActive.value = true
  }

  const eventFilter: EventFilter = (...args) => {
    if (isActive.value)
      return extendFilter(...args)
  }

  return { isActive: readonly(isActive), pause, resume, eventFilter }
}
