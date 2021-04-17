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
  toggleWish({ commit, state, getters, dispatch }, wish) {
    if (getters.isWished(wish)) {
      dispatch("removeWish", wish);
    } else {
      dispatch("addWish", wish);
    }
  },

  removeWish({ commit, state }, wish) {
    commit("removeWish", wish);
    commit("removeWishedProduct", wish);
  },

  addWish({ dispatch, commit, state }, wish) {
    commit("addWish", wish);
  },

  getWishedProducts({ dispatch, commit, state }) {
    if (state.wishes.length === 0) return;
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
    const { versionId } = wish;
    state.wishedProducts = [...state.wishedProducts].filter(
      (version) => version.id != versionId
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
