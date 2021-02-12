<template>
  <div>
    <div
      v-if="itemCcontainerSize === 'base'"
      class="position-after-height inline-block z-20 absolute w-40 border-black outline-none border pt-2 pb-3 bg-white rounded-none"
      :class="hover ? 'inline-block' : 'hidden'"
    >
      <ul>
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="itemCcontainerSize === 'base-left'"
      class="position-after-height base-left inline-block z-20 absolute w-64 border-black outline-none border pt-2 pb-3 bg-white rounded-none"
      :class="hover ? 'inline-block' : 'hidden'"
    >
      <ul>
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="itemCcontainerSize === 'wide'"
      class="position-after-height inline-block z-20 absolute w-64 border-black outline-none border pt-2 pb-3 bg-white rounded-none"
      :class="hover ? 'inline-block' : 'hidden'"
    >
      <ul class="flex flex-row flex-wrap">
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogFilterBarDropDownMenuContainer",
  props: {
    item: {
      type: Object,
    },
    itemCcontainerSize: {
      type: String,
      default: function () {
        return this.item?.containerSize ? this.item.containerSize : "base";
      },
    },
    hover: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.position-after-height {
  top: calc(100% - 1px);
}

.base-left {
  right: 0;
}
</style>
