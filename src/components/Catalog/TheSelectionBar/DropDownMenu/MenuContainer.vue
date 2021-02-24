<template>
  <div>
    <div
      v-if="itemCcontainerSize === 'base' && !isMobile"
      class="bg-white border-black border z-20 w-40 position-after-height absolute outline-none pt-2 pb-3 rounded-none"
      :class="[isExpanded ? 'inline-block' : ' hidden']"
    >
      <ul>
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>
    <div
      v-else-if="itemCcontainerSize === 'base' && isMobile"
      class="inline-block z-20 w-full outline-none pt-2 pb-3 rounded-none"
      :class="[
        isExpanded ? 'inline-block w-full border-0 bg-white' : ' hidden',
      ]"
    >
      <ul>
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="itemCcontainerSize === 'base-left' && !isMobile"
      class="position-after-height base-left inline-block z-20 absolute w-64 border-black outline-none border pt-2 pb-3 bg-white rounded-none"
      :class="isExpanded ? 'inline-block' : 'hidden'"
    >
      <ul>
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>
    <div
      v-if="itemCcontainerSize === 'base-left' && isMobile"
      class="position-after-height base-left inline-block z-20 w-full outline-none pt-2 pb-3 bg-white rounded-none"
      :class="isExpanded ? 'inline-block' : 'hidden'"
    >
      <ul>
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="itemCcontainerSize === 'wide' && !isMobile"
      class="position-after-height inline-block z-20 absolute w-64 border-black outline-none border pt-2 pb-3 bg-white rounded-none"
      :class="isExpanded ? 'inline-block' : 'hidden'"
    >
      <ul class="flex flex-row flex-wrap">
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="itemCcontainerSize === 'wide-center' && !isMobile"
      class="position-after-height inline-block z-20 absolute w-64 border-black outline-none border pt-2 pb-3 bg-white rounded-none"
      :class="isExpanded ? 'inline-block' : 'hidden'"
    >
      <ul class="flex flex-row flex-wrap">
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="itemCcontainerSize === 'wide' && isMobile"
      class="inline-block z-20 w-full outline-none pt-2 pb-3 rounded-none"
      :class="isExpanded ? 'inline-block w-full border-0 bg-white' : 'hidden'"
    >
      <ul class="flex flex-row flex-wrap justify-start">
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="itemCcontainerSize === 'wide-center' && isMobile"
      class="inline-block z-20 w-full outline-none pt-2 pb-3 rounded-none"
      :class="isExpanded ? 'inline-block w-full border-0 bg-white' : 'hidden'"
    >
      <ul class="flex flex-row flex-wrap justify-center">
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogFilterBarDropDownMenuContainer",
  props: {
    isExpanded: Boolean,
    isMobile: Boolean,
    item: Object,
    itemCcontainerSize: {
      type: String,
      default: function () {
        return this.item?.containerSize ? this.item.containerSize : "base";
      },
    },
  },

  data() {
    return {
      mobileExpandedClass: "inline-block w-full border-0 bg-white",
    };
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
