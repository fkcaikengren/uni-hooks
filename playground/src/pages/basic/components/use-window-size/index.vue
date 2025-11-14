<template>
  <div class="section">
    <h3 class="section-title">
      窗口尺寸信息
    </h3>
    <div class="info-item">
      <span class="label">是否横屏：</span>
      <span
        class="value"
        :class="{ 'active': isLandscape }"
      >{{ isLandscape ? '是' : '否' }}</span>
    </div>
    <div class="info-item">
      <span class="label">屏幕窗口宽度：</span>
      <span class="value">{{ windowWidth }}px</span>
    </div>
    <div class="info-item">
      <span class="label">屏幕窗口高度：</span>
      <span class="value">{{ windowHeight }}px</span>
    </div>
  </div>
</template>

<script setup>

import { useWindowSize } from '@caikengren/uni-hooks';

const { isLandscape, windowWidth, windowHeight } = useWindowSize();

</script>

<style scoped>
.container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
}

.title {
  color: #333;
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 24px;
  text-align: center;
  font-weight: 600;
}

.section {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.section-title {
  color: #2c3e50;
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 500;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 6px;
}

.label {
  font-weight: 500;
  color: #666;
  min-width: 100px;
}

.value {
  color: #333;
  font-weight: 400;
}

.value.active {
  color: #4caf50;
  font-weight: 500;
}
</style>
