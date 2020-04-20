<template>
  <div>
    <p>app menu base</p>
    <AppMenuSettings v-slot:default="{ appMenuSettings }">
      <AppMenuLayout>
        <template v-slot:logo>
          <router-link :to="{ name: 'home' }">
            <img src="@/assets/logo.jpg"
          /></router-link>
        </template>
        <template v-slot:navbar>
          <NavBar
            v-if="!appMenuSettings.loading"
            :state="{ appMenuSettings }"
            featured-category="section"
            featured-link="about"
          ></NavBar>
        </template>
      </AppMenuLayout>
    </AppMenuSettings>
  </div>
</template>

<script>
import AppMenuSettings from "@/components/TheAppMenu/AppMenuSettings";
import AppMenuLayout from "@/components/TheAppMenu/AppMenuLayout";
import NavBar from "@/components/TheAppMenu/NavBar";

export default {
  name: "AppMenuBase",
  components: {
    AppMenuSettings,
    AppMenuLayout,
    NavBar
  }
};
</script>
