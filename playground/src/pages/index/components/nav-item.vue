<script setup lang="ts">
const props = defineProps<{
  index: number
  title: string
  desc: string
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick() {
  emit('click')
}
</script>

<template>
  <view
    class="nav-item"
    @click="handleClick"
  >
    <view class="nav-number">
      {{ props.index + 1 }}
    </view>
    <view class="nav-content">
      <text class="nav-title">
        {{ props.title }}
      </text>
      <text class="nav-desc">
        {{ props.desc }}
      </text>
    </view>
    <view class="nav-arrow">
      <view class="chevron"></view>
    </view>
  </view>
</template>

<style scoped>
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
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-arrow .chevron {
  width: 8px;
  height: 8px;
  border-top: 2px solid #ccc;
  border-right: 2px solid #ccc;
  transform: rotate(45deg);
}
</style>