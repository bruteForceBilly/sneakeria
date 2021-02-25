<template>
  <div>
    <li>
      <label class="custom-label flex font-normal text-base sm:text-sm">
        <slot name="option-input"></slot>
        <slot name="option-label"></slot>
      </label>
    </li>
  </div>
</template>

<script>
export default {
  name: "MenuOption",
  props: {
    item: Object,
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
