<template>
  <div class="h-screen px-4 sm:px-6 md:px-12 xl:px-16">
    <BreadCrumbsBar class="pt-8" :selects="selects"></BreadCrumbsBar>

    <DisplayTitle
      :current-route="currentRoute"
      :search-found-products-length="searchFoundProductsLength"
    ></DisplayTitle>

    <SelectionBar :selects="selects"></SelectionBar>

    <ProductGrid
      :loaded-products="loadedProducts"
      :current-route="currentRoute"
      :search-found-products-length="searchFoundProductsLength"
    ></ProductGrid>

    <LoadMoreButton
      :search-found-products-length="searchFoundProductsLength"
      :loaded-products="loadedProducts"
    ></LoadMoreButton>
  </div>
</template>

<script>
import BreadCrumbsBar from "@/components/Catalog/TheBreadCrumbsBar/BreadCrumbsBar.vue";
import SelectionBar from "@/components/Catalog/TheSelectionBar/TheSelectionBar.vue";
import DisplayTitle from "@/components/Catalog/TheDisplayTitle.vue";
import ProductGrid from "@/components/Catalog/TheProductGrid.vue";
import LoadMoreButton from "@/components/Catalog/LoadMoreButton.vue";

export default {
  name: "Catalog",
  props: ["q"],
  components: {
    BreadCrumbsBar,
    SelectionBar,
    DisplayTitle,
    ProductGrid,
    LoadMoreButton
  },
  data() {
    return {
      selects: [
        {
          id: 1,
          name: "section",
          label: "Section",
          options: [
            {
              id: 1,
              name: "section",
              label: "Men",
              value: "men",
              checked: false
            },
            {
              id: 2,
              name: "section",
              label: "Women",
              value: "women",
              checked: false
            }
          ]
        },
        {
          id: 2,
          name: "category",
          label: "Category",
          options: [
            {
              id: 1,
              name: "category",
              label: "Shoes",
              value: "shoes",
              checked: false
            },
            {
              id: 2,
              name: "category",
              label: "Clothing",
              value: "clothing",
              checked: false
            }
          ]
        },
        {
          id: 3,
          name: "campaigns",
          label: "Campaigns",
          options: [
            { id: 1, name: "campaigns", label: "Sale", value: "sale" },
            {
              id: 2,
              name: "campaigns",
              label: "Essentials",
              value: "essentials"
            },
            {
              id: 3,
              name: "campaigns",
              label: "New Arrivals",
              value: "new"
            }
          ]
        },
        {
          id: 4,
          name: "look",
          label: "Look",
          options: [
            {
              id: 1,
              name: "look",
              label: "Tennis",
              value: "tennis",
              checked: false
            },
            {
              id: 2,
              name: "look",
              label: "Basketball",
              value: "basketball",
              checked: false
            },
            {
              id: 3,
              name: "look",
              label: "Soccer",
              value: "soccer",
              checked: false
            }
          ]
        },
        {
          id: 5,
          name: "brand",
          label: "Brand",
          options: [
            {
              id: 1,
              name: "brand",
              label: "Nike",
              value: "nike",
              checked: false
            },
            {
              id: 2,
              name: "brand",
              label: "Adidas",
              value: "adidas",
              checked: false
            },
            {
              id: 3,
              name: "brand",
              label: "Rebook",
              value: "rebook",
              checked: false
            },
            {
              id: 4,
              name: "brand",
              label: "Puma",
              value: "puma",
              checked: false
            }
          ]
        }
      ]
    };
  },
  computed: {
    loadedProducts() {
      return this.$store.getters.catalogLoadedProducts;
    },
    searchFoundProductsLength() {
      if (
        this.$store.state.searchFoundProducts === null ||
        this.$store.state.searchFoundProducts.length < 1
      ) {
        return 0;
      } else {
        return this.$store.state.searchFoundProducts.length;
      }
    },
    currentRoute() {
      return this.$store.state.route;
    }
  }
};
</script>
