<template>
  <div id="app">
    <TheHeader> </TheHeader>

    <div>
      <transition name="fade" mode="out-in">
        <router-view> </router-view>
      </transition>
    </div>

    <!-- try with transition and keep alive     
    https://github.com/vuejs/vue-router/blob/dev/examples/transitions/app.js
    -->
  </div>
</template>

<script>
import TheHeader from "@/components/App/TheHeader/TheHeader";

import axios from "axios";
import { API_SITE } from "@/constants";

export default {
  name: "App",
  components: {
    TheHeader
  },
  beforeCreate() {
    // should be moved to service and featured category should be set from there
    this.$store.dispatch({
      type: "siteMapAction",
      data: null,
      loading: true,
      error: null
    });
    return axios
      .get(API_SITE)
      .then(response =>
        this.$store.dispatch({
          type: "siteMapAction",
          data: response.data,
          loading: false,
          error: null
        })
      )
      .catch(err =>
        this.$store.dispatch({
          type: "siteMapAction",
          data: err.toString(),
          loading: false,
          error: true
        })
      );
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
