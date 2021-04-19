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
      return arr[arr.findIndex((el) => el == min)];
    },
    versionDatesMax() {
      let max = new Date(Math.max(...this.versionDates)).toString();
      let arr = [...this.versionDates].map((date) => date.toString());
      return arr[arr.findIndex((el) => el == max)];
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
    getVersionIdOfDateSort(dateSort){

      let versionDates = this.versions.reduce((acc, cv) => {
        acc.push(cv.dateRelease)
        return acc;
      }, [])

    
      let getDateSort = {
        "dateMin": versionDates.reduce(function (a, b) { return a < b ? a : b; }),
        "dateMax": versionDates.reduce(function (a, b) { return a > b ? a : b; })
      }

      let res = [...this.versions].reduce((acc, cv) => {
        if(new Date(cv.dateRelease).getTime() === new Date(getDateSort[dateSort]).getTime()) {
          acc = cv.id
        }
        return acc
      }, null)

      return res;

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
    sortSetting: {
      deep: true,
      handler: function (newVal, oldVal) {
        let { sort } = newVal;

        const getVersionIndex = {
          priceMin: this.getVersionIdOfPriceSort(sort), 
          priceMax: this.getVersionIdOfPriceSort(sort), 
          dateMin: this.getVersionIdOfDateSort(sort), //this.versionDatesMin,
          dateMax: this.getVersionIdOfDateSort(sort) //this.versionDatesMax,
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