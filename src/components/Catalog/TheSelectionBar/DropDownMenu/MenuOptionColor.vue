<template>
  <div
    class="bg-transparent border-solid border-black w-6 h-6 p-1 flex justify-center items-center mr-3"
    :class="option.checked ? `bg-${color}` : `bg-${color}`"
    style="border-width: 1px"
  >
    <slot name="input"> ... input goes here </slot>
    <svg
      class="w-4 h-4 text-black pointer-events-none"
      :class="option.checked ? 'block text-white' : 'hidden'"
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
  name: "MenuOptionColor",
  props: {
    option: Object,
  },
  computed: {
    color() {
      const color = {
        black: "black",
        blue: "blue-500",
        gold: "yellow-600",
        green: "green-500",
        grey: "gray-600",
        orange: "orange-500",
        red: "red-500",
        silver: "gray-400",
        white: "white",
        yellow: "yellow-500",
      };
      return color[this.option.value];
    },
  },
};
</script>

<style scoped></style>
