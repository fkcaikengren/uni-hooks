<template>
  <div style="padding: 16px;">
    <p style="color:grey">
      你可以在 input 框中快速输入文本，先会以0.5节流，（2秒后）后面会以3s节流执行
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


function getUsername(param: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${String(Date.now())} - ${param}`);
    }, 1000);
  });
}

const text = ref('');

const throttleWait = ref(500);

setTimeout(() => {
  throttleWait.value = 3000;
}, 2000);

const { data, run } = useRequest(() => getUsername(text.value), {
  throttleWait,
  manual: true,
});

watch(text, () => {
  run();
});
</script>
