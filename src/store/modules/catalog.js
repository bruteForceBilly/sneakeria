// rename to products?

const state = () => ({
  groups: null,
});

const getters = {
  products: (state, getters, rootState, rootGetters) => {
    let end = state.count * 12 + 12;
    let result = !rootGetters["search/foundProducts"]
      ? []
      : rootGetters["search/foundProducts"].slice(0, end);
    return result;
  },
};

const mutations = {
  countIncrement(state) {
    state.count++;
  },
  countReset(state) {
    state.count = 0;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
