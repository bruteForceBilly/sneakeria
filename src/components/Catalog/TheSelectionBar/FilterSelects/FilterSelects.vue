<template>
  <div>
    <div>
      <Menu
        v-for="item in selects"
        :key="item.name"
        :item-name="item.name"
        :item-label="item.label"
        :selected-options-object="selectedOptionsObject"
      >
        <template v-slot:menu-items>
          <MenuOption v-for="option in item.options" :key="option.id">
            <template v-slot:option-input>
              <MenuOptionCheckbox :checked="option.checked">
                <template v-slot:input>
                  <input
                    type="checkbox"
                    class="hidden"
                    v-model="option.checked"
                  />
                </template>
              </MenuOptionCheckbox>
            </template>
            <template v-slot:option-label>
              {{ option.label }}
            </template>
          </MenuOption>
        </template>
      </Menu>
    </div>
  </div>
</template>
<script>
import Menu from "../DropDownMenu/Menu.vue";
import MenuOption from "../DropDownMenu/MenuOption.vue";
import MenuOptionCheckbox from "../DropDownMenu/MenuOptionCheckbox.vue";

export default {
  props: {
    selects: {
      type: Array,
    },
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    Menu,
    MenuOption,
    MenuOptionCheckbox,
  },
};
</script>
