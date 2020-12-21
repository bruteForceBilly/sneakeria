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
  },
  methods: {
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
      //let { sort } = newVal;
      //let prices = this.versions.map((version) => version.price.amountOffered);
      //let priceMaxAmountOffered = Math.max.apply(prices, prices);

      // Rename funciton to Select and Show version after sort_setting
      // this funciton selects the highest or lowest priced version to be shown in the product card

      let versionWithMaxPriceIndex = this.versions.reduce(function (
        acc,
        cv,
        i
      ) {
        if (
          !acc?.price?.amountOffered ||
          acc?.price?.amountOffered < cv.price.amountOffered
        ) {
          acc = i;
        }
        return acc;
      },
      []);

      return this.selectHandler(versionWithMaxPriceIndex);
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
