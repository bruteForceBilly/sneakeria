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
    updateRouteQueryParams(...args) {
      let validatedArgs = args.reduce((acc, cv) => {
        if (Object.keys(cv).length > 0 && cv.constructor === Object) {
          acc.push(cv);
        }
        return acc;
      }, []);

      //console.log(validatedArgs);

      let queryParamsString = validatedArgs
        .filter((o) => Object.keys(o).length !== 0)
        .reduce((acc, cv) => {
          for (const [key, value] of Object.entries(cv)) {
            if (Array.isArray(value) && value.length > 1) {
              value.forEach((val) => {
                acc += `${key}=${val}&`;
              });
            } else {
              for (const [key, value] of Object.entries(cv)) {
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
      handler: function () {
        if (this.getSetByRoute === false) {
          this.updateRouteQueryParams(this.selectedOptionsObject);
        }
      },
    },
  },
};
</script>
