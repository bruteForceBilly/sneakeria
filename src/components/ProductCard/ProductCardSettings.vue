<template>
  <div>
    <slot
      :selectHandler="selectHandler"
      :likeHandler="likeHandler"
      :selectedVersion="selectedVersion"
      :likedVersions="likedVersions"
      :isSelectedVersionLiked="isSelectedVersionLiked"
    ></slot>
  </div>
</template>
<script>
export default {
  props: ["product"],
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
