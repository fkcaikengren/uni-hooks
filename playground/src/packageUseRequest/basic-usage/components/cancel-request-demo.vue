<template>
  <div>name：{{ loading ? 'loading..' : data }}</div>
  <div v-show="errMsg">
    errMsg：{{ errMsg }}
  </div>
  <div style="margin-top:8px">
    <vhp-input v-model="value" />
    <vhp-button
      style="margin-left: 8px;"
      @click="handleClick"
    >
      Edit
    </vhp-button>
    <vhp-button
      style="margin-left: 8px;"
      @click="handleCancel"
    >
      Cancel
    </vhp-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useRequest } from  '@caikengren/uni-hooks';
const errMsg = ref('');

function getUsername(params: { desc: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve(`request-${params.desc}`);
      reject('error');
    }, 2000);
  });
}
const value = ref('');
const { data, loading, run, cancel } = useRequest(getUsername, {
  manual: true,
  debugKey: 'demo6',
  onError: () => {
    errMsg.value = 'error';
    alert('error');
  },
  onSuccess: () => {
    errMsg.value = '';
  },
});

const handleClick = () => {
  run({ desc: value.value });
};

const handleCancel = () => {
  cancel();
};
</script>
