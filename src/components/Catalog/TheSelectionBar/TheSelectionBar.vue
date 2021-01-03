<template>
  <div>
    <Settings
      :selects="selects"
      v-slot:default="{
        settings,
      }"
    >
      <!-- We need to get the calc height from hang element -->
      <div :style="{ height: `${hangHeight}px` }" class="mb-3">
        <div
          v-hang="'hang'"
          :class="hang ? 'hang-enter fixed top-0 left-0 z-50 w-full' : 'static'"
        >
          <div class="relative">
            <div
              class="py-1 bg-white w-full flex justify-start transition delay-500 duration-500 ease-in-out"
              :class="hang ? 'border border-gray-900' : 'border-t border-b'"
            >
              <FilterSelects
                :selected-options-object="settings.selectedOptionsObject"
                :selects="settings.selects"
              ></FilterSelects>

              <RangeSelects :selects="settings.rangeSliders"></RangeSelects>

              <SortSelects class="ml-auto" :sorts="settings.sorts">
              </SortSelects>
            </div>
          </div>
          <div v-if="!hang" class="mt-4 flex justify-start">
            <TheSelectedOptions
              :selected-options-object="settings.selectedOptionsObject"
              :selects="settings.selects"
            ></TheSelectedOptions>
          </div>
        </div>
      </div>
    </Settings>
  </div>
</template>

<script>
import FilterSelects from "./FilterSelects/FilterSelects.vue";
import SortSelects from "./SortSelects/SortSelects.vue";
import RangeSelects from "./RangeSelects/RangeSelects.vue";
import TheSelectedOptions from "./TheSelectedOptions/TheSelectedOptions.vue";
import Settings from "./TheSelectionBarSettings.vue";
import hang from "@/directives/hang.js";

export default {
  name: "TheCatalogSelectionBar",
  components: {
    FilterSelects,
    SortSelects,
    RangeSelects,
    TheSelectedOptions,
    Settings,
  },
  props: {
    selects: {
      type: Array,
    },
  },
  data() {
    return {
      hang: false,
      hangHeight: null,
    };
  },
  directives: {
    hang: hang,
  },
};
</script>

<style lang="postcss">
.hang-enter {
  animation-name: hang;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

@keyframes hang {
  0% {
    padding: 2rem 2rem;
    opacity: 0;
    transform: translateY(-100%);
  }
  50% {
    padding: 2rem 2rem;
    transform: translateY(0);
  }
  100% {
    padding: 2rem 1rem;
    opacity: 1;
  }
}
</style>
