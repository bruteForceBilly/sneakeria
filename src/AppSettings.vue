<template>
  <div>
    <slot settings=""></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppSettings",
  computed: {
    ...mapState("search", ["queryParamsObject"]),
  },
  beforeCreate() {
    this.$store.dispatch("navigation/navigationInitAction").then(() => {
      this.$store.dispatch(
        "navigation/selectOptionsCheckToggle",
        this.queryParamsObject
      );
    });
  },
};
</script>
