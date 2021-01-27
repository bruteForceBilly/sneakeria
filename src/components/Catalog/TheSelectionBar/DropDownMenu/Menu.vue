<template>
  <!-- Menu Base to be imported in -->
  <div
    v-if="item != null"
    class="relative inline-block mx-2"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <MenuButton :hover="hover" :hasSelected="hasSelected">
      <template v-slot:menu-label> {{ item.label }} </template>
    </MenuButton>

    <MenuContainer :hover="hover" :item="item">
      <template v-slot:options>
        <slot name="menu-items"> ... menu-items waiting for content</slot>
      </template>
    </MenuContainer>
  </div>
</template>

<script>
import MenuButton from "./MenuButton.vue";
import MenuContainer from "./MenuContainer.vue";

export default {
  name: "CatalogSelectionBarDropDownMenu",
  props: {
    item: {
      type: Object,
      default: function () {
        return {};
      },
    },
    selectedOptionsObject: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
  },
  components: {
    MenuButton,
    MenuContainer,
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    hasSelected() {
      return Object.keys(this.selectedOptionsObject).includes(this.item.name);
    },
  },
  created() {
    console.log("item", this.item);
  },
};
</script>
