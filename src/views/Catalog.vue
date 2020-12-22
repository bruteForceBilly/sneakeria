<template>
  <div class="h-screen px-4 sm:px-6 md:px-12 xl:px-16">
    <BreadCrumbsBar
      class="pt-8"
      v-if="!selectsIsLoadingData"
      :selects="selectsData"
    ></BreadCrumbsBar>

    <DisplayTitle
      :current-route="route"
      :search-found-products-length="foundProductsLength"
    ></DisplayTitle>

    <SelectionBar
      v-if="!selectsIsLoadingData"
      :selects="selectsData"
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
  </div>
</template>

<script>
import BreadCrumbsBar from "@/components/Catalog/TheBreadCrumbsBar/BreadCrumbsBar.vue";
import SelectionBar from "@/components/Catalog/TheSelectionBar/TheSelectionBar.vue";
import DisplayTitle from "@/components/Catalog/TheDisplayTitle.vue";
import ProductGrid from "@/components/Catalog/TheProductGrid.vue";
import LoadMoreButton from "@/components/Catalog/LoadMoreButton.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Catalog",
  props: ["q"], // what is this doing here? remove it?
  components: {
    BreadCrumbsBar,
    SelectionBar,
    DisplayTitle,
    ProductGrid,
    LoadMoreButton,
  },
  data() {
    return {
      selectsIsLoadingData: this.selectsIsLoading,
      selectsData: null,
    };
  },
  computed: {
    ...mapGetters("load", ["products"]),
    ...mapGetters("search", ["foundProductsLength"]),
    ...mapState(["route"]),
    ...mapState("navigation", ["selectsIsLoading"]),
  },
  methods: {
    ...mapActions("navigation", ["selectsInit"]),
  },
  beforeCreate() {
    return this.$store.dispatch("navigation/selectsInit").then((data) => {
      if (!this.$store.state.navigation.selectsIsLoading) {
        return (this.selectsData = data);
      }
    });
  },
};
</script>
