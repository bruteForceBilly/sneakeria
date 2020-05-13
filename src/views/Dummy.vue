<template>
  <div>
    <ManyToManyPol></ManyToManyPol>
    <!--     <ManyToMany></ManyToMany>

    <div class="float-left border">
      {{ user.name }}
      <input class="border" v-model="form.title" />
      <button @click="addList">Add list</button>
      <List v-for="list in user.lists" :key="list.id" :list="list" />
    </div>
    <div class="float-right border">
      <ul>
        <li v-for="item in user.items" :key="item.id" v-text="item.body"></li>
      </ul>
    </div> -->
  </div>
</template>

<script>
//import User from "@/classes/User";
//import List from "@/classes/List";
//import DummyList from "./DummyList.vue";
//import ManyToMany from "./DummyManyToMany.vue";
import ManyToManyPol from "./ManyToManyPol";

export default {
  name: "Dummy",
  components: {
    //List: DummyList
    //ManyToMany,
    ManyToManyPol
  }
};
</script>
