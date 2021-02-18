<template>
  <div
    class="flex flex-row items-center text-black font-sans font-normal text-sm capitalize"
  >
    <span class="font-black mr-2">←</span>

    <span
      @click="goBack()"
      class="underline cursor-pointer uppercase font-black tracking-widest"
      >Back</span
    >

    <span class="mx-2">/</span>

    <router-link :to="{ name: 'home' }">
      <span class="underline cursor-pointer">Home</span>
    </router-link>

    <span class="mx-2">/</span>

    <Crumbs></Crumbs>
  </div>
</template>

<script>
import Crumbs from "./Crumbs.vue";

export default {
  name: "TheBreadCrumbBar",
  components: {
    Crumbs,
  },
  computed: {
    history() {
      return this.$routerHistory;
    },
  },
  methods: {
    setByRoute(arg) {
      return this.$store.commit("setByRoute", arg);
    },
    goBack() {
      this.$store.commit("cache/popStack");
      this.$store.commit("setByRoute", true);

      if (this.$store.state.cache.stack.length >= 1) {
        this.$router
          .push(this.$store.getters["cache/currentRoute"].fullPath)
          .catch((err) => err)
          .finally(() => {
            this.$store
              .dispatch("navigation/selectOptionsCheckReset")
              .then(() => {
                this.$store.dispatch(
                  "navigation/selectOptionsCheckToggle",
                  this.$store.state.search.queryParamsObject
                );
              });
          });
      } else {
        this.$router.push({ name: "home" }).catch((err) => err);
      }
    },
  },
};
</script>
