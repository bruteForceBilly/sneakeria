<template>
  <div class="absolute flex justify-start">
    <div v-for="item in selects" :key="item.id" class="">
      <MenuSettings v-slot:default="{ hover }">
        <MenuButton :hover="hover">
          <template v-slot:menu-label>{{ item.name }}</template>
        </MenuButton>
        <MenuOptionsContainer :hover="hover">
          <template v-slot:options>
            <MenuOption v-for="option in item.options" :key="option.id">
              <template v-slot:option-checkbox>
                <!-- Figure out how to but the model for the data higher upp so you can print it out-->
                <MenuOptionsCheckbox
                  v-model="option.checked"
                  :checked="option.checked"
                ></MenuOptionsCheckbox>
              </template>
              <template v-slot:option-label>{{ option.label }}</template>
            </MenuOption>
          </template>
        </MenuOptionsContainer>
      </MenuSettings>
    </div>
  </div>
</template>

<script>
import MenuSettings from "./MenuSettings.vue";
import MenuButton from "./MenuButton.vue";
import MenuOptionsContainer from "./MenuOptionsContainer.vue";
import MenuOption from "./MenuOption.vue";
import MenuOptionsCheckbox from "./MenuOptionsCheckbox.vue";

export default {
  name: "FilterDropDownMenu",
  components: {
    MenuSettings,
    MenuButton,
    MenuOptionsContainer,
    MenuOption,
    MenuOptionsCheckbox
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
  }
};
</script>
