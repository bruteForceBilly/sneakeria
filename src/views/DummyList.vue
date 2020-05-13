<template>
  <div>
    <h1>{{ list.title }}</h1>
    <input v-model="form.body" />
    <button @click="addItem">Add Item</button>
    <ul>
      <li v-for="item in filledList.items" :key="item.id">
        {{ item.body }} <button @click="deleteItem(item)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import List from "@/classes/List";
import Item from "@/classes/Item";

export default {
  name: "DummyList",
  props: {
    list: {
      required: true,
      type: List
    }
  },
  data() {
    return {
      form: {
        body: "",
        list_id: this.list.id
      }
    };
  },
  methods: {
    addItem() {
      Item.insert({ data: this.form });
    },
    deleteItem(item) {
      console.log(item);
      Item.delete(item.id);
    }
  },
  computed: {
    filledList() {
      return List.query()
        .with("items")
        .find(this.list.id);
    }
  }
};
</script>
