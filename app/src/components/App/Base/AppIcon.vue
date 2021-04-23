<template>
  <div class="relative cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      role="presentation"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-heart"
    >
      <title :id="name">{{ name }}</title>
      <g :fill="filling">
        <slot />
      </g>
    </svg>
    <span
      class="absolute z-10 bottom-2 left-5 bg-blue-500 text-white font-black rounded-full text-xxs w-5 h-5 p-1 text-center"
      v-if="status"
      >{{ status }}</span
    >
  </div>
</template>

<script>
export default {
  name: "AppIcon",
  props: {
    name: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
    strokeWidth: {
      type: Number,
      default: 2,
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
      type: [Number, String, Boolean],
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
