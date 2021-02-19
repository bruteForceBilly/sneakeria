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
          :style="isMobileScreen ? 'top:55px' : 'top: 1rem'"
          :class="hang ? 'hang-enter fixed left-0 z-40 w-full' : 'static'"
        >
          <div
            v-if="isMobileScreen"
            class="relative w-full mobile-menu-grid transition delay-500 duration-500 ease-in-out"
            :class="
              hang
                ? 'border border-gray-900 bg-gray-900'
                : 'bg-gray-300 border-t border-b'
            "
          >
            <div v-for="menu in mobileMenus" :key="menu.name">
              <div>
                <MenuButton :block="true">
                  <template v-slot:menu-label> {{ menu.label }} </template>
                </MenuButton>
              </div>
            </div>
            <!-- <div
              class="uppercase bg-white w-full flex justify-start transition delay-500 duration-500 ease-in-out"
              :class="hang ? 'border border-gray-900' : 'border-t border-b'"
            >
              <div
                class="px-2 py-1 border-r w-1/2 transition delay-500 duration-500 ease-in-out"
                :class="hang ? 'border-gray-900' : 'border-gray-300'"
              >
                Filter
              </div>
              <div class="px-2 py-1 w-1/2">Sort after</div>
            </div> -->
          </div>
          <div v-else class="relative">
            <div
              class="py-2 px-2 bg-white w-full flex justify-start transition delay-500 duration-500 ease-in-out"
              :class="hang ? 'border border-gray-900' : 'border-t border-b'"
            >
              <FilterSelects
                :selected-options-object="settings.selectedOptionsObject"
                :selects="settings.selects"
              ></FilterSelects>

              <RangeSelects
                :range-sliders="settings.rangeSliders"
              ></RangeSelects>

              <SortSelects class="ml-auto" :sorts="settings.sorts">
              </SortSelects>
            </div>
          </div>

          <div v-if="!hang" class="mt-4">
            <TheSelectedOptions
              :update-route-query-params="settings.updateRouteQueryParams"
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
import MenuButton from "@/components/Catalog/TheSelectionBar/DropDownMenu/MenuButton.vue";
import FilterSelects from "./FilterSelects/FilterSelects.vue";
import SortSelects from "./SortSelects/SortSelects.vue";
import RangeSelects from "./RangeSelects/RangeSelects.vue";
import TheSelectedOptions from "./TheSelectedOptions/TheSelectedOptions.vue";
import Settings from "./TheSelectionBarSettings.vue";
import hang from "@/directives/hang.js";

export default {
  name: "TheCatalogSelectionBar",
  components: {
    MenuButton,
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
  computed: {
    mobileMenus() {
      return this.$store.state.navigation.mobile;
    },
    isMobileScreen() {
      return this.$mq !== "xl" ? true : false;
    },
  },
  directives: {
    hang: hang,
  },
};
</script>

<style lang="postcss" scoped>
.hang-enter {
  animation-name: hang;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.mobile-menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
}

@keyframes hang {
  0% {
    padding: 0 2rem;
    opacity: 0;
    transform: translateY(-100%);
  }
  50% {
    padding: 0 2rem;
    transform: translateY(0);
  }
  100% {
    padding: 0 1rem;
    opacity: 1;
  }
}
</style>
