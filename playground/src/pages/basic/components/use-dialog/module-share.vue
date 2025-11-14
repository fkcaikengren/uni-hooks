<template>
  <div class="share-container">
    <div>
      <h3>分享任务</h3>
      <button
        class="share-button"
        @click="openInviteDialog"
      >
        点击邀请
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDialogStore } from '@caikengren/uni-hooks';


// 通用配置信息
const { openDialog } = useDialogStore();

const openInviteDialog = () => {
  openDialog('inviteDialog');
};

</script>

<style scoped>
.share-container {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.share-button {
  padding: 8px 16px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.share-button:hover {
  background-color: #0b7dda;
}
</style>
