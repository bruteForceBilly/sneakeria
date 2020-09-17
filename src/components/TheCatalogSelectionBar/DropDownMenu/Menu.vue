<template>
  <div
    class="relative inline-block mx-2"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <MenuButton :hover="hover" :hasSelected="hasSelected">
      <template v-slot:menu-label>{{ item.label }} </template>
    </MenuButton>
    <MenuContainer :hover="hover">
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
      required: true
    },
    selectedOptionsObject: {
      type: Object
    }
  },
  components: {
    MenuButton,
    MenuContainer
  },
  data() {
    return {
      hover: false
    };
  },
  computed: {
    hasSelected() {
      return Object.keys(this.selectedOptionsObject).includes(this.item.name);
    }
  }
};
</script>
