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

    <SelectionBar
      v-if="!navigationIsLoading"
      :selects="selectionbarFilters"
    ></SelectionBar>

    <ProductGrid
      :products="foundProducts"
      :current-route="route"
      :search-found-products-length="foundProductsLength"
    ></ProductGrid>

    <ThePaginationBar
      :selected-page="
        this.$store.state.search.foundProductsPagination.pageCurrent
      "
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import BreadCrumbsBar from "@/components/Catalog/TheBreadCrumbsBar/BreadCrumbsBar.vue";
import SelectionBar from "@/components/Catalog/TheSelectionBar/TheSelectionBar.vue";
import DisplayTitle from "@/components/Catalog/TheDisplayTitle.vue";
import ProductGrid from "@/components/Catalog/TheProductGrid.vue";
import ThePaginationBar from "@/components/Catalog/ThePaginationBar.vue";

export default {
  name: "Catalog",
  components: {
    BreadCrumbsBar,
    SelectionBar,
    DisplayTitle,
    ProductGrid,
    ThePaginationBar,
  },
  computed: {
    ...mapState(["route"]),
    ...mapGetters("search", [
      "queryParamsObject",
      "selectedDisplayTitle",
      "foundProducts",
    ]),
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
