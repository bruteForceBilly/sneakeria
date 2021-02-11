<template>
  <div class="flex justify-start">
    <!-- <div
      class="flex"
      v-for="select in selectedOptionsElements"
      :key="select.value"
    >
      
    </div> -->

    <div v-for="option in selectedOptionsElements" :key="option.value">
      <div v-if="option.checked">
        <button
          v-bind:checked="option.checked"
          @click="toggleOption(option)"
          class="tag focus:outline-none"
        >
          {{ option.label }}
          <span class="font-hairline text-gray-800 ml-1 inline">x</span>
        </button>
      </div>
    </div>

    <div
      v-if="priceOperators !== false"
      @click="togglePriceOperator()"
      class="tag focus:outline-none"
    >
      {{ priceOperators }}
      <span class="font-hairline text-gray-800 ml-1 inline">x</span>
    </div>

    <div
      v-show="Object.keys(selectedOptionsObject).length > 0"
      @click="clearAllTags()"
      class="cursor-pointer"
    >
      <span
        class="px-0 mx-2 underline bg-transparent py-1 text-gray-800 font-sans font-normal text-sm lowercase"
      >
        Clear all
      </span>
      <span class="font-hairline text-gray-600 ml-1 inline">x</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
// RENAME COMPONENT TO TAGSBAR AND DECOUPLE IT FROM SELECTION BAR

export default {
  props: {
    selects: {
      type: Array,
      required: true,
    },
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
    updateRouteQueryParams: Function,
  },
  computed: {
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
    ...mapActions("navigation", ["selectOptionsCheckToggle"]),
    ...mapMutations("navigation", ["toggleElement"]),

    toggleOption(option) {
      this.$store.commit("setByRoute", false);
      /* return option.checked === false
        ? (option.checked = true)
        : (option.checked = false); */
      console.log("toggle", option);
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
  beforeUpdate() {
    console.log("selected el: ", this.selectedOptionsElements);
  },
};
</script>

<style lang="postcss" scoped>
.tag {
  @apply py-1 cursor-pointer text-gray-800 font-sans font-normal text-sm lowercase px-4 no-underline bg-gray-300 rounded-full mr-2;
}

.clear-all {
  @apply px-0 mx-2 cursor-pointer underline bg-transparent py-1 text-gray-800 font-sans font-normal text-sm lowercase;
}
</style>
