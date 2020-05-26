<template>
  <div>
    <button v-on:click="setLevel('-', 1)">decrease 1</button>
    <p>currentIndex: {{ currentIndex }}</p>
    <button v-on:click="setLevel('+', 1)">increase 1</button>
    <br />
    {{ levels.length }}
    <div v-for="group in currentLevel.groups" :key="group.id">
      {{ group.name }}
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

export default {
  name: "Dummy",
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

                pivot: { id: 1 }
              },
              {
                id: 2,

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

                pivot: { id: 2 }
              },
              {
                id: 4,

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

                pivot: { id: 3 }
              },
              {
                id: 6,

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
        ],
        options: [
          {
            id: 1,
            name: "Men",
            pivot: { id: 1 }
          },
          {
            id: 2,
            name: "Women",
            pivot: { id: 1 }
          },
          {
            id: 3,
            name: "New",
            pivot: { id: 2 }
          },
          {
            id: 4,
            name: "Sale",
            pivot: { id: 2 }
          },
          {
            id: 5,
            name: "Shirts",
            pivot: { id: 3 }
          },
          {
            id: 6,
            name: "Shoes",
            pivot: { id: 3 }
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
    currentLevel() {
      return Level.query()
        .whereId(this.currentIndex)
        .with("groups")
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
