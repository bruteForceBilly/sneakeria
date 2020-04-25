<template>
  <div>
    <div
      class="position-after-height bg-white inline-block absolute w-40 border-black outline-none border px-3 py-1 bg-white rounded-none"
      :class="hover ? 'inline-block' : 'hidden'"
    >
      <ul class="px-1 pb-1">
        <slot> ... waiting for content</slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterDropDownMenuOptionsContainer",
  props: ["hover", "optionsLabel"]
};
</script>

<style scoped>
.position-after-height {
  top: calc(100% - 1px);
}
</style>
