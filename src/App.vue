<template>
  <div id="app">
    <p>app vue</p>
    <TheAppMenu> </TheAppMenu>
    <transition name="fade" mode="out-in">
      <router-view> </router-view>
    </transition>
    <!-- try with transition and keep alive 
    
    https://github.com/vuejs/vue-router/blob/dev/examples/transitions/app.js
    -->
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
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s ease, transform 1s ease;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 1s ease, transform 1s ease;
  transform: translateX(-30%);
  opacity: 0;
}
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
