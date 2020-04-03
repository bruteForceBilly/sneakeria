<template>
  <div>
    hello form parent prop: {{ selectedOptions }}
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
          selectedOption: "null",
          options: [
            { id: 1, name: "Men", value: "men" },
            { id: 2, name: "Women", value: "women" }
          ]
        },
        {
          id: 2,
          name: "campaigns",
          selectedOption: "null",
          options: [
            { id: 1, name: "Sale", value: "sale" },
            { id: 2, name: "Essentials", value: "essentials" },
            { id: 3, name: "New Arrivals", value: "new arrivals" }
          ]
        },
        {
          id: 3,
          name: "category",
          selectedOption: null,
          options: [
            { id: 1, name: "Shoes", value: "shoe" },
            { id: 2, name: "T-shirt", value: "T-shirt" }
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
  methods: {
    updateSelectedOption() {
      let that = this;
      that.selects.forEach(function(select) {
        for (let [key, value] of Object.entries(that.selectedOptions)) {
          if (select.name === key) {
            console.log(key, value);
            select.selectedOption = value;
          }
        }
      });
    }
  },
  created() {
    this.updateSelectedOption();
  }
};
</script>
