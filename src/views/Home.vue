<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hr />
    route name: {{ to.name }} <br />
    route path: {{ to.path }} <br />
    route query:
    {{ to.query }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState("route", ["to"])
  }
};
</script>
