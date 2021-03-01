<template>
  <div>
    <slot :settings="{ headerLinks, headerIcons, show, setShow }"></slot>
  </div>
</template>

<script>
// rename show to sidebarShow
// rename setShow to setSidebarShow

import { mapGetters } from "vuex";

export default {
  name: "TheHeaderSettings",
  data() {
    return {
      show: false,
      items: {
        links: [
          {
            name: "section",
            label: "Men",
            value: "men",
          },
          {
            name: "section",
            label: "Women",
            value: "women",
          },
          {
            name: "campaigns",
            label: "New",
            value: "new",
          },
          {
            name: "campaigns",
            label: "Essentials",
            value: "essentials",
          },
        ],
        icons: [
          {
            name: "Help",
            label: "help",
            value: "help",
            src: "help-circle.svg",
          },
          {
            name: "Whishlist",
            label: "Whishlist",
            value: "whishlist",
            src: "heart.svg",
          },
        ],
      },
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
    ...mapGetters("navigation", ["headerLinks", "headerIcons"]),

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
