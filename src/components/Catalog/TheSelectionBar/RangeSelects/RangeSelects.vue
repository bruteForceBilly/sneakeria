<template>
  <div>
    <div>
      <Menu v-for="item in selects" :key="item.name" :item="item">
        <template v-slot:menu-items>
          <MenuOption
            :item="item"
            v-for="option in item.options"
            :key="option.id"
          >
            <template v-slot:option-input>
              <MenuInputRange :item="item" :option="option"> </MenuInputRange>
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

export default {
  components: {
    Menu,
    MenuOption,
    MenuInputRange,
  },
  props: {
    selects: {
      type: Array,
    },
  },
};
</script>
