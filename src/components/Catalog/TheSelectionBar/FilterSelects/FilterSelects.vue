<template>
  <MenuNode class="inline" :node="selects"></MenuNode>
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
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>
