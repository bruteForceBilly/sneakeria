<template>
  <MenuNode
    :class="[
      isMobile ? '' : 'py-1 inline-flex justify-start',
      this.$browserDetect.isIOS
        ? 'mobile-menu-node-grid border-gray-300 border-b'
        : '',
    ]"
    :node="selects"
    :isMobile="isMobile"
  >
  </MenuNode>
</template>

<script>
import MenuNode from "./MenuNode.vue";

export default {
  components: {
    MenuNode,
  },
  props: {
    selects: {
      type: Array,
    },
    isMobile: {
      type: Boolean,
    },
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>
<style lang="postcss" scoped>
.mobile-menu-node-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
}
</style>
