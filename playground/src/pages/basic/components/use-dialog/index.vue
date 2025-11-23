<script setup lang="ts">
import { useDialog, useDialogStore } from '@caikengren/uni-hooks'

const { props: inviteDialogProps, openDialog, closeDialog } = useDialog({
  modelValueField: 'visible', // 双向绑定值
}, 'inviteDialog')

// 在其他组件中使用useDialogStore，关闭指定弹框
const {closeDialog: closeInviteDialog} = useDialogStore('inviteDialog')

</script>

<template>
  <div>
    <div class="card">
      
      <div class="section">
        <button @click="openDialog">
          打开邀请弹框
        </button>
      </div>
    </div>
    <demo-dialog
      v-bind="inviteDialogProps"
      title="邀请弹框"
      @close="closeDialog"
    >
      <view>分享@caikengren/uni-hooks给你的朋友吧</view>
      <button @click="()=>closeInviteDialog('inviteDialog')">
        关闭弹框
      </button>
    </demo-dialog>
  </div>
</template>

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
