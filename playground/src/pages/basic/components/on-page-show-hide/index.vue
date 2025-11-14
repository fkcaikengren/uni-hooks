<template>
  <div class="section">
    <h3 class="section-title">
      页面可见性生命周期
    </h3>
    <p style="color: red;">
      注意：usePageVisibility, onPageShow, onPageHide 这三个hook必须使用在明确被挂载到页面上的组件，如果组件本身被v-if条件渲染，那么会导致失效；
    </p>
    <p style="color: green;">
      解决方案：传递usePageVisibility的visibility响应式变量给其他可能被隐藏的组件
    </p>
    <div class="info-item">
      h5切换tab页面（小程序切换到后台），查看控制台是否打印onPageHide和onPageShow
    </div>
  </div>
</template>

<script setup>

import { onPageHide, onPageShow } from '@caikengren/uni-hooks';

onPageHide(() => {
  console.log('==> onPageHide');
}, { skipFirst: false });

// 页面显示时触发，首次不触发
onPageShow(() => {
  console.log('==> onPageShow');
}, { skipFirst: true });

</script>

<style scoped>

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
