<script setup lang="ts">
import { useDebounceFn } from '@caikengren/uni-hooks'

import { shallowRef } from 'vue'

const updated = shallowRef(0)
const clicked = shallowRef(0)
const debouncedFn = useDebounceFn(() => {
  updated.value += 1
}, 1000, { maxWait: 5000 })

function clickedFn() {
  clicked.value += 1
  debouncedFn()
}
</script>

<template>
  <button
    type="primary"
    style="width: 100%"
    @click="clickedFn"
  >
    点击我
  </button>
  <note>此演示的延迟设置为1000毫秒，maxWait设置为5000毫秒。</note>

  <p>按钮点击次数：{{ clicked }}</p>
  <p>事件处理函数调用次数：{{ updated }}</p>
</template>
