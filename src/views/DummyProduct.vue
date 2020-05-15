<template>
  <div>
    <pre>{{ versions }}</pre>
  </div>
</template>

<script>
import Product from "@/models/Product";
import Version from "@/models/Version";

export default {
  name: "Dummy",
  mounted() {
    Product.insert({
      data: [
        {
          id: "0",
          name: "Lexi",
          productTitle: "nike tennis shoe Lexi",
          section: "men",
          campaigns: "new arrivals",
          category: "shoe",
          look: "tennis",
          brand: "nike",
          versions: [
            {
              id: "0",
              color: "red",
              price: {
                currency: "eur",
                originalAmount: "141",
                offeredAmount: "41",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "1",
              color: "red",
              price: {
                currency: "eur",
                originalAmount: "179",
                offeredAmount: "63",
                discount: "false"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "2",
              color: "red",
              price: {
                currency: "eur",
                originalAmount: "113",
                offeredAmount: "39",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "3",
              color: "yellow",
              price: {
                currency: "eur",
                originalAmount: "104",
                offeredAmount: "26",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "4",
              color: "green",
              price: {
                currency: "eur",
                originalAmount: "171",
                offeredAmount: "74",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "5",
              color: "black",
              price: {
                currency: "eur",
                originalAmount: "103",
                offeredAmount: "93",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            }
          ]
        },
        {
          id: "1",
          name: "Hayden",
          productTitle: "nike tennis shirt Hayden",
          section: "women",
          campaigns: "new arrivals",
          category: "shirt",
          look: "tennis",
          brand: "nike",
          versions: [
            {
              id: "0",
              color: "green",
              price: {
                currency: "eur",
                originalAmount: "166",
                offeredAmount: "163",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "1",
              color: "red",
              price: {
                currency: "eur",
                originalAmount: "179",
                offeredAmount: "98",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "2",
              color: "red",
              price: {
                currency: "eur",
                originalAmount: "113",
                offeredAmount: "38",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "3",
              color: "yellow",
              price: {
                currency: "eur",
                originalAmount: "104",
                offeredAmount: "73",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "4",
              color: "green",
              price: {
                currency: "eur",
                originalAmount: "171",
                offeredAmount: "52",
                discount: "false"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            },
            {
              id: "5",
              color: "black",
              price: {
                currency: "eur",
                originalAmount: "103",
                offeredAmount: "95",
                discount: "true"
              },
              imageUrl: {
                small:
                  "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
                medium:
                  "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial"
              }
            }
          ]
        }
      ]
    });
  },
  computed: {
    products() {
      return Product.query()
        .with("versions")
        .get();
    },
    versions() {
      return Version.query()
        .with("product")
        .get();
    }
  }
};
</script>
