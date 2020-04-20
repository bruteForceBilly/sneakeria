<template>
  <div id="app">
    <p>app vue</p>
    <TheAppMenu> </TheAppMenu>
    <router-view> </router-view>

    <!-- try with transition and keep alive -->
  </div>
</template>

<script>
import TheAppMenu from "@/components/TheAppMenu/AppMenuBase";

export default {
  name: "App",
  components: {
    TheAppMenu
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: SlateBlue;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: SlateBlue;
}

#nav a.router-link-exact-active {
  color: SlateBlue;
}
</style>
