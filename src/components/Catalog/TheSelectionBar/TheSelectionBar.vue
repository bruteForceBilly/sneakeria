<template>
  <div>
    <Settings
      :selects="selects"
      v-slot:default="{
        settings,
        navigationIsloading,
      }"
    >
      <!-- WE NEED A SELECTION BAR LAYOUT COMPONENET -->
      <div v-if="navigationIsloading">...loading</div>
      <div :style="{ height: `${hangHeight}px` }" class="mb-3" v-else>
        <div
          v-hang="'hang'"
          :style="$mq == 'sm' ? 'top:55px' : 'top: 1rem'"
          :class="{
            'hang-enter fixed left-0 z-60 w-full': hang,
            '`static`': !hang,
          }"
        >
          <!-- If mobile to render the two boxes -->
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
            <div v-for="menu in selectionbarMobile" :key="menu.name">
              <div class="h-full w-full">
                <MenuButton
                  :isBlock="true"
                  @click.native="mobileMenuSelected = menu"
                >
                  <template v-slot:menu-label>
                    <span class="text-xs">{{ menu.label }} </span></template
                  >
                </MenuButton>
              </div>
            </div>
            <!-- End of If mobile -->
          </div>
          <div v-else class="relative">
            <div
              class="bg-white w-full flex justify-start items-center transition delay-500 duration-500 ease-in-out"
              :class="hang ? 'border border-gray-900' : 'border-t border-b'"
            >
              <FilterSelects
                :isMobile="false"
                :selected-options-object="settings.selectedOptionsObject"
                :selects="settings.selectionbarFilters"
              ></FilterSelects>

              <RangeSelects
                :isMobile="false"
                :range-sliders="settings.selectionbarRanges"
              ></RangeSelects>

              <SortSelects class="ml-auto" :sorts="settings.selectionbarSorts">
              </SortSelects>
            </div>
          </div>

          <!-- Start of mobile menu modal -->
          <div
            v-if="isMobileScreen && mobileMenuSelected != null"
            class="fixed top-0 left-0 right-0 bottom-0 z-60 h-screen w-screen flex flex-col bg-white overflow-y-auto"
          >
            <div v-if="mobileMenuSelected.name == 'sortBy'">
              <div class="flex justify-end items-center p-3">
                <span
                  class="flex-grow tracking-tighter uppercase text-lg inline"
                  >{{ mobileMenuSelected.label }}</span
                >

                <img
                  @click="mobileMenuSelected = null"
                  src="@/assets/x.svg"
                  class="ml-4 mr-2"
                />
              </div>

              <SortSelects
                :isMobile="true"
                :sorts="settings.selectionbarSorts"
                @click.native="mobileMenuSelected = null"
              />
            </div>

            <div
              v-if="mobileMenuSelected.name == 'filterBy'"
              class="absolute w-full pb-28"
            >
              <div class="flex justify-end items-center p-3">
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

              <FilterSelects
                class="mt-4"
                :isMobile="true"
                :selected-options-object="settings.selectedOptionsObject"
                :selects="settings.selectionbarFilters"
              ></FilterSelects>

              <RangeSelects
                :isMobile="true"
                :range-sliders="settings.selectionbarRanges"
              ></RangeSelects>

              <!-- APPLY BUTTON -->
              <transition name="button-slide-fade">
                <div
                  v-if="selectedOptionsElements.length > 0"
                  class="fixed top-0 right-0 left-0 w-screen px-7 z-70"
                  style="margin-top: calc(100vh - 4.5rem)"
                >
                  <ProductCardButton
                    v-show="mobileMenuSelected.value == 'FilterSelects'"
                    class="w-full"
                    @click.native="mobileMenuSelected = null"
                    icon="none"
                    button-style="primary primary--call-to-action"
                  >
                    APPLY ⟶
                  </ProductCardButton>
                </div>
              </transition>
            </div>
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
    ...mapGetters("navigation", [
      "selectedOptionsElements",
      "selectionbarMobile",
    ]),
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
.button-slide-fade-enter-active,
.button-slide-fade-leave-active {
  transition: all 0.3s ease;
}

.button-slide-fade-enter,
.button-slide-fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

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
