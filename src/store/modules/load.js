const state = () => ({
  count: 0,
  limit: 12
});

const getters = {
  products: (state, getters, rootState) => {
    let end = state.count * 12 + 12;
    let result = !rootState.searchFoundProducts
      ? []
      : rootState.searchFoundProducts.slice(0, end);
    return result;
  }
};

const mutations = {
  countIncrement(state) {
    state.count++;
  },
  countReset(state) {
    state.count = 0;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
