<template>
  <div class="h-screen px-4 sm:px-6 md:px-12 xl:px-16">
    <div class="pb-6 pt-8">
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
      <FilterBar></FilterBar>
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
        <div v-for="product in products" :key="product.id" class="">
          <div>
            <ProductCard :product-data="product" view-context="catalog">
            </ProductCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterBar from "@/components/TheFilterBar/FilterBar.vue";
import ProductCard from "@/components/ProductCard/ProductCardBase.vue";

import products from "@/services/products.js";

export default {
  name: "Catalog",
  props: ["q"],
  components: {
    FilterBar,
    ProductCard
  },
  data() {
    return {
      loadProducts: false
    };
  },
  computed: {
    selectedVersion() {
      return this.$store.state.selectedVersion;
    },
    products() {
      return this.$store.state.searchFoundProducts === undefined
        ? ["ooops!"]
        : this.$store.state.searchFoundProducts;
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
