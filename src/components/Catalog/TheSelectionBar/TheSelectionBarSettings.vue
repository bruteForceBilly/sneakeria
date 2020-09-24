<template>
  <div>
    <slot
      :settings="{
        sorts,
        selects,
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
export default {
  name: "TheCatalogSelectionBarSettings",
  props: {
    selects: {
      type: Array,
    },
  },
  data() {
    return {
      sorts: [
        {
          id: 1,
          name: "sortBy",
          label: "Sort By",
          options: [
            {
              id: 1,
              name: "sortBy",
              label: "Price (low - high)",
              value: { sort: "PriceMax", order: "Ascending" },
              checked: false,
            },
            {
              id: 2,
              name: "sortBy",
              label: "Price (high - low)",
              value: { sort: "PriceMax", order: "Descending" },
              checked: false,
            },
          ],
        },
      ],
    };
  },
  computed: {
    selectedOptionsElements() {
      let selectedOptionsElements = this.selects
        .map((select) => select.options)
        .flat()
        .filter((option) => option.checked);
      return selectedOptionsElements;
    },
    selectedOptionsObject() {
      return this.selectedOptionsElements.reduce(function (previous, element) {
        if (element.name in previous) {
          previous[element.name] = [previous[element.name]];
          previous[element.name].push(element.value);
        } else {
          previous[element.name] = element.value;
        }
        return previous;
      }, {});
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
    clearAll() {
      return this.selectedOptionsElements.forEach((el) => (el.checked = false)); // redo for orm
    },
    clickedOptionObject(name, value) {
      let o = {};
      o[name] = value;
      return o;
    },
    selectOptionsCheckToggle(arg) {
      for (let [key, value] of Object.entries(arg)) {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            this.selects
              .map((select) => select.options)
              .flat()
              .filter((option) => option.name === key)
              .filter((option) => option.value === v)
              .forEach((el) => this.toggleElement(el));
          });
        } else {
          this.selects
            .map((select) => select.options)
            .flat()
            .filter((option) => option.name === key)
            .filter((option) => option.value === value)
            .forEach((el) => this.toggleElement(el));
        }
      }
    },
    toggleElement(el) {
      return !el.checked ? (el.checked = true) : (el.checked = false);
    },
    updateRouteQueryParams(argObj) {
      if (Object.keys(argObj).length > 0) {
        return (
          this.$router
            .push({
              name: "searchQueryRoute",
              query: argObj,
            })
            // eslint-disable-next-line no-unused-vars
            .catch((err) => {})
        );
      } else {
        return (
          this.$router
            .push({
              name: "all",
            })
            // eslint-disable-next-line no-unused-vars
            .catch((err) => {})
        );
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
        // reset set by route
        this.$store.commit("setByRoute", false);
      }
    },
  },
  watch: {
    selects: {
      deep: true,
      handler: function (newValue, oldValue) {
        //console.log(newValue);
        if (this.getSetByRoute === false) {
          //console.log("watch selects - selectedOptionsObject", this.selectedOptionsObject)
          return this.updateRouteQueryParams(this.selectedOptionsObject);
        }
      },
    },
    route: {
      deep: true,
      handler: function (newValue, oldValue) {
        return this.updateElements();
      },
    },
  },
  created() {
    if (this.$store.state.route.name === "searchResultRoute") {
      this.selectOptionsCheckToggle(this.searchQueryParamsObject);
    } else {
      this.selectOptionsCheckToggle({});
    }
    return this.$store.commit("setByRoute", false);
  },
};
</script>
