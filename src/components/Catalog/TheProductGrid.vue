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
      <div
        v-for="product in sortSelect(sortSetting)"
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
import PRODUCT_SERVICE from "@/services/products.js";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    ProductCard
  },
  props: {
    currentRoute: {
      type: Object
    },
    searchFoundProductsLength: {
      type: Number
    },
    loadedProducts: {
      type: Array
    }
  },
  computed: {
    ...mapState("sort", {
      sortSetting: state => state.setting
    }),
    ...mapGetters("sort", ["PriceMaxAscending", "PriceMaxDescending"]),
    ...mapActions("sort", {
      settingAction: state =>
        state.dispatch("settingAction", { sort: "Default", order: "Default" })
    }),
    selectedVersion() {
      return this.$store.state.selectedVersion;
    }
  },
  methods: {
    sortSelect({ sort, order } = { sort: "Default", order: "Default" }) {
      return sort == "Default" ? this.loadedProducts : this[sort + order];
    },
    loadAllProducts() {
      PRODUCT_SERVICE("route", this.currentRoute.name, data => {
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
