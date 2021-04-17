<template>
  <div>
    <slot :node="sidebar" :selected="selected" :select="select"></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheSidebarSettings",
  data() {
    return {
      selectedState: null,
    };
  },
  methods: {
    select(n) {
      if (!n) {
        this.selectedState = this.sidebar;
      } else {
        this.selectedState = n;
      }
    },
  },
  computed: {
    ...mapGetters("navigation", ["sidebar"]),
    selected() {
      return this.selectedState === null
        ? { name: "Initialize" }
        : this.selectedState;
    },
  },
  watch: {
    sidebar: {
      handler: function (sidebar) {
        return (this.selectedState = sidebar);
      },
    },
  },
};
</script>
