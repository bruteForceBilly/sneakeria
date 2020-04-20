<template>
  <div>
    <p>app menu settings</p>
    <slot :appMenuSettings="appMenuSettings"></slot>
  </div>
</template>

<script>
import siteMap from "@/services/siteMap.js";

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
  created() {
    this.appMenuSettings.loading = true;
    return new Promise((resolve, reject) => {
      siteMap(data => {
        this.appMenuSettings.data = data;
      })
        .then(resolve())
        .catch(reject());
    }).finally((this.appMenuSettings.loading = false));
  }
};
</script>
