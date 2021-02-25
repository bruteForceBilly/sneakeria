<template>
  <div>
    <div>
      <Menu
        v-for="item in sorts"
        :key="item.name"
        :item="item"
        :isMobile="isMobile"
        :showMenuButton="isMobile ? false : true"
      >
        <template v-slot:menu-items>
          <!-- Config flex layout here -->
          <MenuOption
            :isMobile="isMobile"
            :class="{ 'mobile-border': isMobile }"
            class="hover:bg-gray-200 uppercase"
            :item="item"
            v-for="option in item.options"
            :key="option.id"
          >
            <template v-slot:option-input> </template>

            <template v-slot:option-label>
              <div
                @click="
                  [
                    (option.checked = !option.checked),
                    sortSettingsHandler(option.value),
                  ]
                "
                class="border-l-0 py-3 pl-3"
                :class="[
                  {
                    'pl-3 py-4 tracking-widest text-base border-l-8': isMobile,
                  },
                  option.checked ? 'border-black ' : 'border-white',
                ]"
              >
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
    sorts: Array,
    isMobile: Boolean,
  },
  components: {
    Menu,
    MenuOption,
  },
  methods: {
    setByRouteHandler() {
      this.$store.commit("setByRoute", false);
    },
    sortSettingsHandler(optionValue) {
      return this.$store.dispatch("sort/settingAction", optionValue);
    },
  },
};
</script>
<style lang="postcss" scoped>
.mobile-border {
  border-top-width: 1px;
}

.mobile-border:last-child {
  border-bottom-width: 1px;
}
</style>
