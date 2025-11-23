<template>
  <div style="padding: 16px;">
    <div>
      Username：<span>{{ loading ? 'loading' : data }}</span>
      <br>
      <p>PollingInterval：{{ computedTime }}ms</p>
      <div style="margin-right: 8px;">
        <vhp-button @click="start()">
          Start
        </vhp-button>
        <vhp-button
          style="margin-left:8px ;"
          @click="update()"
        >
          time + 100ms
        </vhp-button>
        <vhp-button
          style="margin-left: 8px;"
          @click="cancel()"
        >
          Stop
        </vhp-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useRequest } from '@caikengren/uni-hooks';
let seqNum = 0;

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      seqNum += 1;
      const res = `第${seqNum}次： ${String(Date.now())}`;
      console.log(res);
      resolve(res);
    }, 1000);
  });
}

const time = ref(900);

const computedTime = computed(() => time.value + 100);

const { data, run, loading, cancel } = useRequest(() => getUsername(), {
  manual: true,
  pollingInterval: computedTime,
  pollingWhenHidden: false,
});

const start = () => {
  run();
};

const update = () => {
  time.value += 100;
};
</script>
