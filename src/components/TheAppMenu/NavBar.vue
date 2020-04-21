<template>
  <div>
    <div v-if="siteMapIsLoaded">
      <navItem link-to="/hello">Hello from render {this.test} </navItem>
    </div>
    <div v-else>
      ...loading
    </div>
  </div>
</template>
<script>
import navItem from "./NavItem.vue";
import { mapState } from "vuex";

export default {
  name: "NavBarComponent",
  components: {
    navItem
  },
  props: ["state", "featuredCategory", "featuredLink"],
  computed: mapState([
    // map this.count to store.state.count
    "siteMap"
  ]),
  data() {
    return {
      siteMapIsLoaded: false,
      siteMapData: null
    };
  },
  watch: {
    siteMap: {
      deep: true,
      handler: function(siteMap) {
        !siteMap.loading ? this.siteMapLoaded(siteMap.data) : null;
      }
    }
  },
  methods: {
    siteMapLoaded(data) {
      this.siteMapData = data;
      this.siteMapIsLoaded = false;
      this.$emit("fizz");
    },
    buzz() {
      return console.log("YAAAS");
    }
  } /*
  render: function(h) {
    return this.siteMapIsLoaded ? (
      <navItem link-to="/hello">Hello from render {this.test} </navItem>
    ) : null;
  } */
};
</script>

<style lang="postcss" scoped></style>
