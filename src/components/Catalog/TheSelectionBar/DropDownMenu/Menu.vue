<template>
  <!-- Menu Base to be imported in -->
  <div
    v-if="item != null"
    class="relative inline-block"
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
    hasSelected: Boolean,
    item: {
      type: Object,
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
};
</script>
