<script setup lang="ts">
import { useThrottleFn } from '@caikengren/uni-hooks'

import { shallowRef } from 'vue'

const updated = shallowRef(0)
const clicked = shallowRef(0)
const throttledFn = useThrottleFn(() => {
  updated.value += 1
}, 1000)

function clickedFn() {
  clicked.value += 1
  throttledFn()
}
</script>

<template>
  <div>
    <button
      type="primary"
      style="width: 100%"
      @click="clickedFn"
    >
      点击我
    </button>
    <note>节流延迟 1000ms</note>

    <p>按钮点击次数：{{ clicked }}</p>
    <p>事件处理函数调用次数：{{ updated }}</p>
  </div>
</template>
