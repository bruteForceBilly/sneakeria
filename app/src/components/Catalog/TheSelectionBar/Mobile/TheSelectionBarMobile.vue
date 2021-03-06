<template>
  <div class="mobile-menu-grid">
    <div v-for="menu in selectionbarMobile" :key="menu.name">
      <div class="h-full w-full">
        <MenuButton :isBlock="true" @click.native="mobileMenuSelected = menu">
          <template v-slot:menu-label>
            <span class="text-xs">{{ menu.label }} </span></template
          >
        </MenuButton>
      </div>
    </div>

    <div
      v-if="isMobileScreen && mobileMenuSelected != null"
      class="fixed top-0 left-0 right-0 bottom-0 z-60 h-screen w-screen flex flex-col bg-white overflow-y-auto"
    >
      <div
        v-if="mobileMenuSelected.name == 'filterBy'"
        class="absolute w-full pb-28"
      >
        <div class="flex justify-end items-center p-3 mb-4">
          <span class="flex-grow tracking-tighter uppercase text-lg inline"
            >{{ mobileMenuSelected.label }}
          </span>

          <span
            v-show="selectedOptionsElements.length > 0"
            @click="clearAllTags()"
            class="capitalize cursor-pointer inline px-0 mx-2 underline bg-transparent text-gray-800 font-sans font-normal text-xs"
            >Clear all</span
          >
          <img
            @click="mobileMenuSelected = null"
            src="@/assets/x.svg"
            class="ml-4 mr-2"
          />
        </div>

        <FilterSelects
          :isMobile="true"
          :selected-options-object="settings.selectedOptionsObject"
          :selects="settings.selectionbarFilters"
        ></FilterSelects>

        <RangeSelects
          :isMobile="true"
          :range-sliders="settings.selectionbarRanges"
        ></RangeSelects>

        <transition name="button-slide-fade">
          <div
            v-if="selectedOptionsElements.length > 0"
            class="fixed right-0 bottom-0 left-0 w-full p-7 z-70 flex flex-col justify-end"
          >
            <ProductCardButton
              class="w-full"
              @click.native="mobileMenuSelected = null"
              icon="none"
              button-style="primary primary--call-to-action"
            >
              APPLY ⟶
            </ProductCardButton>
          </div>
        </transition>
      </div>

      <div>
        <div v-if="mobileMenuSelected.name == 'sortBy'">
          <div class="flex justify-end items-center p-3">
            <span class="flex-grow tracking-tighter uppercase text-lg inline">{{
              mobileMenuSelected.label
            }}</span>

            <img
              @click="mobileMenuSelected = null"
              src="@/assets/x.svg"
              class="ml-4 mr-2"
            />
          </div>
          <SortSelects :isMobile="true" :sorts="settings.selectionbarSorts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import MenuButton from "@/components/Catalog/TheSelectionBar/DropDownMenu/MenuButton.vue";
import ProductCardButton from "@/components/Catalog/ProductCard/ProductCardButton.vue";

import FilterSelects from "../FilterSelects/FilterSelects.vue";
import SortSelects from "../SortSelects/SortSelects.vue";
import RangeSelects from "../RangeSelects/RangeSelects.vue";

export default {
  name: "SelectionBarMobile",
  props: {
    navigationIsloading: {
      type: Boolean,
    },
    settings: {
      type: Object,
    },
  },
  components: {
    FilterSelects,
    SortSelects,
    RangeSelects,
    ProductCardButton,
    MenuButton,
  },
  computed: {
    ...mapGetters("navigation", [
      "selectionbarMobile",
      "selectedOptionsElements",
    ]),
    isMobileScreen() {
      return this.$mq !== "xl" ? true : false;
    },
  },
  data() {
    return {
      mobileMenuSelected: null,
      mobileMenuSelectedOpen: null,
    };
  },
  methods: {
    ...mapMutations("navigation", ["toggleElement"]),

    toggleOption(option) {
      this.$store.commit("setByRoute", false);
      return this.toggleElement(option);
    },
    clearAllTags() {
      return [...this.selectedOptionsElements].forEach((option) =>
        this.toggleOption(option)
      );
    },
  },
};
</script>

<style scoped>
.button-slide-fade-enter-active,
.button-slide-fade-leave-active {
  transition: all 0.3s ease;
}

.button-slide-fade-enter,
.button-slide-fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
