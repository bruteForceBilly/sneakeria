<template>
  <div>
    <TheHeaderSettings v-slot:default="{ show, setShow }">
      <TheHeaderLayout :show="show">
        <template v-slot:sidebarToggleIcon>
          <img @click="setShow($event)" src="@/assets/menu.svg" />
        </template>

        <template v-slot:logo>
          <img src="@/assets/logo.svg" />
        </template>

        <template v-slot:links>
          <HeaderNav mode="links"></HeaderNav>
        </template>

        <template v-slot:icons>
          <HeaderNav mode="icons"></HeaderNav>
        </template>
      </TheHeaderLayout>

      <TheSidebar :show="show" :set-show="setShow"></TheSidebar>
    </TheHeaderSettings>
  </div>
</template>

<script>
import TheHeaderSettings from "./TheHeaderSettings";
import TheHeaderLayout from "./TheHeaderLayout";
import TheSidebar from "@/components/TheSidebar/TheSidebar";
import HeaderNav from "./HeaderNav/HeaderNav.vue";

export default {
  name: "TheHeader",
  components: {
    TheHeaderSettings,
    TheHeaderLayout,
    TheSidebar,
    HeaderNav
  }
};
</script>

<style></style>
