<template>
  <div>
    <slot
      :settings="{
        selectHandler,
        likeHandler,
        selectedVersion,
        likedVersions,
        isSelectedVersionLiked,
        layout,
        product
      }"
    ></slot>
  </div>
</template>
<script>
export default {
  //     view: this.$mq === "sm" || this.$mq === "md" ? "card" : "jumbo",
  props: {
    productData: Object,
    viewContext: String
  },
  data() {
    return {
      selectedVersion: {
        versionId: null
      },
      likedVersions: {}
    };
  },
  computed: {
    isSelectedVersionLiked() {
      return this.likedVersions[this.selectedVersion.versionId];
    },
    layout() {
      /* if (this.viewContext === "catalog") {
        return "card";
      } else {
        return "jumbo";
      } */
      return "card";
    },
    product() {
      return this.productData;
    }
  },
  methods: {
    selectHandler(version) {
      return (this.selectedVersion.versionId = version);
    },
    likeHandler() {
      return this.isSelectedVersionLiked
        ? (this.likedVersions[this.selectedVersion.versionId] = false)
        : (this.likedVersions[this.selectedVersion.versionId] = true);
    }
  },
  created() {
    this.$store.state.route.query.versionId
      ? (this.selectedVersion.versionId = this.$store.state.route.query.versionId)
      : (this.selectedVersion.versionId = 0);
  },
  mounted() {
    this.product.versions.forEach(version => {
      this.$set(this.likedVersions, version.versionId, false);
    });
  }
};
</script>
