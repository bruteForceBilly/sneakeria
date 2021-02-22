<template>
  <MenuNode
    class="mobile-menu-node-grid pb-px bg-gray-300"
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
  gap: 1px;
}
</style>
