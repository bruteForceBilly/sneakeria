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
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  computed: {
    ...mapState("search", ["queryParamsObject"]),
  },
  beforeCreate() {
    this.$store.dispatch("navigation/navigationInitAction").then(() => {
      this.$store.dispatch(
        "navigation/selectOptionsCheckToggle",
        this.queryParamsObject
      );
    });
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
