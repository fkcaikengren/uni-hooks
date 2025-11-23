<template>
  <div>
    <p style="color: gray; margin-bottom: 10px;">
      设置了 cacheKey，在第二次渲染加载时，会优先返回缓存的内容，然后在背后重新发起请求
    </p>
    <vhp-button @click="() => toggle()">
      show/hidden
    </vhp-button>
    <div
      v-if="state"
      style="padding: 16px;"
    >
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useBoolean, useRequest } from  '@caikengren/uni-hooks';

const [state, { toggle }] = useBoolean();

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(String(Date.now()));
    }, 1000);
  });
}

const { data } = useRequest(() => getUsername(), {
  ready: state,
  cacheKey: 'cacheKey-demo',
});
</script>
