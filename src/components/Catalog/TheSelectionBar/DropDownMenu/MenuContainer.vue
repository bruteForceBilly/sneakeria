<template>
  <div>
    <!-- 

    The purpose of this component is to stylize the dropdown container in different ways depending on the input type

    What are the types of drop downs? 
    We have color, slider and normal after feature or after utility? 
    Util beeing base-l, base-r, lg-l, lg-r etc -->
    <div
      v-if="item.inputType === 'checkbox'"
      class="position-after-height inline-block z-20 absolute w-40 border-black outline-none border px-3 py-1 bg-white rounded-none"
      :class="hover ? 'inline-block' : 'hidden'"
    >
      <ul class="px-1 pb-1">
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="item.inputType === 'checkboxColor'"
      class="position-after-height inline-block z-20 absolute w-64 border-black outline-none border px-3 py-1 bg-white rounded-none"
      :class="hover ? 'inline-block' : 'hidden'"
    >
      <ul class="px-1 pb-1 flex flex-row flex-wrap">
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="item.inputType === 'hidden'"
      class="position-after-height inline-block z-20 absolute w-40 border-black outline-none border px-3 py-1 bg-white rounded-none"
      :class="hover ? 'inline-block' : 'hidden'"
    >
      <ul class="px-1 pb-1">
        <slot name="options"> ... waiting for content</slot>
      </ul>
    </div>

    <div
      v-if="item.inputType === 'range'"
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
  props: {
    item: {
      type: Object,
    },
    hover: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.position-after-height {
  top: calc(100% - 2px);
}
</style>
