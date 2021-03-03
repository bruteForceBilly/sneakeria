<template>
  <div
    class="px-1 pb-24 sm:pb-64 sm:px-8 lg:px-24 xl:px-8"
    style="padding-top: 50px"
  >
    <BreadCrumbsBar v-if="this.$mq != 'sm'" />

    <DisplayTitle
      :current-route="route"
      :search-found-products-length="foundProductsPagination.contentCount"
    ></DisplayTitle>

    <!-- <div v-if="selectsIsLoading">...selection bar loading</div>
    <div v-else>
    </div> -->

    <SelectionBar
      v-if="!navigationIsLoading"
      :selects="selectionbarFilters"
    ></SelectionBar>

    <ProductGrid
      :loaded-products="products"
      :current-route="route"
      :search-found-products-length="foundProductsLength"
    ></ProductGrid>

    <LoadMoreButton
      :search-found-products-length="foundProductsLength"
      :loaded-products="products"
    ></LoadMoreButton>

    <ThePaginationBar />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import BreadCrumbsBar from "@/components/Catalog/TheBreadCrumbsBar/BreadCrumbsBar.vue";
import SelectionBar from "@/components/Catalog/TheSelectionBar/TheSelectionBar.vue";
import DisplayTitle from "@/components/Catalog/TheDisplayTitle.vue";
import ProductGrid from "@/components/Catalog/TheProductGrid.vue";
import ThePaginationBar from "@/components/Catalog/ThePaginationBar.vue";

import LoadMoreButton from "@/components/Catalog/LoadMoreButton.vue";

export default {
  name: "Catalog",
  components: {
    BreadCrumbsBar,
    SelectionBar,
    DisplayTitle,
    ProductGrid,
    LoadMoreButton,
    ThePaginationBar,
  },
  computed: {
    ...mapState(["route"]),
    ...mapGetters("load", ["products"]),
    ...mapGetters("search", ["queryParamsObject", "selectedDisplayTitle"]),
    ...mapState("search", ["foundProductsPagination", "foundProductsLength"]),

    ...mapState("navigation", ["selects", "navigationIsLoading"]),
    ...mapState("catalog", ["catalogIsLoading"]),

    ...mapGetters("navigation", ["selectionbarFilters"]),
  },
  methods: {
    ...mapActions("navigation", ["selectsInit", "navigationInitAction"]),
  },
};
</script>
