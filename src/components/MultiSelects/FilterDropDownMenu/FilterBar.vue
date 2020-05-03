<template>
  <div>
    <div class="absolute flex justify-start">
      <MenuBase
        v-for="item in selects"
        :key="item.name"
        :item="item"
      ></MenuBase>
    </div>
    <div class="absolute mt-16 flex justify-start">
      <div v-for="option in selectedOptions" :key="option.value" class="">
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
      {{ searchQueryParamsObject }}
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
          selectedOptions: [],
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
          selectedOptions: [],
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
          selectedOptions: [],
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
          selectedOptions: [],
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
          selectedOptions: [],
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
    selectedOptions() {
      return this.selects
        .map(select => select.options)
        .flat()
        .filter(option => option.checked);
    },
    searchQueryParamsObject() {
      return this.$store.state.searchQueryParamsObject;
    }
  },
  watch: {
    selects: {
      deep: true,
      handler: function(newVal, oldVal) {
        console.log("newval", newVal, "oldval", oldVal);
      }
    }
  },
  methods: {
    clickedOptionObject(name, value) {
      let o = {};
      o[name] = value;
      return o;
    },
    selectOptionsCheckToggle(arg) {
      for (let [key, value] of Object.entries(arg)) {
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
  created() {
    this.selectOptionsCheckToggle(this.searchQueryParamsObject);
    this.$store.commit("setByRoute", false);
  },
  beforeUpdate() {
    // check if data are set by route
    if (this.getSetByRoute === true) {
      // set to false
      this.selectedOptions.forEach(el =>
        !el.checked ? null : (el.checked = false)
      );
      // set data after prop
      this.selectOptionsCheckToggle(this.searchQueryParamsObject);
      // reset set by route
      this.$store.commit("setByRoute", false);
    }
  }
};
</script>
