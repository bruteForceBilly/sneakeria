<template>
  <div>
    <slot
      :baseSettings="{
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
        updateElements
      }"
    ></slot>
  </div>
</template>

<script>
export default {
  name: "TheCatalogSelectionBarSettings",
  data() {
    return {
      selects: [
        {
          id: 1,
          name: "section",
          label: "Section",
          options: [
            {
              id: 1,
              name: "section",
              label: "Men",
              value: "men",
              checked: false
            },
            {
              id: 2,
              name: "section",
              label: "Women",
              value: "women",
              checked: false
            }
          ]
        },
        {
          id: 2,
          name: "category",
          label: "Category",
          options: [
            {
              id: 1,
              name: "category",
              label: "Shoes",
              value: "shoes",
              checked: false
            },
            {
              id: 2,
              name: "category",
              label: "Clothing",
              value: "clothing",
              checked: false
            }
          ]
        },
        {
          id: 3,
          name: "campaigns",
          label: "Campaigns",
          options: [
            { id: 1, name: "campaigns", label: "Sale", value: "sale" },
            {
              id: 2,
              name: "campaigns",
              label: "Essentials",
              value: "essentials"
            },
            {
              id: 3,
              name: "campaigns",
              label: "New Arrivals",
              value: "new"
            }
          ]
        },
        {
          id: 4,
          name: "look",
          label: "Look",
          options: [
            {
              id: 1,
              name: "look",
              label: "Tennis",
              value: "tennis",
              checked: false
            },
            {
              id: 2,
              name: "look",
              label: "Basketball",
              value: "basketball",
              checked: false
            },
            {
              id: 3,
              name: "look",
              label: "Soccer",
              value: "soccer",
              checked: false
            }
          ]
        },
        {
          id: 5,
          name: "brand",
          label: "Brand",
          options: [
            {
              id: 1,
              name: "brand",
              label: "Nike",
              value: "nike",
              checked: false
            },
            {
              id: 2,
              name: "brand",
              label: "Adidas",
              value: "adidas",
              checked: false
            },
            {
              id: 3,
              name: "brand",
              label: "Rebook",
              value: "rebook",
              checked: false
            },
            {
              id: 4,
              name: "brand",
              label: "Puma",
              value: "puma",
              checked: false
            }
          ]
        }
      ]
    };
  },
  computed: {
    selectedOptionsElements() {
      let selectedOptionsElements = this.selects
        .map(select => select.options)
        .flat()
        .filter(option => option.checked);
      return selectedOptionsElements;
    },
    selectedOptionsObject() {
      return this.selectedOptionsElements.reduce(function(previous, element) {
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
      // console.log(
      //   "searchQueryParamsObject",
      //   this.$store.state.searchQueryParamsObject
      // );
      return this.$store.state.searchQueryParamsObject;
      //  this.$store.state.searchQueryParamsString
    },
    getSetByRoute() {
      //console.log("getSetByRoute", this.$store.state.setByRoute);
      return this.$store.state.setByRoute;
    },
    route() {
      return this.$store.state.route;
    }
  },
  methods: {
    sortSettingsHandler(arg) {
      return this.$store.commit("catalogSortSettingMutation", arg);
    },
    clearAll() {
      //console.log("clear all", this.selectedOptionsElements);
      return this.selectedOptionsElements.forEach(el => (el.checked = false)); // redo for orm
    },
    clickedOptionObject(name, value) {
      let o = {};
      o[name] = value;
      return o;
    },
    selectOptionsCheckToggle(arg) {
      for (let [key, value] of Object.entries(arg)) {
        if (Array.isArray(value)) {
          value.forEach(v => {
            this.selects
              .map(select => select.options)
              .flat()
              .filter(option => option.name === key)
              .filter(option => option.value === v)
              .forEach(
                //el => (!el.checked ? (el.checked = true) : (el.checked = false)) // redo for orm
                el => this.toggleElement(el)
              );
          });
        } else {
          this.selects
            .map(select => select.options)
            .flat()
            .filter(option => option.name === key)
            .filter(option => option.value === value)
            .forEach(
              //el => (!el.checked ? (el.checked = true) : (el.checked = false)) // redo for orm
              el => this.toggleElement(el)
            );
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
              query: argObj
            })
            // eslint-disable-next-line no-unused-vars
            .catch(err => {})
        );
      } else {
        return (
          this.$router
            .push({
              name: "all"
            })
            // eslint-disable-next-line no-unused-vars
            .catch(err => {})
        );
      }
    },
    updateElements() {
      //console.log("update elements", this.selectedOptionsElements)
      // check if data are set by route
      if (this.getSetByRoute === true) {
        // reset option el with false
        this.selectedOptionsElements.forEach(
          el => this.toggleElement(el) //!el.checked ? null : (el.checked = false)
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
    }
  },
  watch: {
    selects: {
      deep: true,
      handler: function(newValue, oldValue) {
        //console.log(newValue);
        if (this.getSetByRoute === false) {
          //console.log("watch selects - selectedOptionsObject", this.selectedOptionsObject)
          return this.updateRouteQueryParams(this.selectedOptionsObject);
          //this.$store.commit("filterBarNoneSelectedMutation", false)
        }
      }
    },
    route: {
      deep: true,
      handler: function(newValue, oldValue) {
        return this.updateElements();
      }
    }
  },
  created() {
    if (this.$store.state.route.name === "searchResultRoute") {
      this.selectOptionsCheckToggle(this.searchQueryParamsObject);
    } else {
      this.selectOptionsCheckToggle({});
    }
    return this.$store.commit("setByRoute", false);
  }
};
</script>
