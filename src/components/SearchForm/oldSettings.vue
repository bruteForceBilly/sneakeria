<template>
  <div>
    <slot :selects="selects"></slot>
    prop:{{ selectedOptions }} route:{{ this.$store.state.route.params }}
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
    getSelectedOptionsFromSelectInData() {
      let resObj = {};
      this.selects
        .filter(function(select) {
          if (select.selectedOption !== null) {
            return select;
          }
        })
        .forEach(function(select) {
          return (resObj[select.name] = select.selectedOption);
        });
      return resObj;
    },
    getCurrentRouteFromStore() {
      return this.$store.state.route.path;
    }
  },
  watch: {
    /* selects: {
      deep: true,
      handler: function(newValue) {
        console.log("FORM WATCHER selects ELEMENTS");
        return this.updateRouteQueryParams(
          this.getSelectedOptionsFromSelectInData
        );
      }
    }, */
    getCurrentRouteFromStore: {
      handler: function(newValue) {
        // this.updateSelectedOption(this.selectedOptions);
      }
    },
    // this is the Prop passed rename it its confusing
    /*selectedOptions: {
      handler: function(newValue) {
        console.log("FORM WATCHER selectedOptions PROP", "newValue", newValue);
        this.updateSelectedOption(newValue);
      }
    },*/
    getSelectedOptionsFromSelectInData: {
      deep: true,
      handler: function(newValue, oldValue) {
        this.updateRouteQueryParams(newValue);
      }
    }
  },
  methods: {
    updateSelectedOption(arg) {
      if (Object.entries(arg).length > 0) {
        this.selects.forEach(function(select) {
          for (let [key, value] of Object.entries(arg)) {
            if (select.name === key) {
              select.selectedOption = value;
            }
          }
        });
      } else {
        this.selects.forEach(select => (select.selectedOption = null));
      }
    } /*
    resetAndUpdate(arg, obj) {
      let copyObj = { ...obj };
      let copyArg = { ...arg };
      // Mutate the copy of the currently selected options
      // Theu should be mutated after the passed prop
      // console log out on trigger from button
      // Mutate the data directly
    }, */,
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
    }
  },
  created() {
    this.updateSelectedOption(this.selectedOptions);
  }
};
</script>
