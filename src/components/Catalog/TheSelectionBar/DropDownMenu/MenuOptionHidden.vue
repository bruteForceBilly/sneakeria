<template>
  <div
    class="bg-transparent border-solid border-black w-6 h-6 p-1 flex justify-center items-center mr-3"
    :class="option.checked ? 'bg-black' : 'bg-white'"
    style="border-width: 1px"
  >
    <slot name="input"> ... input goes here </slot>
  </div>
</template>

<script>
export default {
  name: "MenuOptionHidden",
  props: {
    option: Object,
  },
};
</script>

<style scoped></style>
