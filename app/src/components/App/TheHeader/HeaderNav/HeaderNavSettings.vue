<template>
  <div>
    <slot :items="items"></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("navigation", ["header"]),
  },
  data() {
    return {
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
};
</script>
