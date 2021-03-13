import products from "@/services/products.js";

const state = () => ({
  wishes: [],
  wishedProducts: [],
});

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
    } else {
      commit("addWish", {
        productId: wish.productId,
        versionId: wish.versionId,
      });
    }
  },
  getWishedProducts({ dispatch, commit, state }) {
    let fetchQuery = [
      { "productId": 8, "versionId": 1343 },
      { "productId": 8, "versionId": 1344 },
    ];

    products("fetch", fetchQuery, (data) => {
      dispatch("setWishedProducts", data);
    });
  },

  setWishedProducts({ commit }, data) {
    console.log("data", data);
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
