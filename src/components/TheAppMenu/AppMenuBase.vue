<template>
  <div>
    <AppMenuSettings
      v-slot:default="{
        featuredNavigation,
        selectedNavigation,
        selectedNavigationHandler,
        hoverSetShow,
        leaveSetShow,
        show
      }"
    >
      <AppMenuLayout>
        <template v-slot:hamburger>
          <img src="@/assets/menu.svg" />
        </template>
        <template v-slot:logo>
          <div>
            <img src="@/assets/logo.svg" class="mx-auto md:mx-1" />
          </div>
        </template>
        <template v-slot:fly-out>
          <FlyOutMenu
            v-show="show"
            @mouseleave.native="leaveSetShow()"
            :featured-navigation="featuredNavigation"
            :selected-navigation="selectedNavigation"
          ></FlyOutMenu>
        </template>
        <template v-slot:navbar>
          <div class="hidden md:inline-block">
            <div class="flex justify-center">
              <FeaturedLinksBarItem
                v-for="item in featuredNavigation"
                :key="item.id"
                link-to="item.value"
              >
                <span
                  @mouseenter="
                    selectedNavigationHandler(item);
                    hoverSetShow();
                  "
                >
                  {{ item.label }}
                </span>
              </FeaturedLinksBarItem>
            </div>
          </div>
        </template>
        <template v-slot:icons>
          <div class="flex justify-center md:justify-end">
            <img
              src="@/assets/help-circle.svg"
              class="pr-2 hidden sm:inline-block"
            />
            <img src="@/assets/heart.svg" class="px-2 hidden sm:inline-block" />
            <img src="@/assets/shopping-cart.svg" class="px-2" />
          </div> </template
      ></AppMenuLayout>
    </AppMenuSettings>
  </div>
</template>

<script>
import AppMenuSettings from "@/components/TheAppMenu/AppMenuSettings";
import AppMenuLayout from "@/components/TheAppMenu/AppMenuLayout";
import FeaturedLinksBarItem from "./FeaturedLinksBarItem.vue";
import FlyOutMenu from "@/components/TheAppMenu/FlyOutMenu";

export default {
  name: "AppMenuBase",
  components: {
    AppMenuSettings,
    AppMenuLayout,
    FlyOutMenu,
    FeaturedLinksBarItem
  },
  computed: {
    console: () => console
  }
};
</script>
