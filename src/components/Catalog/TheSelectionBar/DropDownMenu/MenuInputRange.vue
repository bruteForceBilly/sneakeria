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
      displayValue: [0, 100],
    };
  },
  methods: {
    updateDisplayValue() {
      return (this.displayValue = this.$refs.slider.getValue());
    },
    updateRouter() {
      let { slug } = this.params;
      this.$router.push({
        name: "searchRequestRoute",
        params: { id: slug },
        query: { price_max: this.priceMax, price_min: this.priceMin },
      });
    },
  },
  computed: {
    ...mapState("search", ["queryParamsString"]),
    ...mapGetters("search", ["foundProductsPricesOffered"]),
    ...mapState("route", ["path", "params", "query"]),

    priceMin() {
      return [...this.value].shift();
    },
    priceMax() {
      return [...this.value].pop();
    },
    priceMaxInit() {
      return Math.max(...this.foundProductsPricesOffered);
    },
    priceMinInit() {
      return Math.min(...this.foundProductsPricesOffered);
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
  created() {
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
