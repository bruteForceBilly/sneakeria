<template>
  <div>
    <li class="my-4">
      <label class="custom-label flex">
        <FilterDropDownMenuOptionsCheckbox />
        <span class="font-semibold select-none">
          <slot>Not set</slot>
        </span>
      </label>
    </li>
  </div>
</template>

<script>
import FilterDropDownMenuOptionsCheckbox from "./FilterDropDownMenuOptionsCheckbox.vue";
export default {
  name: "FilterDropDownMenuOption",
  props: ["hover"],
  components: {
    FilterDropDownMenuOptionsCheckbox
  }
};
</script>
