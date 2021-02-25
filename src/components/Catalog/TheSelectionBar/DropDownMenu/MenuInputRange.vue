<template>
  <div class="flex flex-row w-full justify-center">
    <div class="inline-flex flex-col items-center">
      <span class="mb-1 font-normal"> {{ displayValueHeading }} </span>
      <vue-slider
        class="mt-2"
        :width="isMobile ? rangeWidth : '160px'"
        height="2px"
        :min="rangeMin"
        :max="rangeMax"
        dot-size="20"
        v-model.lazy="value"
        tooltip="none"
        ref="slider"
        :silent="true"
        :lazy="true"
        :enable-cross="true"
        @dragging="updateDisplayValue()"
        @drag-end="updateRouter()"
      >
      </vue-slider>
    </div>
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
    isMobile: {
      type: Boolean,
      default: false,
    },
    option: Object,
    item: Object,
  },
  data() {
    return {
      value: null,
      rangeMin: null,
      rangeMax: null,
      displayValue: null,
      windowWidth: window.innerWidth,
      rangeWidth: null,
    };
  },
  methods: {
    updateDisplayValue() {
      return (this.displayValue = this.$refs.slider.getValue());
    },
    updateRouter() {
      let queryConfig = this.queryParamsObject?.productProp.reduce(
        (acc, cv) => {
          for (const [key, value] of Object.entries(cv)) {
            acc[key] = value;
          }
          return acc;
        },
        {
          "price.amountOffered_gte": this.tupleMin(this.value),
          "price.amountOffered_lte": this.tupleMax(this.value),
        }
      );

      console.log("queryConfig", queryConfig, "router path", this.path);

      this.$router
        .push({
          name: "searchQueryRoute",
          query: queryConfig,
        })
        .catch((error) => {});
    },
    tupleMin(tuple) {
      return tuple[0];
    },
    tupleMax(tuple) {
      return tuple[tuple.length - 1];
    },
    initialize() {
      this.rangeMin = this.tupleMin(this.productPriceRange);
      this.rangeMax = this.tupleMax(this.productPriceRange);
      this.value = [...this.productPriceRange];
      this.displayValue = [...this.value];
    },
    setWidth(width) {
      return this.isMobile
        ? (this.rangeWidth = `${width * 0.75}px`)
        : (this.rangeWidth = "208px");
    },
  },
  computed: {
    ...mapState("route", ["path", "params", "query"]),
    ...mapState("search", ["queryParamsString", "queryParamsObject"]),
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
    foundProducts: {
      deep: true,
      immediate: false,
      handler: function (newVal, oldVal) {
        // IN THEORY WE SHOULD HAVE TO DO THIS
        // BECAUSE DESELECTING A TAG LEADS TO ROUTE UPDATE

        if (this.tupleMin(this.productPriceRange) > this.tupleMin(this.value)) {
          this.rangeMin = this.tupleMin(this.productPriceRange);
          this.rangeMax = this.tupleMax(this.value);
          this.value = [this.rangeMin, this.rangeMax];
          this.displayValue = [...this.value];

          //console.log("If 1", this.value, this.rangeMin, this.rangeMax);

          return this.$nextTick(() => {
            this.$refs.slider.setValue(this.value);
            this.updateDisplayValue();
          });
        }
        if (this.tupleMax(this.productPriceRange) > this.tupleMax(this.value)) {
          this.rangeMin = this.tupleMin(this.value);
          this.rangeMax = this.tupleMax(this.productPriceRange);
          this.value = [this.rangeMin, this.rangeMax];
          this.displayValue = [...this.value];

          //console.log("If 2", this.value, this.rangeMin, this.rangeMax);

          return this.$nextTick(() => {
            this.$refs.slider.setValue(this.value);
            this.updateDisplayValue();
          });
        }
      },
    },
  },
  created() {
    //console.log("created");
    this.initialize();
  },
  mounted() {
    //console.log("mounted");
    window.addEventListener("resize", () => {
      return this.setWidth(window.innerWidth);
    });

    this.$refs.slider.setValue(this.value);
    this.updateDisplayValue();
  },
};
</script>
