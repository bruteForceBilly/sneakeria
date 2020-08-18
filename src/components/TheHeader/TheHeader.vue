<template>
  <div>
    <TheHeaderSettings v-slot:default="{ show, setShow }">
      <TheHeaderLayout>
        <template v-slot:sidebarToggleIcon>
          <img @click="setShow($event)" src="@/assets/menu.svg" />
        </template>

        <template v-slot:logo>
          <img src="@/assets/logo.svg" />
        </template>
      </TheHeaderLayout>

      <TheSidebar></TheSidebar>
    </TheHeaderSettings>
  </div>
</template>

<script>
import TheHeaderSettings from "./TheHeaderSettings";
import TheHeaderLayout from "./TheHeaderLayout";
import TheSidebar from "@/components/TheSidebar/TheSidebar";

export default {
  name: "TheHeader",
  components: {
    TheHeaderSettings,
    TheHeaderLayout,
    TheSidebar
  }
};
</script>

<style></style>
