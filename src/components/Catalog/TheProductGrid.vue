<template>
  <div class="mt-8">
    <div v-if="currentRoute.name === 'all' && searchFoundProductsLength < 1">
      <h1 class="text-2xl text-gray-800">
        ...No filter is selected.
        <button @click="loadAllProducts()" class="underline">
          View all products?
        </button>
      </h1>
    </div>

    <div v-else :class="[this.$mq !== 'sm' ? 'grid' : 'grid-sm']" class="gap-6">
      <!-- Fire off event from filter bar and make a listener that set payload here -->
      <div
        v-for="product in sortSelect(catalogSortSetting)"
        :key="product.id"
        class=""
      >
        <div>
          {{ product.sortRank }}
          <ProductCard :product-data="product" view-context="catalog">
          </ProductCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/Catalog/ProductCard/ProductCardBase.vue";
import products from "@/services/products.js";

export default {
  components: {
    ProductCard
  },
  props: {
    currentRoute: {
      type: Object
    },
    searchFoundProductLength: {
      type: Number
    },
    loadedProducts: {
      type: Array
    }
  },
  data() {
    return {
      // loadProducts: false,
      sortSettings: { sort: "Default", order: "Default" }
    };
  },
  computed: {
    catalogSortSetting() {
      return this.$store.state.catalogSortSetting;
    },
    selectedVersion() {
      return this.$store.state.selectedVersion;
    },
    products() {
      return this.$store.state.searchFoundProducts === undefined
        ? ["ooops!"]
        : this.$store.state.searchFoundProducts;
    },
    loadedProductsSortedPriceMax() {
      let copyLoadedProducts = [...this.loadedProducts];
      copyLoadedProducts.forEach(product => {
        let maxPriceObj = product.versions.reduce(
          (max, version) => (max > version.price.offeredAmount ? max : version),
          null
        );
        product.maxPrice = maxPriceObj.price.offeredAmount;
        return;
      });
      return copyLoadedProducts;
    },
    loadedProductsSortedPriceMaxAscending() {
      let sortedMaxAscending = [...this.loadedProductsSortedPriceMax].sort(
        (a, b) => a.maxPrice - b.maxPrice
      );
      return sortedMaxAscending;
    },
    loadedProductsSortedPriceMaxDescending() {
      let sortedMaxDescending = [...this.loadedProductsSortedPriceMax].sort(
        (b, a) => a.maxPrice - b.maxPrice
      );
      return sortedMaxDescending;
    }
  },
  methods: {
    sortSelect({ sort, order } = { sort: "Default", order: "Default" }) {
      return sort == "Default"
        ? this.loadedProducts
        : this["loadedProductsSorted" + sort + order];
    },
    loadAllProducts() {
      products("route", this.currentRoute.name, data => {
        return this.$store.commit("searchFoundProductsMutation", data);
      });
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
