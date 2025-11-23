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
import { useRequest, useBoolean, useStorage } from '@caikengren/uni-hooks';

import type { CachedData } from '@caikengren/uni-hooks';
const [state, { toggle }] = useBoolean();
const cacheKey = 'cacheKey-async-storage';
const cacheData = useStorage<CachedData>(cacheKey, {} as CachedData);

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${String(Date.now())} - async - useRequest`);
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
