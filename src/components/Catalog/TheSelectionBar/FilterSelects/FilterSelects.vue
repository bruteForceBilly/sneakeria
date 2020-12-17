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
          <MenuOption
            :item="item"
            v-for="option in item.options"
            :key="option.id"
          >
            <template v-slot:option-input>
              <component
                :is="currentComponent(item.inputType)"
                :item="item"
                :option="option"
                v-bind="{ option }"
              >
              </component>
            </template>

            <template v-slot:option-label>
              <span v-if="hasDisplayedLabel(item)">{{ option.label }}</span>
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
import MenuInputCheckbox from "../DropDownMenu/MenuInputCheckbox.vue";
import MenuInputHidden from "../DropDownMenu/MenuInputHidden.vue";
import MenuInputRange from "../DropDownMenu/MenuInputRange.vue";

// make computed prop that takes inputType and maps it to input type attr

// make computed prop that takes inputType and maps it to input value for v-model

// customise how v-model so works so its bound to input instead of change? Or use change and trigger change on mouse leave?

// checkbox, checkboxColor, checkboxHidden, range

export default {
  components: {
    Menu,
    MenuOption,
    MenuInputCheckbox,
    MenuInputHidden,
    MenuInputRange,
  },
  data() {
    return {
      optionBindChecked: ["checkbox", "checkboxHidden"],
    };
  },
  methods: {
    currentComponent(inputType) {
      const optionInputComponents = {
        checkbox: "MenuInputCheckbox",
        checkboxHidden: "MenuInputHidden",
        range: "MenuInputRange",
      };
      return optionInputComponents[inputType];
    },
    currentComponentInputType(inputType) {
      const optionInputComponents = {
        checkbox: "checkbox",
        checkboxHidden: "hidden",
        range: "range",
      };
      return optionInputComponents[inputType];
    },
    hasDisplayedLabel(item) {
      return item.name === "color" ? false : true;
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
