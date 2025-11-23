<template>
  <view class="container">
    <view class="header">
      <text class="title">
        基础用法
      </text>
    </view>

    <view class="demo-list">
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(1)"
        >
          1. 自动收集依赖
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(2)"
        >
          2. 手动收集依赖
        </view>
      </view>
    </view>

    <!-- 弹框组件 -->
    <demo-dialog
      v-model:visible="showModal"
      :title="currentDemoTitle"
      @close="closeModal"
    >
      <!-- 替换动态组件为条件渲染 -->
      <AutoCollectDemo v-if="currentDemoId === 1" />
      <ManualCollectDemo v-else-if="currentDemoId === 2" />
    </demo-dialog>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AutoCollectDemo from './components/auto-collect.vue';
import ManualCollectDemo from './components/manual-collect.vue';
const showModal = ref(false);
const currentDemoTitle = ref('');
const currentDemoId = ref(0);

const demoTitles = {
  1: '自动收集依赖',
  2: '手动收集依赖',
};

// 不再需要 demoComponents 对象
// const demoComponents = {
//   1: markRaw(AutoCollectDemo),
//   2: markRaw(ManualCollectDemo),
// };

const showDemo = (demoId: number) => {
  // 直接设置当前演示ID
  currentDemoId.value = demoId;
  currentDemoTitle.value = demoTitles[demoId];
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: block;
}

.demo-list {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.demo-item {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.demo-item:last-child {
  border-bottom: none;
}

.demo-title {
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
}

.demo-title:active {
  opacity: 0.7;
}


.modal-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}
</style>
