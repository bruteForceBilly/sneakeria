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
                v-bind="{ option }"
              >
                <template
                  v-if="hasOptionBindChecked(item.inputType)"
                  v-slot:input
                >
                  <input
                    v-if="hasOptionBindChecked(item.inputType)"
                    type="checkbox"
                    class="hidden"
                    v-model="option.checked"
                  />
                </template>
                <template v-else v-slot:input>
                  <input type="range" v-model="option.value" />
                </template>
              </component>
            </template>

            <template v-slot:option-label>
              <span v-if="hasDisplayedLabel(item.inputType)">{{
                option.label
              }}</span>
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
import MenuOptionHidden from "../DropDownMenu/MenuOptionHidden.vue";
import MenuOptionPriceSlider from "../DropDownMenu/MenuOptionPriceSlider.vue";

// make computed prop that takes inputType and maps it to input type attr

// make computed prop that takes inputType and maps it to input value for v-model

// customise how v-model so works so its bound to input instead of change? Or use change and trigger change on mouse leave?

// checkbox, checkboxColor, checkboxHidden, range

export default {
  components: {
    Menu,
    MenuOption,
    MenuOptionCheckbox,
    MenuOptionColor,
    MenuOptionHidden,
    MenuOptionPriceSlider,
  },
  data() {
    return {
      displayLabel: ["checkbox", "hidden"],
      optionBindChecked: ["checkbox", "checkboxColor", "checkboxHidden"],
    };
  },

  methods: {
    currentComponent(inputType) {
      const optionInputComponents = {
        checkbox: "MenuOptionCheckbox",
        checkboxColor: "MenuOptionColor",
        checkboxHidden: "MenuOptionHidden",
        range: "MenuOptionPriceSlider",
      };
      return optionInputComponents[inputType];
    },
    currentComponentInputType(inputType) {
      const optionInputComponents = {
        checkbox: "checkbox",
        checkboxColor: "checkbox",
        checkboxHidden: "hidden",
        range: "range",
      };
      return optionInputComponents[inputType];
    },
    hasDisplayedLabel(inputType) {
      return this.displayLabel.includes(inputType) ? true : false;
    },
    hasOptionBindChecked(inputType) {
      return this.optionBindChecked.includes(inputType) ? true : false;
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
