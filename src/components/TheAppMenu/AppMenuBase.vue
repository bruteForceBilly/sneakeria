<template>
  <div>
    <AppMenuSettings>
      <AppMenuLayout>
        <template v-slot:logo>
          <router-link :to="{ name: 'home' }">
            <img src="@/assets/logo.svg"
          /></router-link>
        </template>

        <template v-slot:navbar>
          <NavBar featured-category="section" featured-link="about"></NavBar>
        </template>
        <template v-slot:modal>
          <img src="@/assets/heart.svg" />
          <img src="@/assets/shopping-cart.svg" />
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
