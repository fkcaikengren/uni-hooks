<script setup lang="ts">
import { computed } from 'vue'

import { useAppStore } from './store/use-app-store'

// 使用 useAppStore
const { commonInfo, updateCommonInfo } = useAppStore()

// 计算属性，用于双向绑定
const configName = computed({
  get: () => commonInfo.value?.configName || '',
  set: (val: string) => {
    updateCommonInfo({
      ...commonInfo.value,
      configName: val,
    })
  },
})

const configId = computed({
  get: () => commonInfo.value?.configId || '',
  set: (val: string) => {
    updateCommonInfo({
      ...commonInfo.value,
      configId: val,
    })
  },
})
</script>

<template>
  <div>
    <div class="input-group">
      <input
        v-model="configName"
        label="配置名称："
        type="text"
        placeholder="配置名称"
      >
    </div>
    <div class="input-group">
      <input
        v-model="configId"
        label="配置ID："
        type="text"
        placeholder="配置ID"
      >
    </div>
  </div>
</template>
