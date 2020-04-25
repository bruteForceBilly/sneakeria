<template>
  <div>
    <slot :selects="selects"></slot>
    <span class="hidden"> {{ getSetByRoute }}</span>
    <!-- Figure out why the reactivity breaks if you dont use in template -->
  </div>
</template>

<script>
export default {
  name: "SearchFormSettings",
  props: {
    selectedOptions: {
      type: Object
    }
  },
  data() {
    return {
      selects: [
        {
          id: 1,
          name: "section",
          selectedOption: null,
          options: [
            { id: 1, name: "Men", value: "men" },
            { id: 2, name: "Women", value: "women" }
          ]
        },
        {
          id: 2,
          name: "campaigns",
          selectedOption: null,
          options: [
            { id: 1, name: "Sale", value: "sale" },
            { id: 2, name: "Essentials", value: "essentials" },
            { id: 3, name: "New Arrivals", value: "new_arrivals" }
          ]
        },
        {
          id: 3,
          name: "category",
          selectedOption: null,
          options: [
            { id: 1, name: "Shoes", value: "shoes" },
            { id: 2, name: "Shirts", value: "shirts" }
          ]
        },
        {
          id: 4,
          name: "look",
          selectedOption: null,
          options: [
            { id: 1, name: "Tennis", value: "tennis" },
            { id: 2, name: "Basketball", value: "basketball" },
            { id: 3, name: "Soccer", value: "soccer" }
          ]
        },
        {
          id: 5,
          name: "brand",
          selectedOption: null,
          options: [
            { id: 1, name: "Nike", value: "nike" },
            { id: 2, name: "Adidas", value: "adidas" },
            { id: 3, name: "Rebook", value: "rebook" },
            { id: 4, name: "Puma", value: "puma" }
          ]
        }
      ]
    };
  },
  computed: {
    getSelectedOptions() {
      let selectedOptions = {};
      this.selects
        .filter(function(select) {
          if (select.selectedOption !== null) {
            return select;
          }
        })
        .forEach(function(select) {
          return (selectedOptions[select.name] = select.selectedOption);
        });
      return selectedOptions;
    },
    getSetByRoute() {
      return this.$store.state.setByRoute;
    }
  },
  watch: {
    selects: {
      deep: true,
      handler: function(newValue, oldValue) {
        if (this.getSetByRoute === false) {
          return this.updateRouteQueryParams(this.getSelectedOptions);
        }
      }
    }
  },
  methods: {
    updateRouteQueryParams(argObj) {
      return (
        this.$router
          .push({
            name: "searchQueryRoute",
            query: argObj
          })
          // eslint-disable-next-line no-unused-vars
          .catch(err => {})
      );
    },
    updateSelectedOption(arg) {
      this.selects.forEach(function(select) {
        for (let [key, value] of Object.entries(arg)) {
          if (select.name === key) {
            select.selectedOption = value;
          }
        }
      });
    }
  },
  created() {
    this.updateSelectedOption(this.selectedOptions);
    this.$store.commit("setByRoute", false);
  },
  beforeUpdate() {
    // check if dara are set by route
    if (this.getSetByRoute === true) {
      // reset data
      this.selects.forEach(select => {
        select.selectedOption !== null ? (select.selectedOption = null) : "";
      });
      // set data after prop
      this.updateSelectedOption(this.selectedOptions);
      // reset set by route
      this.$store.commit("setByRoute", false);
    }
  }
};
</script>
