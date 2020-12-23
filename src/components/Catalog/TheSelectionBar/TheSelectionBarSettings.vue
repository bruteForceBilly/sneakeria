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
        clearAll,
        clickedOptionObject,
        selectOptionsCheckToggle,
        toggleElement,
        updateRouteQueryParams,
        updateElements,
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
    ...mapActions("navigation", [
      "clearAll",
      "selectOptionsCheckToggle",
      "toggleElement",
    ]),
    clickedOptionObject(name, value) {
      let o = {};
      o[name] = value;
      //console.log("clickedOptionObject", o);
      return o;
    },
    toggleElement(el) {
      return !el.checked ? (el.checked = true) : (el.checked = false);
    },
    updateRouteQueryParams(argObj) {
      //console.log("updateRouteQueryParams", argObj);
      if (Object.keys(argObj).length > 0) {
        // this.$router
        //   .push({ name: "searchRequestRoute", query: argObj })
        //   .catch((failure) => {});
        console.log("argObj", argObj);

        // build Param String from argObj

        this.$router
          .push({
            name: "searchRequestRoute",
            params: { id: argObj },
          })
          .catch((failure) => {});
      } else {
        this.$router.push({ name: "all" }).catch((err) => {});
      }
    },
    selectsWatchHandler() {
      console.log("selectsWatchHandler");
      if (!this.getSetByRoute) {
        this.updateRouteQueryParams(this.selectedOptionsObject);
      }
    },
    updateElements() {
      //console.log("update elements", this.selectedOptionsElements)
      // check if data are set by route
      if (this.getSetByRoute === true) {
        // reset option el with false
        this.selectedOptionsElements.forEach(
          (el) => this.toggleElement(el) //!el.checked ? null : (el.checked = false)
        );
        // set data after prop
        if (this.searchQueryParamsObject === null) {
          this.selectOptionsCheckToggle({});
        } else {
          this.selectOptionsCheckToggle(this.searchQueryParamsObject);
        }
        // reset setByRoute
        this.$store.commit("setByRoute", false);
      }
    },
  },
  watch: {
    route: {
      deep: true,
      handler: function (newValue, oldValue) {
        return this.updateElements();
      },
    },
  },
  created() {
    //console.log(this.rangeSliders);
    if (this.$store.state.route.name === "searchResultRoute") {
      //console.log("created IF", this.searchQueryParamsObject);
      this.selectOptionsCheckToggle(this.searchQueryParamsObject);
    } else {
      //console.log("created ELSE");
      this.selectOptionsCheckToggle({});
    }
    return this.$store.commit("setByRoute", false);
  },
  mounted() {
    this.$watch("selects", this.selectsWatchHandler(), {
      deep: true,
    });
  },
};
</script>
