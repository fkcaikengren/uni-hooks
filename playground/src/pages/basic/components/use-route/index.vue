<template>
  <div class="section">
    <h3 class="section-title">
      路由信息
    </h3>
    <div class="info-item">
      <p>path: {{ path }}</p>
      <p>query: {{ JSON.stringify(query, 2, null) }}</p>
      <p>queryStr: {{ queryStr }}</p>
    </div>
  </div>
</template>

<script setup>

import {  useRoute } from '@caikengren/uni-hooks';


const { path, query, queryStr } = useRoute();
</script>

<style scoped>

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
