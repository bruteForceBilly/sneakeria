<template>
  <div>
    <div class="flex justify-start content-center align-middle">
      <div v-for="option in selectedOptionsElements" :key="option.value">
        <div v-if="option.checked">
          <button
            v-bind:checked="option.checked"
            @click="toggleOption(option)"
            class="tag focus:outline-none flex flex-nowrap"
          >
            <span>{{ option.label }}</span>
            <span class="font-thin text-gray-800 ml-1 inline">x</span>
          </button>
        </div>
      </div>

      <div
        v-if="priceOperators !== false"
        @click="togglePriceOperator()"
        class="tag focus:outline-none"
      >
        {{ priceOperators }}
        <span class="font-thin text-gray-800 ml-1 inline">x</span>
      </div>

      <div
        v-show="Object.keys(selectedOptionsObject).length > 0"
        @click="clearAllTags()"
        class="cursor-pointer"
      >
        <span
          class="px-0 mx-2 underline bg-transparent text-black font-sans font-normal text-xs lowercase"
        >
          Clear all
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
// RENAME COMPONENT TO TAGSBAR AND DECOUPLE IT FROM SELECTION BAR

export default {
  props: {
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
    updateRouteQueryParams: Function,
  },
  computed: {
    ...mapState("navigation", ["navigationIsLoading"]),
    ...mapGetters("navigation", ["selectedOptionsElements"]),
    ...mapState("route", ["path", "params", "query"]),
    priceOperators() {
      let priceMin =
        this.$store.state.route.query["price.amountOffered_gte"] ?? false;
      let priceMax =
        this.$store.state.route.query["price.amountOffered_lte"] ?? false;

      return priceMin && priceMax ? `€ ${priceMin} - € ${priceMax}` : false;
    },
  },
  methods: {
    ...mapMutations("navigation", ["toggleElement"]),

    toggleOption(option) {
      this.$store.commit("setByRoute", false);
      return this.toggleElement(option);
    },
    togglePriceOperator() {
      this.updateRouteQueryParams(this.selectedOptionsObject);
    },
    clearAllTags() {
      let copySelectedOptionsElements = [...this.selectedOptionsElements];
      return copySelectedOptionsElements.forEach((option) =>
        this.toggleOption(option)
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
.tag {
  @apply py-1 cursor-pointer text-black font-sans font-normal text-sm lowercase px-2 no-underline border border-gray-300 bg-gray-100 rounded-sm mr-2;
}

.clear-all {
  @apply px-0 mx-2 cursor-pointer underline bg-transparent py-1 text-gray-800 font-sans font-normal text-sm lowercase;
}
</style>
