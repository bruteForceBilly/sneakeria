<template>
  <div>
    <MenuSettings v-slot:default="{ hover }">
      <MenuButton :hover="hover" :hasSelected="hasSelected">
        <template v-slot:menu-label>{{ item.label }} </template>
      </MenuButton>
      <MenuOptionsContainer :hover="hover">
        <template v-slot:options>
          <MenuOption v-for="option in item.options" :key="option.id">
            <template v-slot:option-checkbox>
              <!-- Figure out how to but the model for the data higher upp so you can print it out-->
              <MenuOptionsCheckbox :checked="option.checked">
                <template v-slot:input>
                  <input
                    type="checkbox"
                    class="hidden"
                    v-model="option.checked"
                  />
                  <!-- redo for orm -->
                </template>
              </MenuOptionsCheckbox>
            </template>
            <template v-slot:option-label>{{ option.label }}</template>
          </MenuOption>
        </template>
      </MenuOptionsContainer>
    </MenuSettings>
  </div>
</template>

<script>
import MenuSettings from "./MenuSettings.vue";
import MenuButton from "./MenuButton.vue";
import MenuOptionsContainer from "./MenuOptionsContainer.vue";
import MenuOption from "./MenuOption.vue";
import MenuOptionsCheckbox from "./MenuOptionsCheckbox.vue";

export default {
  name: "MenuBase",
  props: ["item", "componentSettings"],
  components: {
    MenuSettings,
    MenuButton,
    MenuOptionsContainer,
    MenuOption,
    MenuOptionsCheckbox
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
