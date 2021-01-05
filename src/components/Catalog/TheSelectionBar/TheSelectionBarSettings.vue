<template>
  <div>
    <slot
      :settings="{
        sorts,
        selects,
        rangeSliders,
        selectedOptionsElements,
        selectedOptionsObject,
        searchQueryParamsObject,
        getSetByRoute,
        route,
        selectOptionsCheckToggle,
        updateRouteQueryParams,
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
    ...mapState("navigation", ["selectsIsLoading"]),
    ...mapState("route", ["query"]),

    ...mapGetters("navigation", [
      "selectedOptionsElements",
      "selectedOptionsObject",
    ]),
    sorts() {
      return this.$store.state.sort.sorts;
    },
    rangeSliders() {
      return this.$store.state.range.ranges;
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
    updateRouteQueryParams(argObj, operator = null) {
      //console.log("updateRouteQueryParams", argObj, "operator", operator);

      let params = { ...argObj, ...operator };

      let queryParamsString;

      if (Object.keys(params).length > 0) {
        queryParamsString += Object.keys(params)
          .reduce((acc, cv) => {
            return (acc += `${cv}=${params[cv]}&`);
          }, "")
          .slice(0, -1);
        this.$router.push("search?" + queryParamsString).catch((err) => {});
      } else {
        this.$router.push({ name: "all" }).catch((err) => {});
      }
    },
  },
  watch: {
    selects: {
      deep: true,
      immediate: false,
      handler: function (newValue, oldValue) {
        if (this.getSetByRoute === false) {
          this.updateRouteQueryParams(this.selectedOptionsObject, this.query);
        }
      },
    },
  },
};
</script>
