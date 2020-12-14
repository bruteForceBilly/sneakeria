<template>
  <!--

Purpose of MenuOption is to do layout of label and input component
for example color only has a color square and no text label.

Checkboxes has a checlbox and a label next to it

Hidden, has no checkbox, but instead a hidden input and only the label. 

Menu option layouts Option Label and MenuInputXXXX

-->
  <div>
    <li class="my-4">
      <label class="custom-label flex">
        <slot name="option-input"></slot>
        <div
          v-if="item.inputType !== 'color'"
          class="font-semibold select-none"
        >
          <slot name="option-label"></slot>
        </div>
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
