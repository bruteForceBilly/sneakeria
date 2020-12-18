<template>
  <div class="flex flex-col items-center w-full">
    <span class="mb-1 font-normal"> {{ displayValueHeading }} </span>
    <vue-slider
      class="ml-2 mt-2"
      width="208px"
      height="2px"
      :min="priceLowest"
      :max="priceHighest"
      dot-size="20"
      v-model="value"
      tooltip="none"
      ref="slider"
      :lazy="true"
      :enable-cross="true"
      @dragging="setValue()"
    >
    </vue-slider>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "@/assets/css/vue-slider/index.css";

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
      value: [34, 80],
      displayValue: [34, 80],
      priceLowest: 34,
      priceHighest: 80,
    };
  },
  methods: {
    setValue() {
      return (this.displayValue = this.$refs.slider.getValue());
    },
  },
  computed: {
    displayValueHeading() {
      return `€ ${this.displayValue[0]} - € ${
        this.displayValue[this.displayValue.length - 1]
      }`;
    },
  },
  created() {
    console.log("option", this.option);
  },
  mounted() {
    return (this.displayValue = this.$refs.slider.getValue());
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
