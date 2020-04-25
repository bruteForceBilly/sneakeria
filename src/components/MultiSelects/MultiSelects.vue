<template>
  <div class="absolute">
    <div>
      <FilterDropDownMenu> </FilterDropDownMenu>
    </div>
  </div>
</template>

<script>
import FilterDropDownMenu from "./FilterDropDownMenu.vue";

export default {
  name: "FilterDropDownMenu",
  components: {
    FilterDropDownMenu
  },
  data() {
    return {
      filerMenus: [
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
  }
};
</script>
