<template>
  <div style="padding: 16px;">
    <p style="color:grey">
      input 框中快速输入文本,频繁触发 run，只会在最后一次触发结束后等待 2000ms 执行
    </p>
    <div style="margin-top: 16px;">
      <vhp-input
        v-model="text"
        type="text"
      />
    </div>
    <div style="margin-top: 16px;">
      value：{{ data }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import { useRequest } from '@caikengren/uni-hooks';


function getUsername(param:string): Promise<string> {
  return new Promise((resolve) => {
    console.log('getUsername', param);
    setTimeout(() => {
      resolve(`${String(Date.now())} - ${param}`);
    }, 300);
  });
}

const text = ref('');

const { data, run } = useRequest(() => getUsername(text.value), {
  debounceWait: 2000,
  manual: true,
});

watch(text, () => {
  console.log('watch', text.value);
  run();
});
</script>
