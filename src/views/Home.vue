<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hr />
    route name: {{ name }} route path: {{ path }} route query: {{ query }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState("route", ["name", "path", "query"])
  }
};
</script>
