<template>
  <div
    class="relative inline-block mx-2"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <MenuButton v-if="itemLabel" :hover="hover" :hasSelected="hasSelected">
      <template v-slot:menu-label> {{ itemLabel }} </template>
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
    itemName: {
      type: String,
      required: false
    },
    itemLabel: {
      type: String,
      required: false
    },
    selectedOptionsObject: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
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
      return Object.keys(this.selectedOptionsObject).includes(this.itemName);
    }
  }
};
</script>
