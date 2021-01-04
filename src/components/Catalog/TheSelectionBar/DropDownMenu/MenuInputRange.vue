<template>
  <div class="flex flex-col items-center w-full">
    <span class="mb-1 font-normal"> {{ displayValueHeading }} </span>
    <vue-slider
      class="ml-2 mt-2"
      width="208px"
      height="2px"
      :min="rangeMin"
      :max="rangeMax"
      dot-size="20"
      v-model.lazy="value"
      tooltip="none"
      ref="slider"
      :silent="false"
      :lazy="true"
      :enable-cross="true"
      @dragging="updateDisplayValue()"
      @drag-end="updateRouter()"
    >
    </vue-slider>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "@/assets/css/vue-slider/index.css";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    VueSlider,
  },
  props: {
    option: Object,
    item: Object,
  },
  data() {
    return {
      value: null,
      rangeMin: null,
      rangeMax: null,
      displayValue: null,
    };
  },
  methods: {
    updateDisplayValue() {
      return (this.displayValue = this.$refs.slider.getValue());
    },
    updateRouter() {
      let searchQuery =
        this.searchQueryString +
        `price_min=${this.tupleMin(this.value)}&price_max=${this.tupleMax(
          this.value
        )}`;
      this.$router.push("search?" + searchQuery);
    },
    tupleMin(tuple) {
      return tuple[0];
    },
    tupleMax(tuple) {
      return tuple[tuple.length - 1];
    },
  },
  computed: {
    ...mapState("route", ["path", "params", "query"]),
    ...mapState("search", ["queryParamsString"]),
    ...mapGetters("search", [
      "foundProductsPricesOffered",
      "searchQueryString",
      "foundProducts",
    ]),
    ...mapGetters("navigation", ["selectedOptionsObject"]),
    productPriceRange() {
      let min, max;
      min = Math.min(...this.foundProductsPricesOffered);
      max = Math.max(...this.foundProductsPricesOffered);
      return [min, max];
    },
    displayValueHeading() {
      return `€ ${this.displayValue[0]} - € ${
        this.displayValue[this.displayValue.length - 1]
      }`;
    },
  },
  watch: {
    selectedOptionsObject: {
      deep: true,
      handler: function (newVal) {
        if (this.foundProductsPricesOffered.length > 0) {
          if (
            this.tupleMin(this.productPriceRange) > this.tupleMin(this.value)
          ) {
            this.$refs.slider.setValue(
              this.tupleMin(this.productPriceRange),
              this.tupleMax(this.value)
            );
            this.updateDisplayValue();
          }

          if (
            this.tupleMax(this.productPriceRange) > this.tupleMax(this.value)
          ) {
            this.$refs.slider.setValue(
              this.tupleMin(this.value),
              this.tupleMax(this.productPriceRange)
            );
            this.updateDisplayValue();
          }
        }
      },
    },
  },
  created() {
    this.rangeMin = this.tupleMin(this.productPriceRange);
    this.rangeMax = this.tupleMax(this.productPriceRange);
    this.value = [...this.productPriceRange];
    this.displayValue = [...this.value];
  },
  mounted() {
    this.$refs.slider.setValue(this.value);
    this.updateDisplayValue();
  },
};
</script>
