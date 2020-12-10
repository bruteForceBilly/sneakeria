<template>
  <div>
    <Settings
      :selects="selects"
      v-slot:default="{
        settings,
      }"
    >
      <div class="static hello">
        <div class="relative">
          <div
            class="border-t bg-white border-b py-1 w-full flex justify-start"
          >
            <FilterSelects
              :selected-options-object="settings.selectedOptionsObject"
              :selects="settings.selects"
            ></FilterSelects>

            <SortSelects class="ml-auto" :sorts="settings.sorts"></SortSelects>
          </div>
        </div>
        <div class="mt-4 flex justify-start">
          <TheSelectedOptions
            :toggler="settings.selectOptionsCheckToggle"
            :clicked="settings.clickedOptionObject"
            :selected="settings.selectedOptionsElements"
            :resetter="settings.clearAll"
          ></TheSelectedOptions>
        </div>
      </div>
    </Settings>
  </div>
</template>

<script>
import FilterSelects from "./FilterSelects/FilterSelects.vue";
import SortSelects from "./SortSelects/SortSelects.vue";
import TheSelectedOptions from "./TheSelectedOptions/TheSelectedOptions.vue";
import Settings from "./TheSelectionBarSettings.vue";

export default {
  name: "TheCatalogSelectionBar",
  components: {
    FilterSelects,
    SortSelects,
    TheSelectedOptions,
    Settings,
  },
  props: {
    selects: {
      type: Array,
    },
  },
};
</script>

<style>
.hello {
  @apply fixed;
}
</style>
