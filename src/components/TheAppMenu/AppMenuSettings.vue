<template>
  <div>
    <slot
      :selectedNavigation="selectedNavigation"
      :selectedNavigationHandler="selectedNavigationHandler"
      :featuredNavigation="featuredNavigation"
      :hoverSetShow="hoverSetShow"
      :leaveSetShow="leaveSetShow"
      :toggleSetShow="toggleSetShow"
      :navbarSlot="navbarSlot"
      ,
      :show="show"
    ></slot>
  </div>
</template>

<script>
export default {
  name: "AppMenuSettings",
  data() {
    return {
      show: false,
      featuredNavigation: [
        {
          id: 1,
          name: "section",
          label: "Men",
          value: "men",
          layout: "columns",
          groups: [
            {
              id: 1,
              label: "Men Sneakers",
              value: "men-shoes",
              categories: [
                {
                  id: 1,
                  label: "Featured Styles",
                  options: [
                    {
                      id: 1,
                      label: "New",
                      value: "men-new"
                    },
                    {
                      id: 2,
                      label: "Essential",
                      value: "men-essentials"
                    },
                    {
                      id: 3,
                      label: "Basketball",
                      value: "men-basketball"
                    },
                    {
                      id: 4,
                      label: "Tennis",
                      value: "men-tennis"
                    }
                  ]
                },
                {
                  id: 1,
                  label: "Featured Brands",
                  options: [
                    {
                      id: 1,
                      label: "Adidas",
                      value: "men-adidas"
                    },
                    {
                      id: 2,
                      label: "Nike",
                      value: "men-nike"
                    }
                  ]
                }
              ]
            },
            {
              id: 1,
              label: "Men Clothing",
              value: "men-shirts",
              categories: [
                {
                  id: 1,
                  label: "Categories",
                  options: [
                    {
                      id: 1,
                      label: "Shoes",
                      value: "men-shoes"
                    },
                    {
                      id: 2,
                      label: "Shirts",
                      value: "men-shirts"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: "section",
          label: "Women",
          value: "women",
          layout: "columns",
          groups: [
            {
              id: 3,
              label: "Women Sneakers",
              value: "women-shoes",
              categories: [
                {
                  id: 1,
                  label: "Featured Styles",
                  options: [
                    {
                      id: 1,
                      label: "New",
                      value: "women-new"
                    },
                    {
                      id: 2,
                      label: "Essential",
                      value: "women-essentials"
                    },
                    {
                      id: 3,
                      label: "Basketball",
                      value: "women-basketball"
                    },
                    {
                      id: 4,
                      label: "Tennis",
                      value: "women-tennis"
                    }
                  ]
                },
                {
                  id: 1,
                  label: "Featured Brands",
                  options: [
                    {
                      id: 2,
                      label: "Puma",
                      value: "women-puma"
                    },
                    {
                      id: 3,
                      label: "Rebook",
                      value: "women-rebook"
                    }
                  ]
                }
              ]
            },
            {
              id: 4,
              label: "Women Clothing",
              value: "women-shirts",
              categories: [
                {
                  id: 1,
                  label: "Categories",
                  options: [
                    {
                      id: 1,
                      label: "Shoes",
                      value: "women-shoes"
                    },
                    {
                      id: 2,
                      label: "Shirts",
                      value: "women-shirts"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 5,
          name: "brand",
          label: "Brands",
          value: "brand",
          layout: "index",
          groups: [
            {
              id: 6,
              label: "All brands",
              value: "all",
              categories: [
                {
                  id: 7,
                  label: "A",
                  options: [
                    {
                      id: 8,
                      label: "Adidas",
                      value: "adidas"
                    }
                  ]
                },
                {
                  id: 9,
                  label: "N",
                  options: [
                    {
                      id: 10,
                      label: "Nike",
                      value: "nike"
                    }
                  ]
                },
                {
                  id: 11,
                  label: "P",
                  options: [
                    {
                      id: 12,
                      label: "Puma",
                      value: "puma"
                    }
                  ]
                },
                {
                  id: 13,
                  label: "R",
                  options: [
                    {
                      id: 14,
                      label: "Rebook",
                      value: "rebook"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      selectedNavigation: {}
    };
  },
  methods: {
    selectedNavigationHandler(selected) {
      return (this.selectedNavigation = selected);
    },
    setByRoute(arg) {
      return this.$store.commit("setByRoute", arg);
    },
    hoverSetShow() {
      if (this.$mq === "lg" || this.$mq === "xl") return (this.show = true);
    },
    leaveSetShow() {
      console.log("leave set show");
      if (this.$mq === "lg" || this.$mq === "xl") return (this.show = false);
    },
    toggleSetShow() {
      if (this.show === false) {
        return (this.show = true);
      } else {
        return (this.show = false);
      }
    }
  },
  computed: {
    mq() {
      return this.$mq;
    },
    navbarSlot() {
      if (this.mq === "sm") {
        console.log(this.mq, "navbar--mobile");
        return "navbar--mobile";
      } else if (this.mq === "md") {
        console.log(this.mq, "navbar--mobile");
        return "navbar--mobile";
      } else {
        console.log(this.mq, "navbar--desktop");
        return "navbar--desktop";
      }
    }
  },
  watch: {
    mq() {
      return (this.show = false);
    }
  }
};
</script>
