<template>
  <div>
    <div
      class="position-after-height inline-block z-20 absolute w-40 border-black outline-none border px-3 py-1 bg-white rounded-none"
      :class="hover ? 'inline-block' : 'hidden'"
    >
      <ul class="px-1 pb-1">
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogFilterBarDropDownMenuContainer",
  props: ["hover"],
};
</script>

<style scoped>
.position-after-height {
  top: calc(100% - 2px);
}
</style>
