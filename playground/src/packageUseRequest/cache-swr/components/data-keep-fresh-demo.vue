<template>
  <div>
    <p style="color: gray; margin-bottom: 10px;">
      设置 staleTime，我们可以指定数据新鲜时间，在这个时间内，不会重新发起请求
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
import { useBoolean, useRequest } from '@caikengren/uni-hooks';

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
  cacheKey: 'staleTime-demo',
  staleTime: 20000,
});
</script>
