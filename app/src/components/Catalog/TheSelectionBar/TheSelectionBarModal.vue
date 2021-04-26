<template>
  <div
    v-if="isMobileScreen && mobileMenuSelected != null"
    class="fixed top-0 left-0 right-0 bottom-0 z-60 h-screen w-screen flex flex-col bg-white overflow-y-auto"
  >
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
      <slot name="sorts"></slot>
    </div>

    <div
      v-if="mobileMenuSelected.name == 'filterBy'"
      class="absolute w-full pb-28"
    >
      <div class="flex justify-end items-center p-3">
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

      <div @click="mobileMenuSelected = null">
        <slot name="filters"></slot>
      </div>

      <transition name="button-slide-fade">
        <div
          v-if="selectedOptionsElements.length > 0"
          class="fixed right-0 bottom-0 left-0 w-full p-7 z-70 flex flex-col justify-end"
        >
          <ProductCardButton id="ProductCardButton"
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ProductCardButton from "@/components/Catalog/ProductCard/ProductCardButton.vue";

export default {
  name: "SelectionBarModal",
  components: {
    ProductCardButton,
  },
  props: {
    settings: {
      type: Object,
    },
  },
  data() {
    return {
      mobileMenuSelected: null,
      mobileMenuSelectedOpen: null,
    };
  },
  computed: {
    ...mapGetters("navigation", [
      "selectedOptionsElements",
      "selectionbarMobile",
    ]),
    isMobileScreen() {
      return this.$mq !== "xl" ? true : false;
    },
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

<style lang="postscss" scoped>
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
