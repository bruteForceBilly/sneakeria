<template>
  <div class="h-screen px-4 sm:px-6 md:px-12 xl:px-16">
    <div class="pt-4">
      <BreadCrumbsBar :selects="selects"></BreadCrumbsBar>
    </div>
    <div class="pt-8 pb-12">
      <h1 class="text-4xl tracking-tighter font-black uppercase">
        <span
          v-if="currentRoute.name === 'all' && searchFoundProductsLength < 1"
          >All Products</span
        >
        <span
          v-else-if="
            currentRoute.name === 'all' && searchFoundProductsLength > 0
          "
          >All Products
          <span class="font-light tracking-wider text-gray-600 text-xl">
            ( {{ searchFoundProductsLength }} Products )
          </span></span
        >
        <span v-else>
          <span v-if="searchFoundProductsLength > 0">
            {{ currentRoute.path | displayPath }}
            <span class="font-light tracking-wider  text-gray-600 text-xl">
              ( {{ searchFoundProductsLength }} Products )
            </span>
          </span>
          <span v-else>
            No Products Found
          </span>
        </span>
      </h1>
    </div>

    <div class="w-full">
      <FilterBar :selects="selects"></FilterBar>
    </div>
    <div class="mt-8">
      <div v-if="currentRoute.name === 'all' && searchFoundProductsLength < 1">
        <h1 class="text-2xl text-gray-800">
          ...No filter is selected.
          <button @click="loadAllProducts()" class="underline">
            View all products?
          </button>
        </h1>
      </div>

      <div
        v-else
        :class="[this.$mq !== 'sm' ? 'grid' : 'grid-sm']"
        class="gap-6"
      >
        <div
          v-for="product in catalogLoadedProducts"
          :key="product.id"
          class=""
        >
          <div>
            <ProductCard :product-data="product" view-context="catalog">
            </ProductCard>
          </div>
        </div>
      </div>
    </div>

    <div v-if="searchFoundProductsLength > 12" class="block text-center mt-16">
      Showing {{ catalogLoadedProducts.length }} of
      {{ searchFoundProductsLength }} products <br />
      <meter
        min="0"
        :max="searchFoundProductsLength"
        :value="catalogLoadedProducts.length"
      >
      </meter>

      <button
        @click="catalogLoadCountCommit"
        class="block mx-auto mt-6 py-1 text-gray-800 font-sans font-normal text-sm px-4 no-underline bg-gray-300 btn-primary rounded-full focus:outline-none"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import BreadCrumbsBar from "@/components/TheBreadCrumbsBar/BreadCrumbsBar.vue";
import FilterBar from "@/components/TheFilterBar/FilterBar.vue";
import ProductCard from "@/components/ProductCard/ProductCardBase.vue";

import products from "@/services/products.js";

export default {
  name: "Catalog",
  props: ["q"],
  components: {
    BreadCrumbsBar,
    FilterBar,
    ProductCard
  },
  data() {
    return {
      loadProducts: false,
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
    selectedVersion() {
      return this.$store.state.selectedVersion;
    },
    catalogLoadedProducts() {
      return this.$store.getters.catalogLoadedProducts;
    },
    products() {
      return this.$store.state.searchFoundProducts === undefined
        ? ["ooops!"]
        : this.$store.state.searchFoundProducts;
      // return this.$store.state.catalogLoadedProducts === undefined
      //   ? console.log("ERROR", this.$store.state.catalogLoadedProducts)
      //   : this.$store.state.catalogLoadedProducts;
      //return this.$store.state.searchQueryParamsObject;
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
  },
  methods: {
    loadAllProducts() {
      products("route", this.currentRoute.name, data => {
        return this.$store.commit("searchFoundProductsMutation", data);
      });
    },
    catalogLoadCountCommit() {
      return this.$store.commit("catalogLoadCountMutation");
    }
  },

  filters: {
    displayPath: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.replace(/[-]/g, " ∙ ").substr(1);
    }
  }
};
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.grid-sm {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.na-enter {
  opacity: 0;
  transform: translateX(+30%);
}

.na-enter-active {
  transition: opacity 1s ease, transform 1s ease;
}
</style>
