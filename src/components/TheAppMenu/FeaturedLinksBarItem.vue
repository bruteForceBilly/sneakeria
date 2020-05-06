<template>
  <div>
    <router-link
      to="/product/1"
      class="no-underline text-black border-transparent border-b-2 hover:border-black uppercase tracking-widest font-bold text-sm py-3 mr-8"
      ><slot></slot
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "FeaturedLinksBarItem",
  props: ["linkTo"]
};
</script>

<style lang="scss" scoped></style>
