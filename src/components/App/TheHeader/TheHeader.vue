<template>
  <div>
    <TheHeaderSettings v-slot:default="{ settings }">
      <TheHeaderLayout :show="settings.show">
        <template v-slot:sidebarToggleIcon>
          <img @click="settings.setShow($event)" src="@/assets/menu.svg" />
        </template>

        <template v-slot:logo>
          <img src="@/assets/logo.svg" />
        </template>

        <template v-slot:links v-if="settings.headerLinks">
          <HeaderNav :content="settings.headerLinks" />
        </template>

        <template v-slot:icons>
          <HeaderNav :content="settings.headerIcons" />
        </template>
      </TheHeaderLayout>

      <TheSidebar
        :show="settings.show"
        :set-show="settings.setShow"
      ></TheSidebar>
    </TheHeaderSettings>
  </div>
</template>

<script>
import TheHeaderSettings from "./TheHeaderSettings";
import TheHeaderLayout from "./TheHeaderLayout";
import TheSidebar from "@/components/App/TheSidebar/TheSidebar";
import HeaderNav from "./HeaderNav/HeaderNav.vue";

export default {
  name: "TheHeader",
  components: {
    TheHeaderSettings,
    TheHeaderLayout,
    TheSidebar,
    HeaderNav,
  },
  beforeUpdate() {
    console.log("hello", this.items);
  },
};
</script>

<style></style>
