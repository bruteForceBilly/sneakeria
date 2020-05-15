<template>
  <div>
    <pre>{{ options }}</pre>
  </div>
</template>

<script>
import Category from "@/models/Category";
import Option from "@/models/Option";

export default {
  name: "Dummy",
  mounted() {
    Category.insert({
      data: [
        {
          id: 1,
          name: "Section",
          options: [
            { id: 1, name: "Men" },
            { id: 2, name: "Women" }
          ]
        },
        {
          id: 2,
          name: "Category",
          options: [
            { id: 3, name: "Shirts" },
            { id: 4, name: "Shoes" }
          ]
        }
      ]
    });
  },
  computed: {
    categories() {
      return Category.query()
        .with("options")
        .get();
    },
    options() {
      return Option.query()
        .with("category")
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
