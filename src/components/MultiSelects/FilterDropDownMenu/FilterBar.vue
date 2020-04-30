<template>
  <div>
    <div class="absolute flex justify-start">
      <MenuBase
        v-for="item in selects"
        :key="item.name"
        :item="item"
      ></MenuBase>
    </div>
    <div class="absolute mt-12 flex justify-start">
      <div v-for="option in selectedOptions" :key="option.value" class="">
        <button
          class="py-2 px-4 no-underline rounded-full bg-gray-300 text-black font-sans font-semibold text-sm btn-primary focus:outline-none mr-2"
        >
          {{ option.label }}
          <span class="font-thin">x</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MenuBase from "@/components/MultiSelects/FilterDropDownMenu/MenuBase.vue";

export default {
  name: "FilterBar",
  components: {
    MenuBase
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
              checked: true
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
      let arr = [];
      this.selects.forEach(select =>
        select.options.forEach(option =>
          option.checked ? arr.push(option) : null
        )
      );
      return arr;
    }
  }
};
</script>
