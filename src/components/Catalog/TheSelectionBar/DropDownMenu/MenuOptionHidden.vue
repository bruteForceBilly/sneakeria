<template>
  <div
    class="bg-transparent border-solid border-black w-6 h-6 p-1 flex justify-center items-center mr-3"
    :class="option.checked ? 'bg-black' : 'bg-white'"
    style="border-width: 1px"
  >
    <input type="checkbox" class="hidden" v-model="option.checked" />
  </div>
</template>

<script>
export default {
  name: "MenuOptionHidden",
  props: {
    option: Object,
    item: Object,
  },
};
</script>

<style scoped></style>
