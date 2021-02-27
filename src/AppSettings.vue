<template>
  <div>
    <slot :api="hello"></slot>
  </div>
</template>

<script>
export default {
  name: "AppSettings",
  data() {
    return {
      hello: "test",
      load: ["header", "sidebar", "selectionbar"],
    };
  },
  methods: {
    loadNavigation() {
      this.load.forEach((cv) => {
        this.$store.dispatch("navigation/navigationInitAction", {
          menuName: cv,
        });
      });
    },
  },
};
</script>
