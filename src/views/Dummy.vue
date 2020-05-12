<template>
  <div>
    <div>
      <ul v-for="list in user.lists" :key="list.id">
        {{
          list.title
        }}
        <li v-for="item in list.items" :key="item.id">{{ item.body }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import User from "@/classes/User";

export default {
  name: "Dummy",
  beforeMount() {
    User.insert({
      data: [
        {
          id: 28,
          name: "luke",
          email: "luke@luksson.com",
          lists: [
            {
              id: 23,
              title: "favourites",
              items: [
                { id: 11, body: "banan" },
                { id: 12, body: "apple" }
              ]
            },
            {
              id: 24,
              title: "carted",
              items: [
                { id: 13, body: "pear" },
                { id: 14, body: "mango" }
              ]
            }
          ]
        }
      ]
    });
  },
  computed: {
    user() {
      return User.query()
        .with("lists.items")
        .find(28);
    }
  }
};
</script>
