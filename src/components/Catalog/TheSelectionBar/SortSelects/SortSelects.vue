<template>
  <div>
    <div>
      <Menu v-for="item in sorts" :key="item.name" :item="item">
        <template v-slot:menu-items>
          <MenuOption
            :item="item"
            v-for="option in item.options"
            :key="option.id"
          >
            <template v-slot:option-input> </template>

            <template v-slot:option-label>
              <div @click="sortSettingsHandler(option.value)">
                {{ option.label }}
              </div>
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

export default {
  props: {
    sorts: {
      type: Array,
    },
  },
  components: {
    Menu,
    MenuOption,
  },
  methods: {
    sortSettingsHandler(optionValue) {
      console.log("sortSettingsHandler optionValue", optionValue);
      //debugger;
      return this.$store.dispatch("sort/settingAction", optionValue);
    },
  },
};
</script>
