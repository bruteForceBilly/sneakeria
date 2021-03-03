<template>
  <div>
    <slot settings=""></slot>
  </div>
</template>

<script>
export default {
  name: "AppSettings",
  beforeCreate() {
    ["header", "sidebar", "selectionbar", "mobile"].forEach((cv) => {
      this.$store.dispatch("navigation/navigationInitAction", {
        menuName: cv,
      });
    });
  },
};
</script>
