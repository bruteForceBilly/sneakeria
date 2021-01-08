<template>
  <div
    class="flex flex-row items-center py-1 text-gray-800 font-sans font-normal text-sm capitalize tracking-widest"
  >
    <span class="font-black mr-2">←</span>
    <span
      @click="onBack()"
      class="underline cursor-pointer uppercase font-black"
      >Back</span
    >
    <span class="mx-2">/</span>

    <router-link to="all">
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
  methods: {
    setByRoute(arg) {
      return this.$store.commit("setByRoute", arg);
    },
    onBack() {
      this.$store.commit("setByRoute", true);
      return this.$router.go(-1);
    },
  },
};
</script>
