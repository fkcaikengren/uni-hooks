<template>
  <view class="container">
    <view class="header">
      <text class="title">
        useRequest功能演示
      </text>
    </view>
    <view class="nav-list">
      <nav-item
        v-for="(item, index) in navList"
        :key="index"
        :index="index"
        :title="item.title"
        :desc="item.desc"
        @click="navigateTo(item.path)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface NavItem {
  title: string;
  desc: string;
  path: string;
}

const navList = ref<NavItem[]>([
  { title: '基础用法', desc: '基本的请求使用方式', path: '/packageUseRequest/basic-usage/index' },
  { title: '防抖', desc: '防抖功能演示', path: '/packageUseRequest/debounce/index' },
  { title: '节流', desc: '节流功能演示', path: '/packageUseRequest/throttle/index' },
  { title: '轮询', desc: '轮询请求演示', path: '/packageUseRequest/polling/index' },
  { title: 'Ready', desc: 'Ready状态管理', path: '/packageUseRequest/ready/index' },
  { title: '依赖刷新', desc: '依赖变化时刷新', path: '/packageUseRequest/refresh-deps/index' },
  { title: '错误重试', desc: '请求失败重试机制', path: '/packageUseRequest/error-retry/index' },
  { title: '缓存 & SWR', desc: '缓存和SWR策略', path: '/packageUseRequest/cache-swr/index' },
  { title: 'loadingDelay', desc: 'Loading延迟显示', path: '/packageUseRequest/loading-delay/index' },
]);

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
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  display: block;
}

.nav-list {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

/* nav-item styles provided by global component */
</style>
