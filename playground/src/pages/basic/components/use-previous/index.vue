<script lang="ts" setup>
import { usePrevious } from '@caikengren/uni-hooks'

import { useCounter } from './use-counter'

const [counter, { inc, dec }] = useCounter(0)
const prevCounter = usePrevious(counter)
</script>

<template>
  <div>
    <p>counter current value：{{ counter }}</p>
    <p>counter previous value：{{ prevCounter }}</p>
    <button
      type="primary"
      @click="inc()"
    >
      increase
    </button>
    <button
      type="primary"
      style="margin-left: 8px;"
      @click="dec()"
    >
      decrease
    </button>
  </div>
</template>
