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
                v-if="type === 'checkbox'"
                :checked="option.checked"
              >
                <template v-slot:input>
                  <input
                    v-if="type === 'checkbox'"
                    class="hidden"
                    v-model="option.checked"
                  />
                </template>
              </CatalogFilterBarDropDownMenuItemCheckbox>
            </template>

            <template v-slot:option-label>
              <div
                v-if="type === 'sort'"
                @click="componentSettings.sortSettingsHandler(option.value)"
              >
                {{ option.label }}
              </div>
              <div v-else>{{ option.label }}</div>
            </template>
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
  props: ["item", "type", "componentSettings"],
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
