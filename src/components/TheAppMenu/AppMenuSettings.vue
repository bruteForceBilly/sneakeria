<template>
  <div>
    <slot :siteMapData="featuredNavigationLinks"></slot>
  </div>
</template>

<script>
export default {
  name: "AppMenuSettings",
  data() {
    return {
      // appMenuSettings: {
      //   data: null,
      //   loading: null,
      //   error: null
      // }
      featuredNavigationLinks: [
        {
          id: 1,
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
                  label: "Men Styles",
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
                  label: "Brands",
                  options: [
                    {
                      id: 1,
                      label: "Nike",
                      value: "men-nike"
                    },
                    {
                      id: 2,
                      label: "Essential",
                      value: "men-puma"
                    },
                    {
                      id: 3,
                      label: "Basketball",
                      value: "men-rebook"
                    },
                    {
                      id: 4,
                      label: "Tennis",
                      value: "men-adidas"
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
          id: 1,
          label: "Women",
          value: "women",
          layout: "columns",
          groups: [
            {
              id: 1,
              label: "Women Sneakers",
              value: "women-shoes",
              categories: [
                {
                  id: 1,
                  label: "Women Styles",
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
                  label: "Brands",
                  options: [
                    {
                      id: 1,
                      label: "Nike",
                      value: "women-nike"
                    },
                    {
                      id: 2,
                      label: "Essential",
                      value: "women-puma"
                    },
                    {
                      id: 3,
                      label: "Basketball",
                      value: "women-rebook"
                    },
                    {
                      id: 4,
                      label: "Tennis",
                      value: "women-adidas"
                    }
                  ]
                }
              ]
            },
            {
              id: 1,
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
          id: 1,
          label: "Brands",
          value: "brand",
          layout: "index",
          groups: [
            {
              id: 1,
              label: "All brands",
              value: "all",
              categories: [
                {
                  id: 1,
                  label: "A",
                  options: [
                    {
                      id: 1,
                      label: "Adidas",
                      value: "adidas"
                    }
                  ]
                },
                {
                  id: 2,
                  label: "N",
                  options: [
                    {
                      id: 1,
                      label: "Nike",
                      value: "nike"
                    }
                  ]
                },
                {
                  id: 3,
                  label: "P",
                  options: [
                    {
                      id: 1,
                      label: "Puma",
                      value: "puma"
                    }
                  ]
                },
                {
                  id: 4,
                  label: "R",
                  options: [
                    {
                      id: 1,
                      label: "Rebook",
                      value: "rebook"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    siteMapData() {
      return this.$store.state.siteMap.data;
    }
  }
};
</script>

<!-- 
  mounted() {
    this.appMenuSettings.loading = true;
    return new Promise((resolve, reject) => {
      siteMap(data => {
        this.appMenuSettings.data = data;
      })
        .then(resolve())
        .catch(reject());
    }).finally((this.appMenuSettings.loading = false));
  },

-->
