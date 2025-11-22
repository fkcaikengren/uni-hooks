<script setup lang="ts">
import { ref } from 'vue'

interface NavItem {
  title: string
  desc: string
  path: string
}

const navList = ref<NavItem[]>([
  { title: '基础hook', desc: '', path: '/pages/basic/index' },
  { title: '业务hook', desc: '', path: '/pages/biz/index' },
])

function navigateTo(path: string) {
  uni.navigateTo({
    url: path,
  })
}
</script>

<template>
  <view class="container">
    <view class="header">
      <text class="title">
        pmd-use 功能演示
      </text>
      <text class="subtitle">
        uni-app 兼容 H5 和小程序
      </text>
    </view>
    <view class="nav-list">
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        @click="navigateTo(item.path)"
      >
        <view class="nav-number">
          {{ index + 1 }}
        </view>
        <view class="nav-content">
          <text class="nav-title">
            {{ item.title }}
          </text>
          <text class="nav-desc">
            {{ item.desc }}
          </text>
        </view>
        <view class="nav-arrow">
          >
        </view>
      </view>
    </view>
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

.nav-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.nav-item:last-child {
  border-bottom: none;
}

.nav-item:active {
  background-color: #f8f8f8;
}

.nav-number {
  width: 32px;
  height: 32px;
  background-color: #007aff;
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 12px;
}

.nav-content {
  flex: 1;
}

.nav-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 4px;
}

.nav-desc {
  font-size: 12px;
  color: #999;
  display: block;
}

.nav-arrow {
  font-size: 16px;
  color: #ccc;
}
</style>
