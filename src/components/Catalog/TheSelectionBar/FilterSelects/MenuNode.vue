<template>
  <div>
    <div class="inline">
      <Menu
        v-if="
          select.level === 'group' ||
          (select.level === 'attribute' &&
            select.label !== 'Style' &&
            selectHas) ||
          (select.label === 'Style' && hasCheckedSiblings)
        "
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
            <template v-slot:option-input>
              <component
                :is="currentComponent(select.inputType)"
                :item="select"
                :option="option"
                v-bind="{ option }"
                @click.native.self="setByRouteHandler()"
              >
              </component>
            </template>

            <template v-slot:option-label>
              <span
                v-if="hasDisplayedLabel(option)"
                @click.self="setByRouteHandler()"
                >{{ option.label }}
              </span>
            </template>
          </MenuOption>
        </template>
      </Menu>
    </div>
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
import MenuInputCheckbox from "../DropDownMenu/MenuInputCheckbox.vue";
import MenuInputHidden from "../DropDownMenu/MenuInputHidden.vue";

export default {
  name: "MenuNode",
  components: {
    Menu,
    MenuOption,
    MenuInputCheckbox,
    MenuInputHidden,
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
  computed: {
    hasCheckedSiblings: () => {
      const flatMap = (n) => {
        let result = [];
        const recur = (n) => {
          if (Array.isArray(n)) {
            n.forEach((o) => recur(o));
          } else if ("attributes" in n) {
            if (n.checked) {
              result.push(n);
            }
            recur(n.attributes);
          } else if ("options" in n) {
            recur(n.options);
          } else {
            if (n.checked) {
              result.push(n);
            }
          }
        };
        recur(n);
        return result;
      };

      return flatMap([
        ...this.$store.getters["navigation/selectedOptionsElements"],
      ])
        .map((el) => el.attributeId)
        .filter((attrId) => attrId != this.select.id).length > 0
        ? true
        : false;
    },
    selectHas() {
      let selectedElHas = (elementKey, selectValue) => {
        // Look if all el key of type X has Y
        return [...this.$store.getters["navigation/selectedOptionsElements"]]
          .map((el) => el[elementKey])
          .includes(selectValue);
      };

      // Attribute Belongs to Checked Option
      let hasOptionId = selectedElHas("id", this.select.optionId);

      // Select belongs to Group
      let hasGroupId = selectedElHas("groupId", this.select.groupId);

      let hasName = selectedElHas("value", this.select.name);

      return hasOptionId && hasGroupId && hasName ? true : false;
    },
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
  },
  created() {
    //console.log("select", this.select, "node", this.node);
  },
};
</script>
