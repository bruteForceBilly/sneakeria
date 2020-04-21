<template>
  <div>
    <li>
      <router-link :to="{ linkTo }"><slot></slot></router-link>
    </li>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  props: ["linkTo"]
};
</script>

<style lang="scss" scoped></style>
