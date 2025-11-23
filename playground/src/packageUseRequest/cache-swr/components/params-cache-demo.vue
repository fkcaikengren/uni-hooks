<template>
  <div>
    <vhp-button @click="() => toggle()">
      show/hidden
    </vhp-button>
    <div
      v-if="state"
      style="padding: 16px;"
    >
      <div>{{ `loading: ${loading}` }}</div>
      <vhp-input
        v-model="id"
        type="text"
      />
      <vhp-button
        style="margin-left: 12px;"
        @click="run(id)"
      >
        send
      </vhp-button>
      <div>params ID：{{ id }}</div>
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

import { useBoolean, useRequest } from '@caikengren/uni-hooks';

const [state, { toggle }] = useBoolean();

const id = ref('');

function getUsername(userId: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${String(Date.now())}-${userId}`);
    }, 1000);
  });
}

const { data, params, loading, run } = useRequest(getUsername, {
  cacheKey: 'cacheKey-demo3',
});

watchEffect(() => {
  id.value = params?.[0];
});
</script>
