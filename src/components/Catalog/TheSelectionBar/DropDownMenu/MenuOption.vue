<template>
  <div>
    <li class="my-4">
      <label class="custom-label flex">
        <div>
          <slot name="option-input"></slot>
        </div>
        <span
          v-if="item.inputType !== 'color'"
          class="font-semibold select-none"
        >
          <slot name="option-label"></slot>
        </span>
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
