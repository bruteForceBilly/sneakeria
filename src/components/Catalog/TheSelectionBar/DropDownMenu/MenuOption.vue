<template>
  <div>
    <li class="my-4">
      <label class="custom-label flex font-normal text-sm">
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
    item: {
      type: Object,
    },
  },
};
</script>
