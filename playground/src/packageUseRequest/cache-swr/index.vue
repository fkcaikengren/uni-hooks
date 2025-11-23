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
          1.SWR
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(2)"
        >
          2. 数据保持新鲜
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(3)"
        >
          3. 数据共享
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(4)"
        >
          4. 参数缓存
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(5)"
        >
          5. 删除缓存
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(6)"
        >
          6. 自定义同步缓存
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(7)"
        >
          7. 自定义异步缓存
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
      <SWRDemo v-if="currentDemoId === 1" />
      <DataKeepFreshDemo v-else-if="currentDemoId === 2" />
      <DataShareDemo v-else-if="currentDemoId === 3" />
      <ParamsCacheDemo v-else-if="currentDemoId === 4" />
      <DeleteCacheDemo v-else-if="currentDemoId === 5" />
      <CustomSyncCacheDemo v-else-if="currentDemoId === 6" />
      <CustomAsyncCacheDemo v-else-if="currentDemoId === 7" />
    </demo-dialog>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 直接引入组件
import CustomAsyncCacheDemo from './components/custom-async-cache-demo.vue';
import CustomSyncCacheDemo from './components/custom-sync-cache-demo.vue';
import DataKeepFreshDemo from './components/data-keep-fresh-demo.vue';
import DataShareDemo from './components/data-share-demo.vue';
import DeleteCacheDemo from './components/delete-cache-demo.vue';
import ParamsCacheDemo from './components/params-cache-demo.vue';
import SWRDemo from './components/swr-demo.vue';

const showModal = ref(false);
const currentDemoTitle = ref('');
const currentDemoId = ref(0);

const demoTitles = {
  1: 'SWR',
  2: '数据保持新鲜',
  3: '数据共享',
  4: '参数缓存',
  5: '删除缓存',
  6: '自定义同步缓存',
  7: '自定义异步缓存',
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
