<template>
  <div>
    <div class="card">
      <div class="section">
        <ModuleShare />
      </div>
      <div class="section">
        <button @click="handleTaskShare">
          任务：去邀请
        </button>
      </div>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import {  reactive } from 'vue';

import {   useDialog } from '@caikengren/uni-hooks';


import ModuleShare from './module-share.vue';


const assistShareInfo = reactive({
  invitePostTips: '邀请好友一起来玩游戏吧！',
  invitePostBackground: 'https://igame-10037599.file.myqcloud.com/pmdOA/pmdOA_XhE7x84Pvd3m.png',
  inviteId: 'ILG667ed5a3ae8bc078181274c6200b3702',
  inviteTaskId: 't_ZODxVp6Hk7at',
  inviteTaskType: 'invitereflow',
});

const { props, openDialog } = useDialog({
  modelValueField: 'show', // 双向绑定值
}, 'inviteDialog');


const handleTaskShare = () => {
  openDialog();
};


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
