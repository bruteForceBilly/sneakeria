<template>
  <div>
    <Menu
      v-if="select.level === 'attribute'"
      :key="select.id"
      :item="select"
      :selected-options-object="selectedOptionsObject"
    >
      <template v-slot:menu-items>
        <MenuOption
          :item="select"
          v-for="option in select.options"
          :key="option.id"
        >
          <template v-slot:option-label>
            <span @click.self="setByRouteHandler()">{{ option.label }} </span>
          </template>
          <!-- Menu Attributes -->
        </MenuOption>
      </template>
    </Menu>

    <MenuNode
      class="inline"
      v-for="select in node"
      :key="select.id + select.name"
      :select="select"
      :node="next(select)"
    >
    </MenuNode>
  </div>
</template>

<script>
import Menu from "../DropDownMenu/Menu.vue";
import MenuOption from "../DropDownMenu/MenuOption.vue";
//import MenuInputCheckbox from "../DropDownMenu/MenuInputCheckbox.vue";
//import MenuInputHidden from "../DropDownMenu/MenuInputHidden.vue";

export default {
  name: "MenuNode",
  components: {
    Menu,
    MenuOption,
    //MenuInputCheckbox,
    //MenuInputHidden,
  },
  props: {
    node: {
      type: Array,
      default: function () {
        return [];
      },
    },
    select: {
      type: Object,
      default: function () {
        return {};
      },
    },
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      optionBindChecked: ["checkbox", "checkboxHidden"],
    };
  },
  methods: {
    next(select) {
      let next = null;
      if (select?.attributes) {
        //console.log("select.attributes", select.attributes);
        next = select.attributes;
      }
      if (select?.options) {
        //console.log("select.options", select.options);
        next = select.options;
      }
      return next;
    },
  },
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
  setByRouteHandler() {
    this.$store.commit("setByRoute", false);
    //console.log("set by route", this.$store.state.setByRoute);
  },
};
</script>
