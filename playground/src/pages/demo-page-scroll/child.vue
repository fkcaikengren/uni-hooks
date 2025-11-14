

<template>
  <div>
    <div class="scroll-section">
      <h3 class="sub-title">
        点击滚动 - 子组件中使用
      </h3>
      <div class="button-container">
        <button
          class="scroll-button"
          @click="scrollToEnd3"
        >
          不可以滚动到end3
        </button>
      </div>
    </div>
    <div class="content-section">
      <div

        class="start-marker"
      >
        start3
      </div>
      <div
        id="end3"
        class="end-marker"
      >
        end3
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { usePageScroll } from '@caikengren/uni-hooks';

const { scrollToSelector } = usePageScroll();

const scrollToEnd3 = () => {
  scrollToSelector('#end3');
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


.note {
  font-size: 14px;
  color: #f44336;
  font-style: italic;
  margin: 4px 0;
}
</style>

