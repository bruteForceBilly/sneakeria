<template>
  <div class="flex flex-col items-center w-full">
    <span class="mb-1 font-normal"> {{ displayValueHeading }} </span>
    <vue-slider
      class="ml-2 mt-2"
      width="208px"
      height="2px"
      :min="priceMinInit"
      :max="priceMaxInit"
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
      value: [0, 100],
      priceMinInit: 0,
      priceMaxInit: 100,
      displayValue: [0, 100],
    };
  },
  methods: {
    updateDisplayValue() {
      return (this.displayValue = this.$refs.slider.getValue());
    },
    updateRouter() {
      let searchQuery =
        this.searchQueryString +
        `price_min=${this.priceMin}&&price_max=${this.priceMax}`;
      this.$router.push("search?" + searchQuery);
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

    priceMin() {
      return [...this.value].shift();
    },
    priceMax() {
      return [...this.value].pop();
    },
    priceMinMax() {
      let res = [];
      res.push(this.priceMinInit, this.priceMaxInit);
      return res;
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
        console.log("watcher");
        if (this.foundProductsPricesOffered.length > 0) {
          this.priceMaxInit = Math.max(...this.foundProductsPricesOffered);
          this.priceMinInit = Math.min(...this.foundProductsPricesOffered);

          if (this.priceMinInit > this.priceMin) {
            let copyValue = [...this.value];
            let res = [];
            res.push(this.priceMinInit, copyValue[copyValue.length - 1]);
            console.log("priceMinInit more than price min", this.value, res);
            this.$refs.slider.setValue(res);
            this.updateDisplayValue();
          }

          if (this.priceMaxInit < this.priceMax) {
            let copyValue = [...this.value];
            let res = [];
            res.push(copyValue[0], this.priceMaxInit);
            console.log("priceMaxInit less than price max", this.value, res);
            this.$refs.slider.setValue(res);
            this.updateDisplayValue();
          }
        }
      },
    },
  },
  created() {
    this.priceMaxInit = Math.max(...this.foundProductsPricesOffered);
    this.priceMinInit = Math.min(...this.foundProductsPricesOffered);
    this.value = [...this.priceMinMax];
    this.displayValue = [...this.value];
  },
  mounted() {
    this.$refs.slider.setValue(this.value);
    return this.updateDisplayValue();
  },
};
</script>

<style scoped></style>

<!-- <template>
  <div>
    <input type="range" min="33" max="80" v-model="option.value" />
    {{ option.value }}
  </div>
</template> 

<script>

export default {
  name: "MenuInputRange",
  props: {
    option: Object,
    item: Object,
  },
};
</script>
-->
