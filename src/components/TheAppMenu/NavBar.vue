<template>
  <div>
    <div class="flex justify-center">
      <navItem
        v-for="(item, index) in mock"
        :key="item + index"
        link-to="/about"
      >
        {{ item }}</navItem
      >
    </div>
  </div>
</template>

<script>
import navItem from "./NavItem.vue";
export default {
  name: "NavBarComponent",
  components: {
    navItem
  },
  data() {
    return {
      mock: ["men", "women", "about"]
    };
  }
};
</script>

<style lang="postcss" scoped></style>
