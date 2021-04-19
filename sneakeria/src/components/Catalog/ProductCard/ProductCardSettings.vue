<template>
  <div>
    <slot
      :settings="{
        selectHandler,
        likeHandler,
        selectedVersion,
        layout,
        isLiked,
        product,
        viewContext,
      }"
    ></slot>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

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
    };
  },
  computed: {
    ...mapState("wishlist", ["wishes"]),
    ...mapGetters("wishlist", ["isWished"]),

    layout() {
      if (this.viewContext === "catalog") {
        return "card";
      } else {
        return "jumbo";
      }
    },

    isLiked() {
      return this.wishes
        .map((wish) => wish.versionId)
        .includes(this.selectedVersion.id);
    },

    product() {
      return this.productData;
    },
    versions() {
      return this.product.versions;
    },
    selectedVersionId() {
      //return this.selectedVersion.id ? this.selectedVersion.id : null;
      return this.selectedVersion.id 
    },
    versionPrices() {
      return [...this.versions].map((version) => version.price.amountOffered);
    },
    versionPricesMax() {
      return [...this.versionPrices].reduce((acc, cv, i) => {
        if (cv === Math.max(...this.versionPrices)) {
          acc = cv;
        }
        return acc;
      }, null);
    },
    versionPricesMin() {
      return [...this.versionPrices].reduce((acc, cv, i) => {
        if (cv === Math.min(...this.versionPrices)) {
          acc = cv;
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
    likeHandler() {
      return this.$store.dispatch("wishlist/toggleWish", {
        productId: this.productData.id,
        versionId: this.selectedVersion.id,
      });
    },
    selectHandler(version) {
      return (this.selectedVersion.id = version);
    },
    getVersionIdOfPriceSort(priceSort){
      let versionPrices = [...this.versions].map((v) => v.price.amountOffered);
      let getPriceSortMinOrMax = {
        "priceMin" : Math.min(...versionPrices),
        "priceMax": Math.max(...versionPrices)
      }
      return [...this.versions].reduce((acc, cv) => {
        if(cv.price.amountOffered ===  getPriceSortMinOrMax[priceSort]) {
          return acc = cv["id"]
        }
        return acc
      })
    },
  },
  watch: {
    selectedVersionId: function(newVal, oldVal){
      console.log("selectedVersionId NEW >>", newVal, "selectedVersionId OLD >>", oldVal)
    
    },
    sortSetting: {
      deep: true,
      handler: function (newVal, oldVal) {
        let { sort } = newVal;

        const getVersionIndex = {
          priceMin: this.getVersionIdOfPriceSort(sort), 
          priceMax: this.getVersionIdOfPriceSort(sort), 
          dateMin: this.versionDatesMin,
          dateMax: this.versionDatesMax,
        };

        return this.selectHandler(getVersionIndex[sort]);
      },
    },
  },
  created() {
      this.selectedVersion.id = this.productData.versions[0].id;
  },
};
</script>