<template>
  <div class="h-screen px-4 sm:px-6 md:px-12 xl:px-16">
    <!-- <BreadCrumbsBar
      class="pt-8"
      v-if="!selectsIsLoadingData"
      :selects="selectsData"
    ></BreadCrumbsBar> -->

    <DisplayTitle
      :current-route="route"
      :search-found-products-length="foundProductsLength"
    ></DisplayTitle>

    <!-- <div v-if="selectsIsLoading">...selection bar loading</div>
    <div v-else>
    </div> -->

    <SelectionBar :selects="selects"></SelectionBar>

    <ProductGrid
      :loaded-products="products"
      :current-route="route"
      :search-found-products-length="foundProductsLength"
    ></ProductGrid>

    <LoadMoreButton
      :search-found-products-length="foundProductsLength"
      :loaded-products="products"
    ></LoadMoreButton>
  </div>
</template>

<script>
//import BreadCrumbsBar from "@/components/Catalog/TheBreadCrumbsBar/BreadCrumbsBar.vue";
import SelectionBar from "@/components/Catalog/TheSelectionBar/TheSelectionBar.vue";
import DisplayTitle from "@/components/Catalog/TheDisplayTitle.vue";
import ProductGrid from "@/components/Catalog/TheProductGrid.vue";
import LoadMoreButton from "@/components/Catalog/LoadMoreButton.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Catalog",
  components: {
    //BreadCrumbsBar,
    SelectionBar,
    DisplayTitle,
    ProductGrid,
    LoadMoreButton,
  },
  computed: {
    ...mapGetters("load", ["products"]),
    ...mapGetters("search", ["foundProductsLength"]),
    ...mapGetters("navigation", ["selectsGetter"]),
    ...mapState(["route"]),
    ...mapState("navigation", ["selects"]),
  },
  methods: {
    ...mapActions("navigation", ["selectsInit"]),
  },

  beforeCreate() {
    //this.$store.dispatch("navigation/selectsInitAction");
  },
};
</script>
