<template>
  <div
    class="bg-transparent border-solid border-black w-6 h-6 p-1 flex justify-center items-center"
    :class="getInputBgColor"
    style="border-width: 1px"
  >
    <input type="checkbox" class="hidden" v-model="option.checked" />
    <svg
      class="text-black pointer-events-none block"
      :class="getInputTextColor"
      viewBox="0 0 172 172"
    >
      <g
        fill="none"
        stroke-width="none"
        stroke-miterlimit="10"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
      >
        <path d="M0 172V0h172v172z" />
        <path
          d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
          fill="currentColor"
          stroke-width="1"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "MenuInputCheckbox",
  props: {
    option: Object,
    item: Object,
  },
  data() {
    return {
      colors: {
        black: "bg-black",
        blue: "bg-blue-500",
        gold: "bg-yellow-600",
        green: "bg-green-500",
        grey: "bg-gray-600",
        orange: "bg-orange-500",
        red: "bg-red-500",
        silver: "bg-gray-400",
        white: "bg-white",
        yellow: "bg-yellow-500",
      },
    };
  },
  computed: {
    hasColor() {
      return Object.keys(this.colors).includes(this.option.value)
        ? true
        : false;
    },
    color() {
      return this.colors[this.option.value];
    },
    getInputBgColor() {
      let res;
      if (!this.hasColor && !this.option.checked) {
        res = this.colors.white;
      } else if (!this.hasColor && this.option.checked) {
        res = this.colors.black;
      } else {
        res = this.color;
      }
      return res;
    },
    getInputTextColor() {
      // if bg color is white, then text color should be black when option is checked
      let res;

      if (this.option.value === "white" && this.option.checked) {
        res = "text-black";
      } else {
        res = this.option.checked ? "text-white" : "hidden";
      }

      return res;
    },
  },
};
</script>

<style scoped></style>
