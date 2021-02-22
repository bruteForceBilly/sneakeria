<template>
  <div>
    <Settings
      :selects="selects"
      v-slot:default="{
        settings,
      }"
    >
      <!-- We need to get the calc height from hang element 
      :style="{ height: `${hangHeight}px` }"
      -->
      <div :style="{ height: `${hangHeight}px` }" class="mb-3">
        <div
          v-hang="'hang'"
          :style="$mq == 'sm' ? 'top:55px' : 'top: 1rem'"
          :class="{
            'hang-enter fixed left-0 z-40 w-full': hang,
            '`static`': !hang,
          }"
        >
          <div
            v-if="isMobileScreen"
            :style="{
              '`height: calc(${menuHeight()}px - 1rem)`': hang,
            }"
            class="relative w-full mobile-menu-grid transition delay-500 duration-500 ease-in-out bg-gray-300 border-t border-b"
            :class="{
              'border border-gray-900 bg-gray-900': hang,
            }"
          >
            <div v-for="menu in mobileMenus" :key="menu.name">
              <div class="h-full bg-white">
                <MenuButton
                  :isBlock="true"
                  @click.native="mobileMenuSelected = menu"
                >
                  <template v-slot:menu-label> {{ menu.label }} </template>
                </MenuButton>
              </div>
            </div>

            <!-- <div

 grid-template-columns: 50% 50%;

              class="uppercase bg-white w-full flex justify-start transition delay-500 duration-500 ease-in-out"
              :class="hang ? 'border border-gray-900' : 'border-t border-b'"
            >
              <div
                class="px-2 py-1 border-r w-1/2 transition delay-500 duration-500 ease-in-out"
                :class="hang ? 'border-gray-900' : 'border-gray-300'"
              >
                Filter
              </div>
              <div class="px-2 py-1 w-1/2">Sort after</div>
            </div> -->
          </div>
          <div v-else class="relative">
            <div
              class="py-1 px-2 bg-white w-full flex justify-start transition delay-500 duration-500 ease-in-out"
              :class="hang ? 'border border-gray-900' : 'border-t border-b'"
            >
              <FilterSelects
                :isMobile="false"
                :selected-options-object="settings.selectedOptionsObject"
                :selects="settings.selects"
              ></FilterSelects>

              <RangeSelects
                :range-sliders="settings.rangeSliders"
              ></RangeSelects>

              <SortSelects class="ml-auto" :sorts="settings.sorts">
              </SortSelects>
            </div>
          </div>

          <div
            v-if="
              mobileMenuSelected != null &&
              mobileMenuSelected.value == 'FilterSelects'
            "
            class="fixed top-0 left-0 z-60 w-screen h-screen bg-white overflow-y-auto"
          >
            <div class="w-full flex justify-end items-center p-4 pb-0">
              <span
                class="flex-grow tracking-tighter uppercase text-lg inline"
                >{{ mobileMenuSelected.label }}</span
              >

              <span
                v-show="selectedOptionsElements.length > 0"
                @click="clearAllTags()"
                class="capitalize cursor-pointer inline px-0 mx-2 underline bg-transparent text-gray-800 font-sans font-normal text-xs"
                >Clear all</span
              >
              <img
                @click="mobileMenuSelected = null"
                src="@/assets/x.svg"
                class="ml-4 mr-2"
              />
            </div>

            <!-- <span
              @click="mobileMenuSelected = null"
              class="absolute top-0 right-0 m-4 cursor-pointer"
              :class="mobileMenuSelected != null"
              >X</span> -->

            <FilterSelects
              class="mt-4"
              :isMobile="true"
              :selected-options-object="settings.selectedOptionsObject"
              :selects="settings.selects"
            ></FilterSelects>

            <!-- <RangeSelects :range-sliders="settings.rangeSliders"></RangeSelects> -->

            <div class="w-full absolute bottom-0 pl-5 pb-6 pr-8">
              <ProductCardButton
                @click.native="mobileMenuSelected = null"
                class="w-full py-3 relative"
                icon="none"
                button-style="primary primary--call-to-action"
              >
                APPLY ⟶
              </ProductCardButton>
            </div>
          </div>

          <div
            v-if="
              mobileMenuSelected != null &&
              mobileMenuSelected.value == 'SortSelects'
            "
            class=""
          >
            <SortSelects class="" :sorts="settings.sorts"> </SortSelects>
          </div>

          <div v-if="!hang" class="mt-4">
            <TheSelectedOptions
              :update-route-query-params="settings.updateRouteQueryParams"
              :selected-options-object="settings.selectedOptionsObject"
              :selects="settings.selects"
            ></TheSelectedOptions>
          </div>
        </div>
      </div>
    </Settings>
  </div>
</template>

<script>
import MenuButton from "@/components/Catalog/TheSelectionBar/DropDownMenu/MenuButton.vue";
import ProductCardButton from "@/components/Catalog/ProductCard/ProductCardButton.vue";
import FilterSelects from "./FilterSelects/FilterSelects.vue";
import SortSelects from "./SortSelects/SortSelects.vue";
import RangeSelects from "./RangeSelects/RangeSelects.vue";
import TheSelectedOptions from "./TheSelectedOptions/TheSelectedOptions.vue";
import Settings from "./TheSelectionBarSettings.vue";
import hang from "@/directives/hang.js";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheCatalogSelectionBar",
  components: {
    MenuButton,
    FilterSelects,
    SortSelects,
    RangeSelects,
    TheSelectedOptions,
    Settings,
    ProductCardButton,
  },
  props: {
    selects: {
      type: Array,
    },
  },
  data() {
    return {
      hang: false,
      hangHeight: null,
      windowHeight: null,
      mobileMenuSelected: null,
      mobileMenuSelectedOpen: null,
    };
  },
  methods: {
    ...mapMutations("navigation", ["toggleElement"]),

    menuHeight() {
      return this.windowHeight - 55;
    },
    toggleOption(option) {
      this.$store.commit("setByRoute", false);
      return this.toggleElement(option);
    },
    clearAllTags() {
      let copySelectedOptionsElements = [...this.selectedOptionsElements];
      return copySelectedOptionsElements.forEach((option) =>
        this.toggleOption(option)
      );
    },
  },
  computed: {
    ...mapGetters("navigation", ["selectedOptionsElements"]),

    mobileMenus() {
      return this.$store.state.navigation.mobile.slice(0, 2);
    },
    isMobileScreen() {
      return this.$mq !== "xl" ? true : false;
    },
  },
  directives: {
    hang: hang,
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
    });
  },
};
</script>

<style lang="postcss" scoped>
.hang-enter {
  animation-name: hang;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.mobile-menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
}

@keyframes hang {
  0% {
    padding: 0 2rem;
    opacity: 0;
    transform: translateY(-100%);
  }
  50% {
    padding: 0 2rem;
    transform: translateY(0);
  }
  100% {
    padding: 0 1rem;
    opacity: 1;
  }
}
</style>
