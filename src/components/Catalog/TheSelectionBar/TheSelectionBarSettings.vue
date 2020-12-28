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
      console.log("updateRouteQueryParams", argObj);

      //debugger;

      if (Object.keys(argObj).length > 0) {
        // this.$router
        //   .push({ name: "searchRequestRoute", query: argObj })
        //   .catch((failure) => {});
        // eslint-disable-next-line no-unused-vars
        // let res = "";
        // for (const [key, values] of Object.entries(argObj)) {
        //   console.log(`${key}: ${values}`);
        //   values.forEach((value) => {
        //     res += `${key}=${value}&`;
        //   });
        // }
        // build Param String from argObj

        // set get by route to true
        this.$router
          .push({
            name: "searchQueryRoute",
            query: argObj,
          })
          .catch((err) => {});
      } else {
        this.$router.push({ name: "all" }).catch((err) => {});
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
    selects: {
      deep: true,
      immediate: false,
      handler: function (newValue, oldValue) {
        console.log("watcher", this.getSetByRoute, newValue, oldValue);
        if (this.getSetByRoute === false) {
          this.updateRouteQueryParams(this.selectedOptionsObject);
        }
      },
    },
    route: {
      deep: true,
      handler: function (newValue, oldValue) {
        return; //this.updateElements();
      },
    },
  },
};
</script>
