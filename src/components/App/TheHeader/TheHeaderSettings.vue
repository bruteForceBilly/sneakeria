<template>
  <div>
    <slot :show="show" :setShow="setShow"></slot>
  </div>
</template>

<script>
// rename show to sidebarShow
// rename setShow to setSidebarShow
export default {
  name: "TheHeaderSettings",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    setShow(event) {
      const that = this;
      switch (event.type) {
        case "hover":
          if (that.$mq === "lg" || that.$mq === "xl") return (that.show = true);
          break;
        case "leave":
          if (that.screenMode === "screen--desktop") {
            that.show = false;
          } else {
            that.show = true;
          }
          break;
        case "click":
          that.show = !that.show;
          break;
        default:
          console.log("setShow switch arg not found", event);
      }
    },
  },
  computed: {
    mq() {
      return this.$mq;
    },
    screenMode() {
      return this.mq === "sm" || this.mq === "md"
        ? "screen--mobile"
        : "screen--desktop";
    },
  },
  watch: {
    mq() {
      return (this.show = false);
    },
  },
};
</script>
