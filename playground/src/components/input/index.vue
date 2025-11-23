<template>
  <input
    class="vhp-input"
    :value="modelValue"
    @input="updateValue"
  >
</template>

<script setup>


defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const getEventDetail = (e) => {
  if (e && typeof e === 'object') {
    if (e.detail && typeof e.detail === 'object' && e.detail.value !== undefined) {
      return { value: e.detail.value };
    }
    const t = e.target ?? e.currentTarget;
    if (t && typeof t === 'object' && t.value !== undefined) {
      return { value: t.value };
    }
    if (e.value !== undefined) {
      return { value: e.value };
    }
  }
  return { value: e };
};

const updateValue = (event) => {
  const { value } = getEventDetail(event);
  emit('update:modelValue', value);
};
</script>

<style lang="scss" scoped>
.vhp-input {
  display: inline-block !important;
  opacity: 1;
  background-color: rgb(227, 227, 227);
  color: rgb(0, 0, 0);
  padding-left: 8px;
  height: 36px;
  font-weight: normal;
  font-size: 15px;
  border-radius: 5px;
  transition: 0.3s;
}
</style>
