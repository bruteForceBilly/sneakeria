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
    updateRouteQueryParams(...args) {
      let queryParamsString = args
        .filter((o) => Object.keys(o).length !== 0)
        .reduce((acc, cv) => {
          for (const [key, value] of Object.entries(cv)) {
            if (Array.isArray(value) && value.length > 1) {
              value.forEach((val) => {
                acc += `${key}=${val}&`;
              });
            } else {
              for (const [key, value] of Object.entries(cv)) {
                console.log("else", key, value.length);

                if (value.length > 1) {
                  value.forEach((val) => {
                    acc += `${key}=${val}&`;
                  });
                } else {
                  acc += `${key}=${value}&`;
                }
              }
            }
            return acc;
          }
        }, "")
        .slice(0, -1);

      console.log("args", args, "queryParamsString", queryParamsString);

      if (!queryParamsString) {
        this.$router.push({ name: "all" }).catch((err) => {});
      } else {
        this.$router.push("search?" + queryParamsString).catch((err) => {});
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
