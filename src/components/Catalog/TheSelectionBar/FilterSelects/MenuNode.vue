<template>
  <div>
    <Menu v-if="select.value === null" :item="select"> </Menu>

    <MenuNode
      class="inline"
      v-for="select in node"
      :key="select.id + select.name"
      :select="select"
      :node="next(select)"
    >
    </MenuNode>
  </div>
</template>

<script>
import Menu from "../DropDownMenu/Menu.vue";

export default {
  name: "MenuNode",
  components: {
    Menu,
  },
  props: {
    node: {
      type: Array,
      default: function () {
        return [];
      },
    },
    select: {
      type: Object,
      default: function () {
        return {};
      },
    },
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    next(select) {
      let next = null;
      if (select?.attributes) {
        next = select.attributes;
      }
      if (select?.options) {
        next = select.options;
      }
      return next;
    },
  },
  beforeUpdate() {
    console.log("selec props", this.select);
  },
};
</script>
<style lang="postcss" scoped></style>
