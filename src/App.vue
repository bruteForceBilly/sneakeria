<template>
  <div id="app">
    <TheHeader> </TheHeader>
    <div>
      <transition name="fade" mode="out-in">
        <router-view> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/App/TheHeader/TheHeader";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  beforeMount() {
    return this.$store.dispatch("search/getSiteDataAction");
  },
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
