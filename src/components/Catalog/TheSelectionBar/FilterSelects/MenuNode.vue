<template>
  <!-- :class="isMobile ? 'block' : 'inline-block'" -->
  <div>
    <Menu
      :class="{ 'border-gray-300 border-t': isMobile }"
      :isMobile="isMobile"
      :hasSelected="hasCheckedOption"
      v-if="visibilityHandler"
      :key="select.id"
      :item="select"
    >
      <template v-slot:menu-items>
        <MenuOption
          :class="[
            { 'py-3 pl-6': isMobile },
            select.name === 'color' && !isMobile
              ? 'p-3 last:flex-grow'
              : 'py-3 pl-3 hover:bg-gray-200',
          ]"
          :item="select"
          v-for="option in selectOptions"
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
              class="ml-3"
              v-if="hasDisplayedLabel(option)"
              @click.self="setByRouteHandler()"
              >{{ option.label }}
            </span>
          </template>
        </MenuOption>
      </template>
    </Menu>
    <MenuNode
      :isMobile="isMobile"
      :class="isMobile ? '' : 'inline'"
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
import { mapGetters } from "vuex";

export default {
  name: "MenuNode",
  components: {
    Menu,
    MenuOption,
    MenuInputCheckbox,
    MenuInputHidden,
  },
  props: {
    isMobile: Boolean,
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
  },
  data() {
    return {
      optionBindChecked: ["checkbox", "checkboxHidden"],
    };
  },
  computed: {
    ...mapGetters("navigation", ["selectedOptionsElements"]),
    ...mapGetters("search", ["foundProducts"]),

    visibilityHandler() {
      let res = null;
      if (
        (this.select.level === "group" && this.select.name != "color") ||
        (this.select.level === "attribute" &&
          this.select.label !== "Style" &&
          this.isSelected)
      ) {
        res = true;
      } else if (this.select.label === "Style" && this.hasCheckedSiblings) {
        res = true;
      } else if (
        this.select.name == "color" &&
        this.foundProducts &&
        this.selectOptions
      ) {
        res = true;
      } else {
        res = false;
      }

      return res;
    },

    hasCheckedOption() {
      return this.select.options.map((option) => option.checked).includes(true);
    },

    selectOptions() {
      if (this.select.label === "Style") {
        return this.select.options.filter((option) =>
          this.checkedSiblings
            .map((sib) => sib.id)
            .includes(option.productTypeId)
        );
      } else if (this.select.label === "Color" && this.foundProducts != null) {
        let foundProductsColors = [
          ...new Set(
            this.foundProducts
              .flatMap((product) => product.versions)
              .map((version) => version.color)
          ),
        ];
        let res = this.select.options.filter((option) =>
          foundProductsColors.includes(option.value)
        );
        return res.length === 0 ? false : res;
      } else {
        return this.select.options;
      }
    },

    siblings() {
      // selectsGetter
      return this.$store.getters["navigation/selectsGetter"]
        .find((group) => group.id === this.select.groupId)
        .options.find((option) => option.id === this.select.optionId)
        .attributes.filter((attribute) => attribute.id !== this.select.id)
        .flatMap((sibling) => sibling.options);
    },
    checkedSiblings() {
      return this.siblings.filter((sibling) => sibling.checked);
    },
    hasCheckedSiblings() {
      return this.siblings.some((siblingOption) => siblingOption.checked);
    },
    isSelected() {
      let selectedElHas = (elementKey, selectValue) => {
        // Look if all el key of type X has Y
        return [...this.selectedOptionsElements]
          .map((el) => el[elementKey])
          .includes(selectValue);
      };

      // Attribute Belongs to Checked Option
      let hasOptionId = selectedElHas("id", this.select.optionId);

      // Select belongs to Group
      let hasGroupId = selectedElHas("groupId", this.select.groupId);

      let hasName = selectedElHas("value", this.select.name);

      return (hasOptionId && hasGroupId && hasName) || this.hasCheckedOption
        ? true
        : false;
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
};
</script>
<style lang="postcss"></style>
