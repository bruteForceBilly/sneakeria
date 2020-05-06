<template>
  <div>
    <slot
      :info="info"
      :ui="ui"
      :selectHandler="selectHandler"
      :likeHandler="likeHandler"
    ></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        title: "Ultra Boost",
        category: "Running",
        variantAmount: null,
        variants: [
          {
            sku: 1,
            image: require("@/assets/1.png"),
            url: "1",
            flairs: ["news"],
            liked: true,
            price: {
              currency: "EUR",
              original: 179,
              offered: 179,
              get discount() {
                let percent = Math.floor((this.offered / this.original) * 100);
                return percent < 100 ? `${percent}%` : false;
              }
            }
          },
          {
            sku: 2,
            image: require("@/assets/2.png"),
            url: "1",
            flairs: ["ocean plastic", "news"],
            liked: false,
            price: {
              currency: "EUR",
              original: 129,
              offered: 129,
              get discount() {
                let percent = Math.floor((this.offered / this.original) * 100);
                return percent < 100 ? `${percent}%` : false;
              }
            }
          },
          {
            sku: 3,
            image: require("@/assets/3.png"),
            url: "1",
            flairs: ["sale"],
            liked: false,
            price: {
              currency: "EUR",
              original: 199,
              offered: 119,
              get discount() {
                let percent = Math.floor((this.offered / this.original) * 100);
                return percent < 100 ? `${percent}%` : false;
              }
            }
          },
          {
            sku: 4,
            image: require("@/assets/4.png"),
            url: "1",
            flairs: [null],
            liked: false,
            price: {
              currency: "EUR",
              original: 169,
              offered: 109,
              get discount() {
                let percent = Math.floor((this.offered / this.original) * 100);
                return percent < 100 ? `${percent}%` : false;
              }
            }
          },
          {
            sku: 5,
            image: require("@/assets/5.png"),
            url: "1",
            flairs: [null],
            liked: false,
            price: {
              currency: "EUR",
              original: 159,
              offered: 159,
              get discount() {
                let percent = Math.floor((this.offered / this.original) * 100);
                return percent < 100 ? `${percent}%` : false;
              }
            }
          },
          {
            sku: 6,
            image: require("@/assets/6.png"),
            url: "1",
            flairs: [null],
            liked: false,
            price: {
              currency: "EUR",
              original: 129,
              offered: 129,
              get discount() {
                let percent = Math.floor((this.offered / this.original) * 100);
                return percent < 100 ? `${percent}%` : false;
              }
            }
          }
        ]
      },
      ui: {
        selectedVariant: {
          sku: null
        }
      }
    };
  },
  methods: {
    selectHandler(variant) {
      return (this.ui.selectedVariant.sku = variant);
    },
    likeHandler() {
      if (this.info.variants[this.ui.selectedVariant.sku].liked === true) {
        this.info.variants[this.ui.selectedVariant.sku].liked = false;
      } else {
        this.info.variants[this.ui.selectedVariant.sku].liked = true;
      }
    }
  },
  created() {
    this.ui.selectedVariant.sku = this.info.variants[1].sku;
  }
};
</script>
