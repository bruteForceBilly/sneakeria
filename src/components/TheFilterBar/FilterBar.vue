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
    <div class="static">
      <div class="relative">
        <div class="border-t bg-white border-b py-1 w-full flex justify-start">
          <MenuBase
            v-for="item in selects"
            :key="item.name"
            :item="item"
            :selected="selectedOptionsObject"
          ></MenuBase>
        </div>
      </div>
      <div class="mt-4 flex justify-start">
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
  </div>
</template>

<script>
import MenuBase from "./FilterMenu/MenuBase.vue";
import FilterPill from "./FilterPill.vue";

export default {
  name: "FilterBar",
  components: {
    MenuBase,
    FilterPill
  },
  props: {
    selects: {
      type: Array
    }
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
              .filter(option => option.name === key) // redo for orm
              .filter(option => option.value === v) // redo for orm
              .forEach(
                el => (!el.checked ? (el.checked = true) : (el.checked = false)) // redo for orm
              );
          });
        } else {
          this.selects
            .map(select => select.options)
            .flat()
            .filter(option => option.name === key)
            .filter(option => option.value === value)
            .forEach(
              el => (!el.checked ? (el.checked = true) : (el.checked = false)) // redo for orm
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
    console.log("prop", this.selects);
    if (this.$store.state.route.name === "searchResultRoute") {
      this.selectOptionsCheckToggle(this.searchQueryParamsObject);
    } else {
      this.selectOptionsCheckToggle({});
    }
    return this.$store.commit("setByRoute", false);
  }
};
</script>
