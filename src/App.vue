<template>
  <div id="app">
    {{ test }}
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      |
      <!--
              1 - router link to category home should be refactored so that
              the value passed to param id is dynamic. That way we can loop out the
              router link to navigate to a particular root section directly
              generating a "home" for men, women etc. 

              Could aso be that the easiset way is just to a if check and se if dynamic value
              is found in section and if not handle it as "all", i.e. with products
      -->
      <router-link :to="{ name: 'CategoryHome', params: { id: 'products' } }"
        >Category Page</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["test"],
  methods: {
    ...mapActions("siteMap", ["getSiteMap"])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
