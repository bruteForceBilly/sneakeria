<template>
  <div class="flex justify-start">
    <div v-for="option in selected" :key="option.value">
      <SelectedOption
        @click.native="toggler(clicked(option.name, option.value))"
      >
        {{ option.label }}
      </SelectedOption>
    </div>
    <SelectedOption
      v-show="selected.length > 0"
      link="true"
      @click.native="resetter()"
      >Clear All</SelectedOption
    >
  </div>
</template>

<script>
import SelectedOption from "./SelectedOption.vue";

export default {
  props: {
    toggler: {
      type: Function,
      required: true,
    },
    clicked: {
      type: Function,
      required: true,
    },
    selected: {
      type: Array,
      required: true,
    },
    resetter: {
      type: Function,
      required: true,
    },
  },
  components: {
    SelectedOption,
  },
};
</script>
