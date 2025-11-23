<script lang="ts" setup>
import { useBoolean } from '@caikengren/uni-hooks'

const [flag, { set, toggle }] = useBoolean(true)
</script>

<template>
  <div>
    <div>{{ flag }}</div>
    <br>
    <div>
      <p>
        <button
          type="primary"
          @click="() => set(true)"
        >
          Set True
        </button>
        <button
          type="primary"
          style="margin-top: 8px"
          @click="() => toggle()"
        >
          toggle
        </button>
      </p>
    </div>
  </div>
</template>
