<template>
  <div>
    <slot
      :settings="{
        selectionbarFilters,
        selectionbarSorts,
        selectionbarRanges,
        selectedOptionsElements,
        selectedOptionsObject,
        searchQueryParamsObject,
        getSetByRoute,
        route,
        selectOptionsCheckToggle,
        updateRouteQueryParams,
        navigationIsloading,
      }"
    ></slot>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "TheCatalogSelectionBarSettings",
  props: {
    selects: {
      type: Array,
    },
  },
  computed: {
    ...mapState("navigation", ["selectsIsLoading", "navigationIsloading"]),
    ...mapState("route", ["query"]),

    ...mapGetters("navigation", [
      "selectionbarFilters",
      "selectionbarSorts",
      "selectionbarRanges",
      "selectedOptionsElements",
      "selectedOptionsObject",
    ]),
    sorts() {
      return this.$store.state.sort.sorts;
    },
    searchQueryParamsObject() {
      return this.$store.state.search.queryParamsObject;
    },
    getSetByRoute() {
      return this.$store.state.setByRoute;
    },
    route() {
      return this.$store.state.route;
    },
  },
  methods: {
    ...mapActions("navigation", ["selectOptionsCheckToggle"]),
    updateRouteQueryParams(selectedOptionsObject) {
      let queryParams = [];

      for (const [key, value] of Object.entries({
        ...selectedOptionsObject,
        ...this.$store.state.route.query,
      })) {
        
        if (Array.isArray(value)) {
          value.forEach((val) => queryParams.push(`${key}=${val}`));
        } else {
          queryParams.push(`${key}=${value}`);
        }
      }

      let queryParamsString = queryParams.toString().replace(/,/g, "&");

      if (queryParams.length === 0) {
        this.$router.push({ name: "all" }).catch((err) => {});
      } else {
        if (this.$store.state.route.query) {
          this.$store.commit("search/routeLastDisplayQueryMutation", true);
        }
        this.$router.push("search?" + queryParamsString).catch((err) => {});
      }
    },
  },
  watch: {
    selects: {
      deep: true,
      immediate: false,
      handler: function () {
        if (this.getSetByRoute === false) {
          this.updateRouteQueryParams(this.selectedOptionsObject);
        }
      },
    },
  },
};
</script>
