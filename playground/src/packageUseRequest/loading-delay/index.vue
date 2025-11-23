
<template>
  <div style="padding: 16px;">
    <p style="color:grey; margin-bottom: 10px;">
      如果你快速的点击 run, 没使用 loadingDelay 的数据将会闪烁。
    </p>
    <div>Username：{{ loading ? 'loading' : data }}</div>
    <div>Username：{{ loading1 ? 'loading...' : data1 }}</div>
    <vhp-button @click="run">
      run
    </vhp-button>
  </div>
</template>

<script lang="ts" setup>
import { useRequest } from '@caikengren/uni-hooks';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`uni-hooks useRequest A ${new Date().getTime()}`);
    }, 1);
  });
}

const { data, loading, run: runData } = useRequest(() => getUsername());
const { data: data1, loading: loading1, run: runData1 } = useRequest(() => getUsername(), {
  loadingDelay: 300,
});

const run = () => {
  runData();
  runData1();
};
</script>
