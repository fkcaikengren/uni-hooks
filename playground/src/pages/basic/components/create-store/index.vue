<template>
  <div>
    <!-- 绑定commonInfo中的数据到输入框 -->
    <InputConfig />

    <!-- 显示commonInfo内容的组件 -->
    <div class="info-display">
      <h3>CommonInfo 内容：</h3>
      <pre>{{ commonInfo }}</pre>
    </div>

    <div class="button-group">
      <button
        type="primary"
        @click="refreshHomeInfo"
      >
        刷新数据
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';


import InputConfig from './input-config.vue';


import { useAppStore } from './store/use-app-store';

// 使用 useAppStore
const { commonInfo, queryHomeInfo, refreshHomeInfo } = useAppStore();

// 页面加载时获取数据
onMounted(() => {
  queryHomeInfo();
});

</script>

<style scoped>


.info-display {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.button-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

</style>
