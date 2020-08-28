<template>
  <div>
    <CatalogFilterBarDropDownMenuSettings v-slot:default="{ hover }">
      <CatalogFilterBarDropDownMenuButton
        :hover="hover"
        :hasSelected="hasSelected"
      >
        <template v-slot:menu-label>{{ item.label }} </template>
      </CatalogFilterBarDropDownMenuButton>
      <CatalogFilterBarDropDownMenuContainer :hover="hover">
        <template v-slot:options>
          <CatalogFilterBarDropDownMenuItem
            v-for="option in item.options"
            :key="option.id"
          >
            <template v-slot:option-checkbox>
              <!-- Figure out how to but the model for the data higher upp so you can print it out-->
              <CatalogFilterBarDropDownMenuItemCheckbox
                :checked="option.checked"
              >
                <template v-slot:input>
                  <input
                    type="checkbox"
                    class="hidden"
                    v-model="option.checked"
                  />
                  <!-- redo for orm -->
                </template>
              </CatalogFilterBarDropDownMenuItemCheckbox>
            </template>
            <template v-slot:option-label>{{ option.label }}</template>
          </CatalogFilterBarDropDownMenuItem>
        </template>
      </CatalogFilterBarDropDownMenuContainer>
    </CatalogFilterBarDropDownMenuSettings>
  </div>
</template>

<script>
import CatalogFilterBarDropDownMenuSettings from "./CatalogFilterBarDropDownMenuSettings.vue";
import CatalogFilterBarDropDownMenuButton from "./CatalogFilterBarDropDownMenuButton.vue";
import CatalogFilterBarDropDownMenuContainer from "./CatalogFilterBarDropDownMenuContainer.vue";
import CatalogFilterBarDropDownMenuItem from "./CatalogFilterBarDropDownMenuItem.vue";
import CatalogFilterBarDropDownMenuItemCheckbox from "./CatalogFilterBarDropDownMenuItemCheckbox.vue";

export default {
  name: "CatalogFilterBarDropDownMenu",
  props: ["item", "componentSettings"],
  components: {
    CatalogFilterBarDropDownMenuSettings,
    CatalogFilterBarDropDownMenuButton,
    CatalogFilterBarDropDownMenuContainer,
    CatalogFilterBarDropDownMenuItem,
    CatalogFilterBarDropDownMenuItemCheckbox
  },
  computed: {
    hasSelected() {
      return Object.keys(this.componentSettings.selectedOptionsObject).includes(
        this.item.name
      );
    }
  }
};
</script>
