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
            <span class="font-hairline text-gray-600 ml-1 inline">x</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-show="Object.keys(selectedOptionsObject).length > 0"
      @click="clearAllTags()"
    >
      <span
        class="px-0 mx-2 underline bg-transparent py-1 text-gray-800 font-sans font-normal text-sm lowercase"
      >
        Clear all
      </span>
      <span class="font-hairline text-gray-600 ml-1 inline">x</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// RENAME COMPONENT TO TAGSBAR AND DECOUPLE IT FROM SELECTION BAR

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
  computed: {
    ...mapGetters("navigation", ["selectedOptionsElements"]),
  },
  methods: {
    toggle(option) {
      this.$store.commit("setByRoute", false);
      return option.checked === false
        ? (option.checked = true)
        : (option.checked = false);
    },
    clearAllTags() {
      console.log("reset was hit");
      let copySelectedOptionsElements = [...this.selectedOptionsElements];
      return copySelectedOptionsElements.forEach((option) =>
        this.toggle(option)
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
.tag {
  @apply py-1 text-gray-800 font-sans font-normal text-sm lowercase px-4 no-underline bg-gray-300 rounded-full mr-2;
}

.clear-all {
  @apply px-0 mx-2 underline bg-transparent py-1 text-gray-800 font-sans font-normal text-sm lowercase;
}
</style>
