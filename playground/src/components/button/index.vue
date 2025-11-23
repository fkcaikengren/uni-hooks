<template>
  <button
    class="vhp-button"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'VhpButton',
  emits: ['click'],
};
</script>

<style lang="scss" scoped>
  .vhp-button {
    display: inline-block !important;
    padding: 0;
    border-color: #202020;
    color: #fefefe;
    background-color: #202020;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 5px;
    min-width: 60px;
    height: 36px;
    line-height: 36px;
    font-weight: normal;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s, box-shadow 0.4s,
      opacity 0.4s;
    cursor: pointer;
    transform: scale(1);

  }

  .vhp-button:hover {
    border-color: #202020;
    background-color: #202020;
    opacity: 0.8;
  }

  .vhp-button::after {
    position: absolute;
    content: '';
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    box-shadow: 0 0 0 6px #202020;
    transition: 0.4s;
  }
  .vhp-button:active::after {
    box-shadow: none;
    opacity: 1;
    transition: 0s; /*取消过渡*/
  }
</style>
