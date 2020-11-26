<template>
  <div>
    <div>
      <Menu
        v-for="item in selects"
        :key="item.name"
        :item="item"
        :selected-options-object="selectedOptionsObject"
      >
        <template v-slot:menu-items>
          <MenuOption v-for="option in item.options" :key="option.id">
            <template v-slot:option-input>
              <component
                :is="currentComponent(item.inputType)"
                v-bind="{ option }"
              >
                <template v-slot:input>
                  <input
                    type="checkbox"
                    class="hidden"
                    v-model="option.checked"
                  />
                </template>
              </component>
            </template>
            <template v-if="item.inputType !== 'color'" v-slot:option-label>
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
import MenuOptionColor from "../DropDownMenu/MenuOptionColor.vue";

export default {
  components: {
    Menu,
    MenuOption,
    MenuOptionCheckbox,
    MenuOptionColor,
  },
  methods: {
    currentComponent(inputType) {
      const optionInputComponents = {
        checkbox: "MenuOptionCheckbox",
        color: "MenuOptionColor",
      };

      return optionInputComponents[inputType];
    },
  },
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
};
</script>
