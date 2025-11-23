<script setup lang="ts">
import { ref } from 'vue'

interface NavItem {
  title: string
  desc: string
  path: string
}

const navList = ref<NavItem[]>([
  { title: '基础hook', desc: '', path: '/pages/basic/index' },
  { title: 'useRequest', desc: '', path: '/packageUseRequest/index/index' },
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
        uni-hooks Demo
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

/* nav-item styles moved into NavItem component */
</style>
