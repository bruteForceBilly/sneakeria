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
    updateRouteQueryParams(argObj) {
      //console.log("updateRouteQueryParams", argObj);

      if (Object.keys(argObj).length > 0) {
        let queryParamsString = Object.keys(argObj)
          .reduce((acc, cv) => {
            return (acc += `${cv}=${argObj[cv]}&`);
          }, "")
          .slice(0, -1);

        //console.log("queryParamsString", queryParamsString);

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
          this.updateRouteQueryParams(this.selectedOptionsObject);
        }
      },
    },
  },
};
</script>
