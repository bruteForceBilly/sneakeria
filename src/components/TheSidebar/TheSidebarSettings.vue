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
            parent: "Root",
            children: [
              {
                name: "Shoes",
                parent: "Men",
                children: [
                  {
                    name: "New",
                    parent: "Shoes"
                  },
                  {
                    name: "Originals",
                    parent: "Shoes"
                  }
                ]
              },
              {
                name: "Clothing",
                parent: "Men",
                children: [
                  {
                    name: "Loungewear",
                    parent: "Clothing"
                  },
                  {
                    name: "Tracksuits",
                    parent: "Clothing"
                  }
                ]
              },
              {
                name: "Accessories",
                parent: "Men",
                children: [
                  {
                    name: "Bags",
                    parent: "Accessories",
                    children: [
                      {
                        name: "Sporty",
                        parent: "Bags"
                      },
                      {
                        name: "Party",
                        parent: "Bags"
                      }
                    ]
                  },
                  {
                    name: "Gloves",
                    parent: "Accessories"
                  }
                ]
              }
            ]
          },
          {
            name: "Women",
            parent: "Root",
            children: [
              {
                name: "Shoes",
                parent: "Women",
                children: [
                  {
                    name: "New",
                    parent: "Shoes"
                  },
                  {
                    name: "Originals",
                    parent: "Shoes"
                  }
                ]
              },
              {
                name: "Clothing",
                parent: "Women",
                children: [
                  {
                    name: "Loungewear",
                    parent: "Clothing"
                  },
                  {
                    name: "Tracksuits",
                    parent: "Clothing"
                  }
                ]
              },
              {
                name: "Accessories",
                parent: "Women",
                children: [
                  {
                    name: "Bags",
                    parent: "Accessories",
                    children: [
                      {
                        name: "Sporty",
                        parent: "Bags"
                      },
                      {
                        name: "Party",
                        parent: "Bags"
                      }
                    ]
                  },
                  {
                    name: "Gloves",
                    parent: "Accessories"
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    select(n) {
      if (!n) {
        this.selectedState = this.root;
      } else {
        this.selectedState = n;
      }
    }
  },
  computed: {
    selected() {
      return this.selectedState === null
        ? { name: "Initialize" }
        : this.selectedState;
    }
  },
  created() {
    this.selectedState = this.root;
  }
};
</script>
