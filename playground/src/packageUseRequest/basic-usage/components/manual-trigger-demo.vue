<template>
  <div>name：{{ loading ? 'loading' : data }}</div>
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useRequest } from '@caikengren/uni-hooks';

const errMsg = ref('');

function getUsername(params: { desc: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve(`uni-hooks ${params.desc}`);
      reject('error');
    }, 1000);
  });
}
const value = ref('');
const { data: data, loading, run } = useRequest(getUsername, {
  manual: true,
  debugKey: 'demo1',
  onSuccess: (data) => {
    alert(data);
    errMsg.value = '';
  },
  onError: (error) => {
    errMsg.value = 'error';
    alert(error);
  },
});

function handleClick() {
  console.log('click the button');
  run({ desc: value.value });
}

// run({ desc: 'nice' })
</script>
