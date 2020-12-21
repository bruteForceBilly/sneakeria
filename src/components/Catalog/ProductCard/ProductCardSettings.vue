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
        viewContext,
      }"
    ></slot>
  </div>
</template>
<script>
export default {
  //     view: this.$mq === "sm" || this.$mq === "md" ? "card" : "jumbo",
  props: {
    productData: Object,
    sortSetting: Object,
    viewContext: String,
  },
  data() {
    return {
      selectedVersion: {
        id: null,
      },
      likedVersions: {},
    };
  },
  computed: {
    isSelectedVersionLiked() {
      return this.likedVersions[this.selectedVersion.id];
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
    versions() {
      return this.product.versions;
    },
    selectedVersionId() {
      return this.selectedVersion.id;
    },

    versionPriceMap() {
      let map = [];
      let obj = {};

      this.versions.forEach((ver, i) =>
        map.push((obj[i] = ver.price.amountOffered))
      );

      return map;
    },

    versionWithMaxPriceIndex() {
      return this.getKeyByValue(
        this.versionPriceMap,
        Math.max(...Object.values(this.versionPriceMap))
      );
    },
    versionWithMinPriceIndex() {
      return this.getKeyByValue(
        this.versionPriceMap,
        Math.min(...Object.values(this.versionPriceMap))
      );
    },
  },
  methods: {
    getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    },

    selectHandler(version) {
      return (this.selectedVersion.id = version);
    },
    versionLinkQueryHandler() {
      if (this.selectedVersion.id == this.$store.state.route.query.versionId) {
        return;
      } else {
        this.$router.push({
          name: "product",
          params: { product: this.product.id },
          query: {
            versionId: this.selectedVersion.id,
          },
        });
      }
    },
    likeHandler() {
      return this.isSelectedVersionLiked
        ? (this.likedVersions[this.selectedVersion.id] = false)
        : (this.likedVersions[this.selectedVersion.id] = true);
    },
  },
  watch: {
    sortSetting: function (newVal, oldVal) {
      let { sort } = newVal;

      const getVersionIndex = {
        priceMin: this.versionWithMinPriceIndex,
        priceMax: this.versionWithMaxPriceIndex,
      };

      return this.selectHandler(getVersionIndex[sort]);
    },
  },
  created() {
    if (
      this.viewContext === "product" &&
      this.$store.state.route.query.versionId
    ) {
      this.selectedVersion.id = this.$store.state.route.query.versionId;
    } else {
      this.selectedVersion.id = 0;
    }
  },
  mounted() {
    this.product.versions.forEach((version) => {
      this.$set(this.likedVersions, version.id, false);
    });
  },
};
</script>
