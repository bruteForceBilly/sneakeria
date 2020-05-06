<template>
  <div>
    <!-- <ul class="list-disc bg-yellow-200">
      <li>route {{ this.$store.state.route }}</li>
      <li>setByRoute {{ this.$store.state.setByRoute }}</li>
      <li>
        searchRouteLastBeforeEnter
        {{ this.$store.state.searchRouteLastBeforeEnter }}
      </li>
      <li>
        searchQueryParamsObject {{ this.$store.state.searchQueryParamsObject }}
      </li>
      <li>
        searchQueryParamsString {{ this.$store.state.searchQueryParamsString }}
      </li>
    </ul> -->
    <div class="absolute flex justify-start">
      <MenuBase
        v-for="item in selects"
        :key="item.name"
        :item="item"
        :selected="selectedOptionsObject"
      ></MenuBase>
    </div>
    <div class="absolute mt-16 flex justify-start">
      <div
        v-for="option in selectedOptionsElements"
        :key="option.value"
        class=""
      >
        <FilterPill
          @click.native="
            selectOptionsCheckToggle(
              clickedOptionObject(option.name, option.value)
            )
          "
        >
          {{ option.label }}
        </FilterPill>
      </div>
      <FilterPill
        v-show="selectedOptionsElements.length > 0"
        link="true"
        @click.native="clearAll()"
        >Clear All</FilterPill
      >
    </div>
  </div>
</template>

<script>
import MenuBase from "@/components/MultiSelects/FilterDropDownMenu/MenuBase.vue";
import FilterPill from "@/components/MultiSelects/FilterDropDownMenu/FilterPill.vue";

export default {
  name: "FilterBar",
  components: {
    MenuBase,
    FilterPill
  },
  data() {
    return {
      selects: [
        {
          id: 1,
          name: "section",
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
          name: "campaigns",
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
              value: "new_arrivals"
            }
          ]
        },
        {
          id: 3,
          name: "category",
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
              label: "Shirts",
              value: "shirts",
              checked: false
            }
          ]
        },
        {
          id: 4,
          name: "look",
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
      return this.selects
        .map(select => select.options)
        .flat()
        .filter(option => option.checked);
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
      return this.$store.state.searchQueryParamsObject;
      //  this.$store.state.searchQueryParamsString
    },
    getSetByRoute() {
      return this.$store.state.setByRoute;
    },
    route() {
      return this.$store.state.route;
    }
  },
  watch: {
    selects: {
      deep: true,
      handler: function(newValue, oldValue) {
        if (this.getSetByRoute === false) {
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
  methods: {
    clearAll() {
      return this.selectedOptionsElements.forEach(el => (el.checked = false));
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
              .forEach(el =>
                !el.checked ? (el.checked = true) : (el.checked = false)
              );
          });
        } else {
          this.selects
            .map(select => select.options)
            .flat()
            .filter(option => option.name === key)
            .filter(option => option.value === value)
            .forEach(el =>
              !el.checked ? (el.checked = true) : (el.checked = false)
            );
        }
      }
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
      // check if data are set by route
      if (this.getSetByRoute === true) {
        // reset option el with false
        this.selectedOptionsElements.forEach(el =>
          !el.checked ? null : (el.checked = false)
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
