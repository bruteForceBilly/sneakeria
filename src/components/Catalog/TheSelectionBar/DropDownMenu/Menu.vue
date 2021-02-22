<template>
  <!-- Menu Base to be imported in 
  :class="isMobile ? 'block' : 'inline-block'"

relative

  -->
  <div
    v-if="item != null"
    :class="isMobile ? 'static' : 'relative'"
    @mouseover="!isMobile ? (isExpanded = !isExpanded) : ''"
    @mouseleave="!isMobile ? (isExpanded = !isExpanded) : ''"
    @click="isExpanded = !isExpanded"
  >
    <MenuButton
      :isExpanded="isExpanded"
      :hasSelected="hasSelected"
      :isMobile="isMobile"
      :item="item"
    >
      <template v-slot:menu-label> {{ item.label }}</template>
    </MenuButton>

    <MenuContainer :isExpanded="isExpanded" :item="item" :isMobile="isMobile">
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
    isMobile: Boolean,
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
      isExpanded: false,
    };
  },

  watch: {
    hover: {
      immediate: true,
      handler: function (val) {
        return (this.isExpanded = val);
      },
    },
  },
};
</script>
