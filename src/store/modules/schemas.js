const state = () => ({
  product: {
    id: Number,
    section: String,
    campaigns: Array,
    category: String,
    productType: String,
    styleType: String,
    look: String,
    brand: String,
  },
  productVersion: {
    id: Number,
    productId: Number,
    dateRelease: Number,
    color: String,
    price: Object,
    sizes: Array,
    imageUrl: Object,
  },
});

const getters = {
  productEntries: (state) => {
    return Object.entries(state.product);
  },
  productVersionEntries: (state) => {
    return Object.entries(state.productVersion);
  },
};

export default {
  namespaced: true,
  state,
  getters,
};
