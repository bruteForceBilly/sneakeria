<template>
  <div class="mt-12 mb-32">
    <div v-if="currentRoute.name === 'all' && searchFoundProductsLength < 1">
      <h1 class="text-2xl text-gray-800">
        ...No filter is selected.
        <button @click="loadAllProducts()" class="underline">
          View all products?
        </button>
      </h1>
    </div>

    <div v-else :class="gridSize">
      <div v-for="product in sortSelect(sortSetting)" :key="product.id">
        <div>
          {{ product.sortRank }}
          <ProductCard
            :sort-setting="sortSetting"
            :product-data="product"
            view-context="catalog"
          >
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
    ProductCard,
  },
  props: {
    currentRoute: {
      type: Object,
    },
    searchFoundProductsLength: {
      type: Number,
    },
    products: {
      type: Array,
    },
  },
  computed: {
    ...mapState("sort", {
      sortSetting: (state) => state.setting,
    }),
    ...mapGetters("sort", [
      "priceMinAscending",
      "priceMinDescending",
      "priceMaxAscending",
      "priceMaxDescending",
      "dateMinAscending",
      "dateMinDescending",
      "dateMaxAscending",
      "dateMaxDescending",
    ]),
    ...mapActions("sort", {
      settingAction: (state) =>
        state.dispatch("settingAction", { sort: "default", order: "default" }),
    }),
    gridSize() {
      if (this.$mq === "sm") {
        return "grid-sm";
      } else if (this.$mq === "md" || this.$mq === "lg") {
        return "grid-md";
      } else if (this.$mq === "xl") {
        return "grid-lg";
      } else {
        return "grid";
      }
    },
    selectedVersion() {
      return this.$store.state.selectedVersion;
    },
  },
  methods: {
    sortSelect({ sort, order } = { sort: "default", order: "default" }) {
      if (sort == "default") {
        return this.products;
      } else {
        return this[sort + (order[0].toUpperCase() + order.slice(1))];
      }
    },
    loadAllProducts() {
      PRODUCT_SERVICE("route", this.currentRoute.name, (data) => {
        return this.$store.commit("search/foundProductsMutation", data);
      });
    },
  },
};
</script>

<style>
/*
lg 386
*/
.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(306px, 1fr));
  grid-auto-rows: auto;
  gap: 2px;
}

.grid-sm {
  display: grid;
  grid-template-columns: repeat(2, minmax(155px, 1fr));
  grid-auto-rows: auto;
  gap: 2px;
}

.grid-md {
  display: grid;
  grid-template-columns: repeat(3, minmax(155px, 1fr));
  grid-auto-rows: auto;
  gap: 2px;
}

.grid-lg {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 2px;
}

/*
.grid-sm {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
} */

.na-enter {
  opacity: 0;
  transform: translateX(+30%);
}

.na-enter-active {
  transition: opacity 1s ease, transform 1s ease;
}
</style>
