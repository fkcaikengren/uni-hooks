import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import { readonly, shallowRef, toRef, watch } from 'vue'

export function usePrevious<T>(value: MaybeRefOrGetter<T>): Readonly<ShallowRef<T | undefined>>
export function usePrevious<T>(value: MaybeRefOrGetter<T>, initialValue: T): Readonly<ShallowRef<T>>

/**
 * 监听 ref 变化，返回上一个值
 * 参考实现 https://inhiblabcore.github.io/vue-hooks-plus/hooks/usePrevious
 * @function usePrevious
 * @param value ref 或 getter 函数
 * @param initialValue 初始值
 * @returns 上一个值
 *
 */
export function usePrevious<T>(value: MaybeRefOrGetter<T>, initialValue?: T) {
  const previous = shallowRef<T | undefined>(initialValue)

  watch(
    toRef(value),
    (_, oldValue) => {
      previous.value = oldValue
    },
    { flush: 'sync' },
  )

  return readonly(previous)
}
