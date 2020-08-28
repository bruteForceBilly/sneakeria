<template>
  <div>
    <TheCatalogFilterBarSettings
      :selects="selects"
      v-slot:default="{
        baseSettings
      }"
    >
      <div class="static">
        <div class="relative">
          <div
            class="border-t bg-white border-b py-1 w-full flex justify-start"
          >
            <CatalogFilterBarDropDownMenu
              :componentSettings="baseSettings"
              v-for="item in baseSettings.selects"
              :key="item.name"
              :item="item"
            ></CatalogFilterBarDropDownMenu>

            <CatalogFilterBarDropDownMenu
              class="ml-auto"
              :componentSettings="baseSettings"
              :key="baseSettings.sorts.name"
              :item="baseSettings.sorts[0]"
            ></CatalogFilterBarDropDownMenu>
          </div>
        </div>
        <div class="mt-4 flex justify-start">
          <div
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
          >
        </div>
      </div>
    </TheCatalogFilterBarSettings>
  </div>
</template>

<script>
import CatalogFilterBarDropDownMenu from "./CatalogFilterBarDropDownMenu/CatalogFilterBarDropDownMenu.vue";
import CatalogFilterBarSelectedFiltersItem from "./CatalogFilterBarSelectedFilters/CatalogFilterBarSelectedFiltersItem.vue";
import TheCatalogFilterBarSettings from "./TheCatalogFilterBarSettings.vue";

export default {
  name: "TheCatalogFilterBar",
  components: {
    CatalogFilterBarDropDownMenu,
    CatalogFilterBarSelectedFiltersItem,
    TheCatalogFilterBarSettings
  },
  props: {
    selects: {
      type: Array
    }
  }
};
</script>
