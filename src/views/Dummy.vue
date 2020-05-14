<template>
  <div>
    <pre>{{ result }}</pre>
  </div>
</template>

<script>
import Group from "@/models/Group";
import Category from "@/models/Category";

export default {
  name: "Dummy",
  mounted() {
    Group.insert({
      data: [
        {
          id: 1,
          name: "Section Group",
          category_ids: [1, 2, 3, 4, 5]
        },
        {
          id: 2,
          name: "Campaigns Group",
          category_ids: [2, 3, 4, 5]
        },
        {
          id: 3,
          name: "Category Group",
          category_ids: [3, 4, 5]
        },
        {
          id: 4,
          name: "Look Group",
          category_ids: [4, 5]
        },
        {
          id: 5,
          name: "Brand Group",
          category_ids: [5]
        }
      ]
    });
    Category.insert({
      data: [
        {
          id: 1,
          name: "Section",
          options: [
            {
              id: 1,
              name: "Men"
            },
            {
              id: 2,
              name: "Women"
            }
          ]
        },
        {
          id: 2,
          name: "Campaigns",
          options: [
            {
              id: 3,
              name: "New"
            },
            {
              id: 4,
              name: "Sale"
            },
            {
              id: 5,
              name: "Essentials"
            }
          ]
        },
        {
          id: 3,
          name: "Category",
          options: [
            {
              id: 6,
              name: "Shoes"
            },
            {
              id: 7,
              name: "Shirt"
            }
          ]
        },
        {
          id: 4,
          name: "Look",
          options: [
            {
              id: 8,
              name: "Tennis"
            },
            {
              id: 9,
              name: "Basketball"
            },
            {
              id: 10,
              name: "Soccer"
            }
          ]
        },
        {
          id: 5,
          name: "Brand",
          options: [
            {
              id: 11,
              name: "Adidas"
            },
            {
              id: 12,
              name: "Nike"
            },
            {
              id: 13,
              name: "Puma"
            },
            {
              id: 14,
              name: "Rebook"
            }
          ]
        }
      ]
    });
  },
  computed: {
    result() {
      return Group.query()
        .with("categories.options")
        .get();
    }
  }
};
</script>
