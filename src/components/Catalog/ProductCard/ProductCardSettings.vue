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
  /* eslint-disable no-unused-vars */

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
    versionPrices() {
      return [...this.versions].map((version) => version.price.amountOffered);
    },
    versionPricesMax() {
      return [...this.versionPrices].reduce((acc, cv, i) => {
        if (cv === Math.max(...this.versionPrices)) {
          acc = i;
        }
        return acc;
      }, null);
    },
    versionPricesMin() {
      return [...this.versionPrices].reduce((acc, cv, i) => {
        if (cv === Math.min(...this.versionPrices)) {
          acc = i;
        }
        return acc;
      }, null);
    },

    versionDates() {
      return [...this.versions].map((version) => new Date(version.dateRelease));
    },
    versionDatesMin() {
      let min = new Date(Math.min(...this.versionDates)).toString();
      let arr = [...this.versionDates].map((date) => date.toString());
      return arr.findIndex((el) => el == min);
    },
    versionDatesMax() {
      let max = new Date(Math.max(...this.versionDates)).toString();
      let arr = [...this.versionDates].map((date) => date.toString());
      return arr.findIndex((el) => el == max);
    },
    isSelectedVersionLiked() {
      return this.likedVersions[this.selectedVersion.id];
    },
  },
  methods: {
    likeHandler() {
      console.log("likeHandler", this.likedVersions, this.selectedVersion.id);

      this.$store.dispatch("wishlist/wish", {
        productId: this.productData.id,
        versionId: this.selectedVersion.id,
      });
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
  },
  watch: {
    sortSetting: {
      deep: true,
      handler: function (newVal, oldVal) {
        let { sort } = newVal;

        const getVersionIndex = {
          priceMin: this.versionPricesMin,
          priceMax: this.versionPricesMax,
          dateMin: this.versionDatesMin,
          dateMax: this.versionDatesMax,
        };

        return this.selectHandler(getVersionIndex[sort]);
      },
    },
  },
  created() {
    if (
      this.viewContext === "product" &&
      this.$store.state.route.query.versionId
    ) {
      this.selectedVersion.id = this.$store.state.route.query.versionId;
    } else {
      this.selectedVersion.id = Math.min(...this.productData.versionIds);
    }
  },
  mounted() {
    this.product.versionIds.forEach((versionId) => {
      this.$set(this.likedVersions, versionId, false);
    });
  },
};
</script>
