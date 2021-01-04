const state = () => ({
  product: {
    section: ["men", "women"],
    category: ["shoes", "clothing"],
    campaigns: ["sale", "essentials", "new"],
    productType: [
      "boots",
      "sandals",
      "sneakers",
      "hoodies",
      "t-shirts",
      "trousers",
    ],
    styleType: [
      "pullover",
      "zip-up",
      "fleece",
      "longsleeve",
      "sleeveless",
      "graphic tees",
      "chinos",
      "jeans",
      "sweat pants",
    ],
    look: ["tennis", "basketball", "fotball"],
    brand: ["nike", "adidas", "rebook", "puma"],
  },
  productVersion: {
    color: [
      "black",
      "blue",
      "gold",
      "green",
      "grey",
      "orange",
      "red",
      "silver",
      "white",
      "yellow",
    ],
  },
  operator: {
    price: ["price_gte", "price_lte"],
  },
});

const getters = {
  findByPropKey: (state) => (arr, table) => {
    console.log("schemas");
    return arr.reduce(function (acc, cv) {
      for (const key of Object.keys(state.productSchema)) {
        if (state.productSchema[key].includes(cv)) {
          acc.push({ [key]: cv });
        }
      }
      return acc;
    }, []);
  },
};

export default {
  namespaced: true,
  state,
  getters,
};
