<template>
  <div>
    <slot :siteMapData="siteMapData"></slot>
  </div>
</template>

<script>
export default {
  name: "AppMenuSettings",
  data() {
    return {
      appMenuSettings: {
        data: null,
        loading: null,
        error: null
      }
    };
  },
  computed: {
    siteMapData() {
      return this.$store.state.siteMap.data;
    }
  }
};
</script>

<!-- 
  mounted() {
    this.appMenuSettings.loading = true;
    return new Promise((resolve, reject) => {
      siteMap(data => {
        this.appMenuSettings.data = data;
      })
        .then(resolve())
        .catch(reject());
    }).finally((this.appMenuSettings.loading = false));
  },

-->
