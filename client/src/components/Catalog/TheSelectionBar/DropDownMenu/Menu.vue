<template>
  <div :class="item != null && isMobile ? 'static' : 'relative'">
    <div v-if="!showMenuButton">
      <MenuContainer :isExpanded="true" :item="item" :isMobile="isMobile">
        <template v-slot:options>
          <slot name="menu-items"> ... menu-items waiting for content</slot>
        </template>
      </MenuContainer>
    </div>
    <div v-else @click="isExpanded = !isExpanded">
      <MenuButton
        v-on-clickaway="away"
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
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "CatalogSelectionBarDropDownMenu",
  mixins: [clickaway],
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
  methods: {
    away: function () {
      if (this.isMobile === false) {
        this.isExpanded = false;
      }
    },
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
