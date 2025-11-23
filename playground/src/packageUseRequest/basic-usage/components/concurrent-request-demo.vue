<template>
  <div>请求结果：{{ loading ? 'loading' : data }}</div>
  <div style="margin-top:8px">
    <vhp-button @click="runA">
      发起请求A
    </vhp-button>
    <vhp-button
      style="margin-left: 8px;"
      @click="runB"
    >
      发起请求B
    </vhp-button>
  </div>
</template>

<script lang="ts" setup>
import { useRequest } from '@caikengren/uni-hooks';

function request(name:string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
}

const { run, data, loading } = useRequest(request, { manual: true });

const runA = () => {
  run('A');
};


const runB = () => {
  run('B');
};

</script>
