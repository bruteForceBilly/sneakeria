<template>
  <div>
    Router query params passed as prop: {{ selectedOptions }}
    <slot :selects="selects"></slot>
  </div>
</template>

<script>
export default {
  name: "SearchFormSettings",
  props: ["selectedOptions"],
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
    }
  },
  methods: {
    updateSelectedOption(arg) {
      this.selects.forEach(function(select) {
        for (let [key, value] of Object.entries(arg)) {
          if (select.name === key) {
            select.selectedOption = value;
          }
        }
      });
    },
    updateRouteQueryParams(argObj) {
      return (
        this.$router
          .push({ path: "search", query: argObj })
          // eslint-disable-next-line no-unused-vars
          .catch(err => {})
      );
    }
  },
  beforeUpdate() {
    this.updateRouteQueryParams(this.getSelectedOptionsFromSelectInData);
    //this.updateSelectedOption();
  },
  created() {
    this.updateSelectedOption(this.selectedOptions);
  }
  // watch: {
  //   selects: {
  //     deep: true,
  //     immediate: false,
  //     handler(newValue) {
  //       this.updateSelectedOption(newValue);
  //     }
  //   }
  // }
};
</script>
