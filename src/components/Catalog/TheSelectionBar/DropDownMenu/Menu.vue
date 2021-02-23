<template>
  <!-- Menu Base to be imported in 
  :class="isMobile ? 'block' : 'inline-block'"

relative

  -->
  <div :class="item != null && isMobile ? 'static' : 'relative'">
    <div v-if="!showMenuButton">
      <MenuContainer :isExpanded="true" :item="item" :isMobile="isMobile">
        <template v-slot:options>
          <slot name="menu-items"> ... menu-items waiting for content</slot>
        </template>
      </MenuContainer>
    </div>
    <div
      v-else
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
  </div>
</template>

<script>
import MenuButton from "./MenuButton.vue";
import MenuContainer from "./MenuContainer.vue";

export default {
  name: "CatalogSelectionBarDropDownMenu",
  props: {
    showMenuButton: {
      type: Boolean,
      default: true,
    },
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
