<template>
  <div>
    <slot :node="root" :selected="selected" :select="select"></slot>
  </div>
</template>

<script>
export default {
  name: "TheSidebarSettings",
  data() {
    return {
      selectedState: null,
      root: {
        name: "Root",
        parent: "Root",
        children: [
          {
            name: "Men",
            label: "Men",
            value: "men",
            parent: "Root",
            children: [
              {
                name: "Shoes",
                value: "men-shoes",
                label: "Shoes",
                parent: "Men",
                children: [
                  {
                    name: "All",
                    label: "All Men's shoes",
                    value: "men-shoes",
                    parent: "Shoes",
                  },
                  {
                    name: "New",
                    label: "New arrivals",
                    value: "men-shoes-new",
                    parent: "Shoes",
                  },
                  {
                    name: "Essentials",
                    label: "Essentials",
                    value: "men-shoes-essentials",
                    parent: "Shoes",
                  },
                  {
                    name: "Basketball",
                    label: "Basketball",
                    value: "men-shoes-basketball",
                    parent: "Shoes",
                  },
                  {
                    name: "Soccer",
                    label: "Soccer",
                    value: "men-shoes-soccer",
                    parent: "Shoes",
                  },
                  {
                    name: "Tennis",
                    label: "Tennis",
                    value: "men-shoes-tennis",
                    parent: "Shoes",
                  },
                ],
              },
              {
                name: "Clothing",
                label: "Clothing",
                value: "men-clothing",
                parent: "Men",
                children: [
                  {
                    name: "All",
                    label: "All Men's clothing",
                    value: "men-clothing",
                    parent: "Clothing",
                  },
                  {
                    name: "Shirts",
                    label: "Men's Shirts",
                    value: "men-shirts",
                    parent: "Clothing",
                    children: [
                      {
                        name: "New",
                        label: "New Arrivals",
                        value: "men-shirts-new",
                        parent: "Clothing",
                      },
                      {
                        name: "Sale",
                        label: "Men's Shirts",
                        value: "men-shirts-sale",
                        parent: "Clothing",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Sale",
                label: "Sale",
                value: "men-sale",
              },
            ],
          },
          {
            name: "Women",
            label: "Women",
            value: "women",
            parent: "Root",
            children: [
              {
                name: "Shoes",
                value: "women-shoes",
                label: "Shoes",
                parent: "Women",
                children: [
                  {
                    name: "All",
                    label: "All Women's shoes",
                    value: "women-shoes",
                    parent: "Shoes",
                  },
                  {
                    name: "New",
                    label: "New arrivals",
                    value: "women-shoes-new",
                    parent: "Shoes",
                  },
                  {
                    name: "Essentials",
                    label: "Essentials",
                    value: "women-shoes-essentials",
                    parent: "Shoes",
                  },
                  {
                    name: "Basketball",
                    label: "Basketball",
                    value: "women-shoes-basketball",
                    parent: "Shoes",
                  },
                  {
                    name: "Soccer",
                    label: "Soccer",
                    value: "women-shoes-soccer",
                    parent: "Shoes",
                  },
                  {
                    name: "Tennis",
                    label: "Tennis",
                    value: "women-shoes-tennis",
                    parent: "Shoes",
                  },
                ],
              },
              {
                name: "Clothing",
                label: "Clothing",
                value: "women-clothing",
                parent: "Women",
                children: [
                  {
                    name: "All",
                    label: "All Women's clothing",
                    value: "women-clothing",
                    parent: "Clothing",
                  },
                  {
                    name: "Shirts",
                    label: "Women's Shirts",
                    value: "women-shirts",
                    parent: "Clothing",
                    children: [
                      {
                        name: "New",
                        label: "New Arrivals",
                        value: "women-shirts-new",
                        parent: "Clothing",
                      },
                      {
                        name: "Sale",
                        label: "Women's Shirts",
                        value: "women-shirts-sale",
                        parent: "Clothing",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Sale",
                label: "Sale",
                value: "women-sale",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    select(n) {
      if (!n) {
        this.selectedState = this.root;
      } else {
        this.selectedState = n;
      }
    },
  },
  computed: {
    selected() {
      return this.selectedState === null
        ? { name: "Initialize" }
        : this.selectedState;
    },
  },
  created() {
    this.selectedState = this.root;
  },
};
</script>
