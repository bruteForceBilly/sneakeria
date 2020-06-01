<template>
  <div>
    <div class="flex justify-center">
      <FeaturedLinksBarItem
        v-for="item in featured"
        :key="item.id"
        link-to="item.value"
      >
        {{ item.label }}</FeaturedLinksBarItem
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
  props: ["featured"]
};
</script>

<style lang="postcss" scoped></style>
