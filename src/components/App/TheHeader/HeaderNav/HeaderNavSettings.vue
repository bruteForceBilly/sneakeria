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
            name: "Men",
            label: "Men",
            value: "men"
          },
          {
            name: "Women",
            label: "Women",
            value: "women"
          },
          {
            name: "New",
            label: "New",
            value: "new"
          },
          {
            name: "Essentials",
            label: "Essentials",
            value: "essentials"
          }
        ],
        icons: [
          {
            name: "Help",
            label: "help",
            value: "help",
            src: "help-circle.svg"
          },
          {
            name: "Whishlist",
            label: "Whishlist",
            value: "whishlist",
            src: "heart.svg"
          },
          {
            name: "Cart",
            label: "Cart",
            value: "cart",
            src: "shopping-cart.svg"
          }
        ]
      }
    };
  }
};
</script>
