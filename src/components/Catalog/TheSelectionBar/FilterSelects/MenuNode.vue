<template>
  <div>
    <Menu :item="select"> </Menu>

    <MenuNode v-for="select in selects" :key="select.name" :select="select">
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
    selects: Array,
    select: Object,
    options: Array,
    attributes: Array,
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    hasAttributes() {
      return Array.isArray(this.options.attributes) &&
        this.options.attributes.length < 0
        ? true
        : false;
    },
  },
};
</script>
<style lang="postcss" scoped></style>
