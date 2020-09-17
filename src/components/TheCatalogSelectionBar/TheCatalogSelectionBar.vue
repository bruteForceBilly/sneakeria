<template>
  <div>
    <Settings
      v-slot:default="{
        baseSettings
      }"
    >
      <div class="static">
        <div class="relative">
          <div class="border-t bg-white border-b py-1 w-full">
            <FilterSelects
              :selected-options-object="baseSettings.selectedOptionsObject"
              :selects="baseSettings.selects"
            ></FilterSelects>
            <!--
            <CatalogFilterBarDropDownMenu
              class="ml-auto"
              :componentSettings="baseSettings"
              :key="baseSettings.sorts.name"
              :item="baseSettings.sorts[0]"
              type="sort"
            ></CatalogFilterBarDropDownMenu> -->
          </div>
        </div>
        <div class="mt-4 flex justify-start">
          <TheSelectedOptions
            :toggler="baseSettings.selectOptionsCheckToggle"
            :clicked="baseSettings.clickedOptionObject"
            :selected="baseSettings.selectedOptionsElements"
            :resetter="baseSettings.clearAll"
          ></TheSelectedOptions>

          <!-- <div
            v-for="option in baseSettings.selectedOptionsElements"
            :key="option.value"
            class=""
          >
            <CatalogFilterBarSelectedFiltersItem
              @click.native="
                baseSettings.selectOptionsCheckToggle(
                  baseSettings.clickedOptionObject(option.name, option.value)
                )
              "
            >
              {{ option.label }}
            </CatalogFilterBarSelectedFiltersItem>
          </div>
          <CatalogFilterBarSelectedFiltersItem
            v-show="baseSettings.selectedOptionsElements.length > 0"
            link="true"
            @click.native="baseSettings.clearAll()"
            >Clear All</CatalogFilterBarSelectedFiltersItem
          > -->
        </div>
      </div>
    </Settings>
  </div>
</template>

<script>
import FilterSelects from "./FilterSelects/FilterSelects.vue";
import TheSelectedOptions from "./TheSelectedOptions/TheSelectedOptions.vue";
import Settings from "./TheCatalogSelectionBarSettings.vue";

export default {
  name: "TheCatalogSelectionBar",
  components: {
    FilterSelects,
    TheSelectedOptions,
    Settings
  }
};
</script>
