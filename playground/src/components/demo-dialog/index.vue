<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:visible', 'close'])

function close() {
  emit('update:visible', false)
  emit('close')
}
</script>

<template>
  <view
    v-if="visible"
    class="demo-dialog-overlay"
  >
    <view class="demo-dialog">
      <view class="demo-dialog-header">
        <text class="demo-dialog-title">
          {{ title }}
        </text>
        <view
          class="demo-dialog-close"
          @click="close"
        >
          ×
        </view>
      </view>
      <view class="demo-dialog-content">
        <slot />
      </view>
    </view>
  </view>
</template>

<style scoped>
.demo-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.demo-dialog {
  width: 90%;
  height: 90%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.demo-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.demo-dialog-title {
  font-size: 18px;
  font-weight: bold;
}

.demo-dialog-close {
  font-size: 24px;
  line-height: 24px;
  cursor: pointer;
}

.demo-dialog-content {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}
</style>
