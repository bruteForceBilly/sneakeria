<template>
  <div>
    <slot :items="items"></slot>
  </div>
</template>

<script>
export default {
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
          {
            name: "Cart",
            label: "Cart",
            value: "cart",
            src: "shopping-cart.svg",
          },
        ],
      },
    };
  },
};
</script>
