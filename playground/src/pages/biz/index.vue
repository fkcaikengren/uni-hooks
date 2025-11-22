<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
const currentDemoTitle = ref('')
// const currentDemoId = ref(0);

// const demoTitles = {
// };

function navigateTo(path: string) {
  uni.navigateTo({
    url: path,
  })
}

// const showDemo = (demoId: number) => {
//   // 直接设置当前演示ID
//   currentDemoId.value = demoId;
//   currentDemoTitle.value = demoTitles[demoId];
//   showModal.value = true;
// };

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <view class="container">
    <view class="demo-list">
      <view class="demo-item">
        <view
          class="demo-title"
          @click="navigateTo('/views/demo-share/index')"
        >
          1. on-share-app-message, on-share-timeline
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
      <!-- <DemoShare v-if="currentDemoId === 1" /> -->
    </demo-dialog>
  </view>
</template>

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
