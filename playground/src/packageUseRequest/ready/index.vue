<template>
  <div style="padding: 16px;">
    <p style="color:grey">
      每次 ready 从 false 变为 true 时，都会重新发起请求
    </p>
    <div>ready: {{ ready }}</div>
    <vhp-button
      style="margin-top: 16px;"
      @click="() => toggle()"
    >
      changeReady
    </vhp-button>
    <div style="margin-top: 16px;">
      {{ data }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBoolean, useRequest } from '@caikengren/uni-hooks';


function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(String(Date.now()));
    }, 1000);
  });
}
const [ready, { toggle }] = useBoolean(false);

const { data } = useRequest(() => getUsername(), {
  ready,
});
</script>
