<template>
  <div>
    <router-link
      to="/about"
      class="no-underline text-gray-700 hover:text-teal-600 border-transparent border-b-2 hover:border-teal-600 uppercase tracking-wide font-bold text-xs py-3 mr-8"
      ><slot></slot
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  props: ["linkTo"]
};
</script>

<style lang="scss" scoped></style>
