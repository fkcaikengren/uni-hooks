<template>
  <div>
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
import { useRequest, useBoolean, useStorageSync } from '@caikengren/uni-hooks';

import type { CachedData } from '@caikengren/uni-hooks';
const [state, { toggle }] = useBoolean();
const cacheKey = 'setCache-demo';
const cacheData = useStorageSync<CachedData>(cacheKey, {} as CachedData);

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${String(Date.now())} - useRequest`);
    }, 1000);
  });
}


const { data } = useRequest(() => getUsername(), {
  ready: state,
  cacheKey,
  staleTime: 5000,

  setCache: (res) => {
    cacheData.value = res;
  },
  getCache: () => cacheData.value,
});
</script>
