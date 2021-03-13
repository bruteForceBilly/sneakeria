import products from "@/services/products.js";

const state = () => ({
  wishes: [],
  wishedProducts: [],
});

// If a wish is removed, then fire off an remove wish action that slices array
// if a wish is added, then fire off get wished products

const getters = {
  isWished: (state) => (wish) => {
    const { productId, versionId } = wish;
    return state.wishes.map((w) => w.productId).includes(productId) &&
      state.wishes.map((w) => w.versionId).includes(versionId)
      ? true
      : false;
  },
};

const actions = {
  wish({ commit, state, getters }, wish) {
    if (getters.isWished(wish)) {
      commit("removeWish", {
        productId: wish.productId,
        versionId: wish.versionId,
      });
      commit("removeWishedProduct", {
        productId: wish.productId,
        versionId: wish.versionId,
      });
    } else {
      commit("addWish", {
        productId: wish.productId,
        versionId: wish.versionId,
      });
    }
  },
  getWishedProducts({ dispatch, commit, state }) {
    // let fetchQuery = [
    //   { "productId": 8, "versionId": 1343 },
    //   { "productId": 8, "versionId": 1344 },
    // ];

    products("fetch", state.wishes, (data) => {
      dispatch("setWishedProducts", data);
    });
  },

  setWishedProducts({ commit }, data) {
    commit("wishedProducts", data);
  },
};

const mutations = {
  wishedProducts(state, data) {
    state.wishedProducts = data;
  },
  addWish(state, wish) {
    state.wishes.push(wish);
  },
  removeWish(state, wish) {
    state.wishes = [...state.wishes].reduce((acc, cv) => {
      if (cv.productId !== wish.productId && cv.wishId !== wish.versionId) {
        acc.push(cv);
      }
      return acc;
    }, []);
  },
  removeWishedProduct(state, wish) {
    const { productId } = wish;

    // OBS!! productId is version Id something has gone wrong in how you pass the var

    state.wishedProducts = [...state.wishedProducts].filter(
      (version) => version.id != productId
    );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
