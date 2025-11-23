<template>
  <div style="padding: 16px;">
    <p style="color:grey">
      请求错误重试三次,加上首次请求失败，所以最后为四次错误
    </p>
    <div style="margin-top: 16px;">
      Error count： <span>{{ count }}</span>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';

import { useRequest } from '@caikengren/uni-hooks';

function getUsername(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error');
    }, 1000);
  });
}

const count = ref(0);

useRequest(() => getUsername(), {
  retryCount: 3,
  onError: () => {
    count.value += 1;
  },
});
</script>
