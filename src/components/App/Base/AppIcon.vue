<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    role="presentation"
    :stroke="color"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-heart"
  >
    <title :id="name">{{ name }}</title>
    <g :fill="filling">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: "AppIcon",
  props: {
    name: {
      type: String,
      default: "box",
    },
    width: {
      type: [Number, String],
      default: 36,
    },
    height: {
      type: [Number, String],
      default: 36,
    },
    color: {
      type: String,
      default: "currentColor",
    },
    isFilled: {
      type: Boolean,
      required: false,
    },
    status: {
      type: [Number, String],
      required: false,
      default: null,
    },
  },
  computed: {
    filling() {
      return this.isFilled ? "currentColor" : "none";
    },
  },
};
</script>

<style lang="postcss" scoped></style>
