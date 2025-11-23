<template>
  <h3>请求结果</h3>
  <div>name：{{ loading ? 'loading' : data }}</div>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue';

import { useRequest } from '@caikengren/uni-hooks';
const desc = ref('good');


function getUsername(params: { desc: string }): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`uni-hooks ${params.desc}`);
    }, 1000);
  });
}

const { data, loading } = useRequest(() => getUsername({ desc: desc.value }), {
  debugKey: 'demo',
  initialData: '000',
  refreshDeps: [desc],
});

onMounted(() => {
  setTimeout(() => {
    desc.value = 'good1111';
  }, 3000);
});

</script>
