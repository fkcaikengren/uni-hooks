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
          1. 默认请求
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(2)"
        >
          2. 手动触发
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(3)"
        >
          3. 并发请求机制
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(4)"
        >
          4. 生命周期
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(5)"
        >
          5. 刷新
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(6)"
        >
          6. 立即变更数据
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(7)"
        >
          7. 取消响应
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
      <DefaultRequestDemo v-if="currentDemoId === 1" />
      <ManualTriggerDemo v-else-if="currentDemoId === 2" />
      <ConcurrentRequestDemo v-else-if="currentDemoId === 3" />
      <LifecycleDemo v-else-if="currentDemoId === 4" />
      <RefreshDemo v-else-if="currentDemoId === 5" />
      <MutateDataDemo v-else-if="currentDemoId === 6" />
      <CancelRequestDemo v-else-if="currentDemoId === 7" />
    </demo-dialog>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 直接引入组件
import CancelRequestDemo from './components/cancel-request-demo.vue';
import ConcurrentRequestDemo from './components/concurrent-request-demo.vue';
import DefaultRequestDemo from './components/default-request-demo.vue';
import LifecycleDemo from './components/lifecycle-demo.vue';
import ManualTriggerDemo from './components/manual-trigger-demo.vue';
import MutateDataDemo from './components/mutate-data-demo.vue';
import RefreshDemo from './components/refresh-demo.vue';

const showModal = ref(false);
const currentDemoTitle = ref('');
const currentDemoId = ref(0);

const demoTitles = {
  1: '默认请求',
  2: '手动触发',
  3: '并发请求机制',
  4: '生命周期',
  5: '刷新',
  6: '立即变更数据',
  7: '取消响应',
};


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
