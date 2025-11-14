<template>
  <view class="container">
    <view class="demo-list">
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(1)"
        >
          1. createStore
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(2)"
        >
          2. useThrottleFn
        </view>
      </view>

      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(3)"
        >
          3. useDebounceFn
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(4)"
        >
          4. useBoolean
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(5)"
        >
          5. usePrevious
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(6)"
        >
          6. useRoute
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(7)"
        >
          7. onPageShowHide
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(8)"
        >
          8. useWindowSize
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(9)"
        >
          9. usePageVisibility
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(10)"
        >
          10. useDialog
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="navigateTo('/views/demo-page-scroll/index')"
        >
          11. usePageScroll
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(12)"
        >
          12. useList
        </view>
      </view>
      <view class="demo-item">
        <view
          class="demo-title"
          @click="showDemo(13)"
        >
          13. useStorage
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
      <CreateStore v-if="currentDemoId === 1" />
      <UseThrottleFn v-else-if="currentDemoId === 2" />
      <UseDebouceFn v-else-if="currentDemoId === 3" />
      <UseBoolean v-else-if="currentDemoId === 4" />
      <UsePrevious v-else-if="currentDemoId === 5" />
      <UseRoute v-else-if="currentDemoId === 6" />
      <OnPageShowHide v-else-if="currentDemoId === 7" />
      <UseWindowSize v-else-if="currentDemoId === 8" />
      <UsePageVisibility
        v-else-if="currentDemoId === 9"
        :visibility="visibility"
      />
      <UseDialog v-else-if="currentDemoId === 10" />
      <UsePageScroll v-else-if="currentDemoId === 11" />
      <UseList v-else-if="currentDemoId === 12" />
      <UseStorage v-else-if="currentDemoId === 13" />
    </demo-dialog>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 直接引入组件

import { usePageVisibility } from '@caikengren/uni-hooks';

import CreateStore from './components/create-store/index.vue';
import OnPageShowHide from './components/on-page-show-hide/index.vue';
import UseBoolean from './components/use-boolean/index.vue';
import UseDebouceFn from './components/use-debounce-fn/index.vue';
import UseDialog from './components/use-dialog/index.vue';
import UseList from './components/use-list/index.vue';
import UsePageVisibility from './components/use-page-visibility/index.vue';
import UsePrevious from './components/use-previous/index.vue';
import UseRoute from './components/use-route/index.vue';
import UseStorage from './components/use-storage/index.vue';
import UseThrottleFn from './components/use-throttle-fn/index.vue';
import UseWindowSize from './components/use-window-size/index.vue';


const showModal = ref(false);
const currentDemoTitle = ref('');
const currentDemoId = ref(0);

const visibility = usePageVisibility();

const demoTitles = {
  1: 'createStore',
  2: 'useThrottleFn',
  3: 'useDebounceFn',
  4: 'useBoolean',
  5: 'usePrevious',
  6: 'useRoute',
  7: 'onPageShowHide',
  8: 'useWindowSize',
  9: 'usePageVisibility',
  10: 'useDialog',
  11: 'usePageScroll',
  12: 'useList',
  13: 'useStorage',
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

const navigateTo = (path: string) => {
  uni.navigateTo({
    url: path,
  });
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
