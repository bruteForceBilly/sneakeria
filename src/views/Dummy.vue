<template>
  <div>
    <pre>{{ catalog }}</pre>
  </div>
</template>

<script>
// import Category from "@/models/Category";
// import Option from "@/models/Option";
import Level from "@/models/Level";
import Catalog from "@/models/Catalog";
import Group from "@/models/Group";
import GroupLevel from "@/models/GroupLevel";

console.log(Level, Group, GroupLevel);

export default {
  name: "Dummy",
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
  computed: {
    /* categories() {
      return Category.query()
        .with("options")
        .get();
    },
    options() {
      return Option.query()
        .with("category")
        .get();
    } */
    catalog() {
      return Catalog.query()
        .with("levels.groups")
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
