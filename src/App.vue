<template>
  <div id="app">
    <TheHeader> </TheHeader>
    <div>
      <transition name="fade" mode="out-in">
        <router-view @scroll.native="handleScroll()"> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/App/TheHeader/TheHeader";
import debounce from "lodash/debounce";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  methods: {
    handleScroll(event) {
      debounce(function (e) {
        console.log("calling handleScroll");
      }, 500);
    },
  },
  created() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
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

.fade-leave-active {
  opacity: 0;
  transition: opacity 1s ease, transform 1s ease;
  transform: translateX(-30%);
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
  color: slateblue;
}

#nav a.router-link-exact-active {
  color: slateblue;
}
</style>
