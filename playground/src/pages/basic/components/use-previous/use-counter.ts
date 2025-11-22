import { ref } from 'vue'

interface CounterActions {
  inc: () => void
  dec: () => void
  set: (value: number) => void
  reset: () => void
}

export function useCounter(initialValue = 0) {
  const counter = ref(initialValue)

  const inc = () => {
    counter.value += 1
  }

  const dec = () => {
    counter.value -= 1
  }

  const set = (value: number) => {
    counter.value = value
  }

  const reset = () => {
    counter.value = initialValue
  }

  const actions: CounterActions = {
    inc,
    dec,
    set,
    reset,
  }

  return [counter, actions] as const
}
