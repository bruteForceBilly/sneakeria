<template>
  <div>
    <slot
      :settings="{
        selectHandler,
        likeHandler,
        versionLinkQueryHandler,
        selectedVersion,
        likedVersions,
        isSelectedVersionLiked,
        layout,
        product,
        viewContext
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
      if (this.viewContext === "catalog") {
        return "card";
      } else {
        return "jumbo";
      }
    },
    product() {
      return this.productData;
    },
    selectedVersionId() {
      return this.selectedVersion.versionId;
    }
  },
  methods: {
    selectHandler(version) {
      return (this.selectedVersion.versionId = version);
    },
    versionLinkQueryHandler() {
      if (
        this.selectedVersion.versionId ==
        this.$store.state.route.query.versionId
      ) {
        return;
      } else {
        this.$router.push({
          name: "product",
          params: { product: this.product.id },
          query: {
            versionId: this.selectedVersion.versionId
          }
        });
      }
    },
    likeHandler() {
      return this.isSelectedVersionLiked
        ? (this.likedVersions[this.selectedVersion.versionId] = false)
        : (this.likedVersions[this.selectedVersion.versionId] = true);
    }
  },
  created() {
    if (
      this.viewContext === "product" &&
      this.$store.state.route.query.versionId
    ) {
      this.selectedVersion.versionId = this.$store.state.route.query.versionId;
    } else {
      this.selectedVersion.versionId = 0;
    }
  },
  mounted() {
    this.product.versions.forEach(version => {
      this.$set(this.likedVersions, version.versionId, false);
    });
  }
};
</script>
