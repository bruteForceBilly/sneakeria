<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hr />
    loading: {{ isLoading }} <br />
    data: {{ msg }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState("siteMap", {
      msg: state => state.data,
      isLoading: state => state.loading.isLoading
    })
  }
};
</script>
