<template>
  <div>
    <FilterBarSettings
      :selects="selects"
      v-slot:default="{
        baseSettings
      }"
    >
      <div class="static">
        <div class="relative">
          <div
            class="border-t bg-white border-b py-1 w-full flex justify-start"
          >
            <MenuBase
              :componentSettings="baseSettings"
              v-for="item in baseSettings.selects"
              :key="item.name"
              :item="item"
            ></MenuBase>
            <MenuBase
              class="ml-auto"
              :componentSettings="baseSettings"
              :key="baseSettings.sorts.name"
              :item="baseSettings.sorts[0]"
            ></MenuBase>
          </div>
        </div>
        <div class="mt-4 flex justify-start">
          <div
            v-for="option in baseSettings.selectedOptionsElements"
            :key="option.value"
            class=""
          >
            <FilterPill
              @click.native="
                baseSettings.selectOptionsCheckToggle(
                  baseSettings.clickedOptionObject(option.name, option.value)
                )
              "
            >
              {{ option.label }}
            </FilterPill>
          </div>
          <FilterPill
            v-show="baseSettings.selectedOptionsElements.length > 0"
            link="true"
            @click.native="baseSettings.clearAll()"
            >Clear All</FilterPill
          >
        </div>
      </div>
    </FilterBarSettings>
  </div>
</template>

<script>
import MenuBase from "./FilterMenu/MenuBase.vue";
import FilterPill from "./FilterPill.vue";
import FilterBarSettings from "./FilterBarSettings.vue";

export default {
  name: "FilterBar",
  components: {
    MenuBase,
    FilterPill,
    FilterBarSettings
  },
  props: {
    selects: {
      type: Array
    }
  }

  /*
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
      return this.$store.state.searchQueryParamsObject;
      //  this.$store.state.searchQueryParamsString
    },
    getSetByRoute() {
      //console.log("getSetByRoute", this.$store.state.setByRoute)
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
  methods: {
    clearAll() {
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
  created() {
    if (this.$store.state.route.name === "searchResultRoute") {
      this.selectOptionsCheckToggle(this.searchQueryParamsObject);
    } else {
      this.selectOptionsCheckToggle({});
    }
    return this.$store.commit("setByRoute", false);
  }
  */
};
</script>
