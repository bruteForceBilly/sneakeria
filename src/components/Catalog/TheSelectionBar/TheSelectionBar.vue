<template>
  <div>
    <Settings
      :selects="selects"
      v-slot:default="{
        settings,
        navigationIsloading,
      }"
    >
      <Layout
        v-if="true"
        :settings="settings"
        :navigation-is-loading="navigationIsloading"
      >
        <template v-slot:desktop>
          <FilterSelects
            :isMobile="false"
            :selected-options-object="settings.selectedOptionsObject"
            :selects="settings.selectionbarFilters"
          ></FilterSelects>

          <RangeSelects
            :isMobile="false"
            :range-sliders="settings.selectionbarRanges"
          ></RangeSelects>

          <SortSelects class="ml-auto" :sorts="settings.selectionbarSorts">
          </SortSelects>
        </template>

        <template v-slot:mobile>
          <SelectionBarMobile :settings="settings" />
        </template>

        <template v-slot:selected-options>
          <TheSelectedOptions
            :update-route-query-params="settings.updateRouteQueryParams"
            :selected-options-object="settings.selectedOptionsObject"
            :selects="settings.selects"
          ></TheSelectedOptions>
        </template>
      </Layout>
    </Settings>
  </div>
</template>

<script>
import FilterSelects from "./FilterSelects/FilterSelects.vue";
import SortSelects from "./SortSelects/SortSelects.vue";
import RangeSelects from "./RangeSelects/RangeSelects.vue";
import TheSelectedOptions from "./TheSelectedOptions/TheSelectedOptions.vue";
import Settings from "./TheSelectionBarSettings.vue";
import Layout from "./TheSelectionBarLayout.vue";
import SelectionBarMobile from "./Mobile/TheSelectionBarMobile.vue";

export default {
  name: "TheCatalogSelectionBar",
  components: {
    FilterSelects,
    SortSelects,
    RangeSelects,
    TheSelectedOptions,
    Settings,
    Layout,
    SelectionBarMobile,
  },
  props: {
    selects: {
      type: Array,
    },
  },
};
</script>
