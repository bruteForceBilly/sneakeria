<template>
  <div>
    <div class="w-full">
      <FilterBar :selects="groupsWithOptions"></FilterBar>
    </div>
    <button v-on:click="setLevel('-', 1)">decrease 1</button>
    <p>currentIndex: {{ currentIndex }}</p>
    <button v-on:click="setLevel('+', 1)">increase 1</button>
    <br />
    {{ levels.length }}
    <div v-for="group in currentLevel.groups" :key="group.id">
      {{ group.name }}
      <div v-for="option in group.options" :key="option.id">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
// import Category from "@/models/Category";
// import Option from "@/models/Option";
// eslint-disable-next-line no-unused-vars
import Level from "@/models/Level";
import Catalog from "@/models/Catalog";
// eslint-disable-next-line no-unused-vars
import Group from "@/models/Group";
// eslint-disable-next-line no-unused-vars
import GroupLevel from "@/models/GroupLevel";
import FilterBar from "@/components/TheFilterBar/FilterBar.vue";

export default {
  name: "Dummy",
  components: {
    FilterBar
  },
  data() {
    return {
      currentIndex: 1
    };
  },
  mounted() {
    Catalog.create({
      data: {
        levels: [
          {
            id: 1,
            name: "First",
            groups: [
              {
                id: 1,
                pivot: { id: 1 }
              },
              {
                id: 2,
                pivot: { id: 2 }
              },
              {
                id: 3,
                pivot: { id: 3 }
              }
            ]
          },
          {
            id: 2,
            name: "Second",
            groups: [
              {
                id: 2,
                pivot: { id: 2 }
              },
              {
                id: 3,
                pivot: { id: 3 }
              }
            ]
          },
          {
            id: 3,
            name: "Third",
            groups: [
              {
                id: 3,
                pivot: { id: 3 }
              }
            ]
          }
        ],
        groups: [
          {
            id: 1,
            name: "Section",
            options: [
              {
                id: 1,
                name: "section",
                label: "Men",
                value: "men",
                pivot: { id: 1 }
              },
              {
                id: 2,
                name: "section",
                label: "Women",
                value: "women",
                pivot: { id: 1 }
              }
            ],
            levels: [
              {
                id: 1,
                pivot: { id: 1 }
              }
            ]
          },
          {
            id: 2,
            name: "Campaign",
            options: [
              {
                id: 3,
                name: "campaigns",
                label: "Sale",
                value: "sale",
                pivot: { id: 2 }
              },
              {
                id: 4,
                name: "campaigns",
                label: "Essentials",
                value: "essentials",
                pivot: { id: 2 }
              }
            ],
            levels: [
              {
                id: 1,
                pivot: { id: 1 }
              },
              {
                id: 2,
                pivot: { id: 2 }
              }
            ]
          },
          {
            id: 3,
            name: "Category",
            options: [
              {
                id: 5,
                name: "category",
                label: "Shoes",
                value: "shoes",
                pivot: { id: 3 }
              },
              {
                id: 6,
                name: "category",
                label: "Shirts",
                value: "shirts",
                pivot: { id: 3 }
              }
            ],
            levels: [
              {
                id: 1,
                pivot: { id: 1 }
              },
              {
                id: 2,
                pivot: { id: 2 }
              },
              {
                id: 3,
                pivot: { id: 3 }
              }
            ]
          }
        ]
      }
    });
  },
  methods: {
    setLevel(o, n) {
      if (o === "+" && this.currentIndex < this.levels.length) {
        this.currentIndex += n;
      } else if (o === "-" && this.currentIndex !== 1) {
        this.currentIndex -= n;
      }
    }
  },
  computed: {
    levels() {
      return Level.all();
    },
    groupsWithOptions() {
      return Group.query()
        .with("options")
        .get();
    },
    currentLevel() {
      return Level.query()
        .whereId(this.currentIndex)
        .with("groups.options")
        .first();
    },
    catalog() {
      return Catalog.query()
        .with("levels.groups.options")
        .get();
    }
  }
};
/*

Get me all categories with their options (with their products) who belongs to a particular group

Many products has one category
Many options has one category

One category has many of any (product or option)

Options.with('categories')

Options -> categories
Products -> categories


*/
</script>
