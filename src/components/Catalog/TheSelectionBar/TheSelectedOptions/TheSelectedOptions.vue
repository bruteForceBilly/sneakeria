<template>
  <div class="flex justify-start">
    <div v-for="select in selects" :key="select.value">
      <div v-for="option in select.options" :key="option.value">
        <div v-if="option.checked">
          <button
            v-bind:checked="option.checked"
            @click="toggle(option)"
            class="tag focus:outline-none"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <SelectedOption
      v-show="Object.keys(selectedOptionsObject).length > 0"
      link="true"
      @click.native="resetter()"
      >Clear All</SelectedOption
    >
  </div>
</template>

<script>
import SelectedOption from "./SelectedOption.vue";
import { mapActions } from "vuex";

// RENAME COMPONENT TO TAGSBAR AND DECOUPLE IT FROM SELECTION BAR

// toggler clicked( take an correct config object)
// we rewrote the selectionOptionCheckToggle to accept
// a query paramss object form the router.
// but here we are simpky passing an object literal from the the option and that dosent work!

// we can remove the clicked props

/*

   clickedOptionObject(name, value) {
      let o = {};
      o.name = name;
      o.value = value;
      console.log("clickedOptionObject", o);
      debugger;
      return o;
    },



navigation action clearAll



*/

export default {
  props: {
    selects: {
      type: Array,
      required: true,
    },
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    SelectedOption,
  },
  methods: {
    ...mapActions("navigation", ["clearAll"]),

    toggle(option) {
      this.$store.commit("setByRoute", false);
      console.log(
        "toggle option",
        option,
        "setByRoute",
        this.$store.state.setByRoute
      );

      return option.checked === false
        ? (option.checked = true)
        : (option.checked = false);
    },

    el(name, value) {
      let o = {};
      o.name = name;
      o.value = value;
      console.log("clickedOption", o);
      debugger;
      return o;
    },
  },
};
</script>

<style lang="postcss" scoped>
.tag {
  @apply py-1 text-gray-800 font-sans font-normal text-sm lowercase px-4 no-underline bg-gray-300 rounded-full mr-2;
}
</style>
