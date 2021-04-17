<template>
  <div
    :class="{
      'inline-block py-1': !isMobile,
      'border-b border-gray-300': isMobile,
    }"
  >
    <div v-if="thereIsFoundProducts">
      <Menu
        :isMobile="isMobile"
        v-for="item in rangeSliders"
        :key="item.name"
        :item="item"
      >
        <template v-slot:menu-items>
          <MenuOption
            :isMobile="isMobile"
            :item="item"
            v-for="option in item.options"
            :key="option.id"
          >
            <template v-slot:option-input>
              <MenuInputRange
                :isMobile="isMobile"
                :item="item"
                :option="option"
              />
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
import MenuInputRange from "../DropDownMenu/MenuInputRange.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Menu,
    MenuOption,
    MenuInputRange,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    rangeSliders: {
      type: Array,
    },
    selectedOptionsObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters("search", ["foundProducts"]),
    thereIsFoundProducts() {
      return this.foundProducts === null || this.foundProducts.length === 0
        ? false
        : true;
    },
  },
};
</script>
