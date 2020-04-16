<template>
  <div class="home">
    {{ test }}
    <img alt="Vue logo" src="../assets/logo.png" />
    <hr />
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    test() {
      return this.$store.state;
    }
  }
};
</script>
