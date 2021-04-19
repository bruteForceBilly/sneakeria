<template>
  <div class="flex justify-center">
    <div v-for="link in content" :key="link.value" @click="setByRoute(true)">
      <router-link :to="link.value" v-slot="{ navigate }" custom>
        <header-nav-link @click.native="navigate" :link="link" />
      </router-link>
    </div>
  </div>
</template>

<script>
import HeaderNavLink from "./HeaderNavLink.vue";
export default {
  components: { HeaderNavLink },
  props: {
    content: Array,
  },
  methods: {
    setByRoute(arg) {
      return this.$store.commit("setByRoute", arg);
    },
  },
};
</script>
