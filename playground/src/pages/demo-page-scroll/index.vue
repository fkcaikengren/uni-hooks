<template>
  <div class="scroll-demo-container">
    <h2 class="section-title">
      页面滚动示例
    </h2>

    <div class="scroll-section">
      <h3 class="sub-title">
        点击滚动 - 页面中使用
      </h3>
      <p />
      <div class="button-container">
        <button
          class="scroll-button"
          @click="scrollToEnd1"
        >
          可以滚动到end1
        </button>
      </div>
    </div>

    <div class="scroll-section">
      <h3 class="sub-title">
        点击滚动 - 跨组件选择元素滚动
      </h3>
      <div class="button-container">
        <button
          class="scroll-button"
          @click="scrollToEnd2"
        >
          不能滚动到end2
        </button>
      </div>
    </div>

    <div class="content-section">
      <div class="start-marker">
        start1
      </div>
      <div
        id="end1"
        ref="end1Ref"
        class="end-marker"
      >
        end1
      </div>
    </div>

    <Child2 />
    <Child />
    <div
      class="content-section"
      style="height: auto;"
    >
      <div
        v-for="(item, index) in 10"
        :key="index"
      >
        more
      </div>
      <div>没有更多了</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { usePageScroll } from '@caikengren/uni-hooks';

import Child from './child.vue';
import Child2 from './child2.vue';

const { scrollToSelector } = usePageScroll();


// 到指定元素（选择器）
const scrollToEnd1 = () => {
  scrollToSelector('#end1');
};
const scrollToEnd2 = () => {
  scrollToSelector('#end2');
};
</script>

<style scoped>
.scroll-demo-container {
  font-family: -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 10px;
}

.sub-title {
  color: #555;
  font-size: 18px;
  margin: 15px 0;
}

.scroll-section {
  margin-bottom: 20px;
}

.button-container {
  margin: 10px 0;
}

.scroll-button {
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.scroll-button:hover {
  background-color: #357abD;
  transform: translateY(-2px);
}

.scroll-button:active {
  transform: translateY(0);
}

.content-section {
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f0f0f0;
  border-radius: 6px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

.start-marker, .end-marker {
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

.start-marker {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #2e7d32;
}

.end-marker {
  background-color: #ffebee;
  color: #c62828;
  border-left: 4px solid #c62828;
}

.end-marker.duplicate {
  margin-top: 20px;
  background-color: #fff8e1;
  color: #ff8f00;
  border-left: 4px solid #ff8f00;
}
</style>

