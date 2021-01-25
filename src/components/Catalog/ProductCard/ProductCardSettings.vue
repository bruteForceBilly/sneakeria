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
      this.selectedVersion.id = 0;
    }
  },
  mounted() {
    this.product.versions.forEach((version) => {
      this.$set(this.likedVersions, version.id, false);
    });
  },
  beforeUpdate() {
    //console.log(this.versionDatesMin);
    //let prices = this.versions.map((version) => version.price.amountOffered);
  },
};
</script>
