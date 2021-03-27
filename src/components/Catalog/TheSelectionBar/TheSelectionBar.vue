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

        <!-- We need to make a mobile component, that has modal as child so we can set which menu should be open -->

        <Modal :settings="settings">
          <template v-slot:sorts>
            <SortSelects :isMobile="true" :sorts="settings.selectionbarSorts" />
          </template>
          <template v-slot:filters>
            <FilterSelects
              class="mt-4"
              :isMobile="true"
              :selected-options-object="settings.selectedOptionsObject"
              :selects="settings.selectionbarFilters"
            ></FilterSelects>

            <RangeSelects
              :isMobile="true"
              :range-sliders="settings.selectionbarRanges"
            ></RangeSelects>
          </template>
        </Modal>
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
import Modal from "./TheSelectionBarLayout.vue";

export default {
  name: "TheCatalogSelectionBar",
  components: {
    FilterSelects,
    SortSelects,
    RangeSelects,
    TheSelectedOptions,
    Settings,
    Layout,
    Modal,
  },
  props: {
    selects: {
      type: Array,
    },
  },
};
</script>
