<template>
  <div>
    <div class="flex justify-center">
      <FeaturedLinksBarItem
        v-for="(item, index) in mock"
        :key="item + index"
        link-to="/product"
      >
        {{ item }}</FeaturedLinksBarItem
      >
    </div>
  </div>
</template>

<script>
import FeaturedLinksBarItem from "./FeaturedLinksBarItem.vue";
export default {
  name: "FeaturedLinksBar",
  components: {
    FeaturedLinksBarItem
  },
  data() {
    return {
      mock: ["men", "women", "product"]
    };
  }
};
</script>

<style lang="postcss" scoped></style>
