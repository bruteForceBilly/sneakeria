const state = () => ({
  count: 0,
  limit: 12
});

const getters = {
  products: (state, getters, rootState, rootGetters) => {
    let end = state.count * 12 + 12;
    let result = !rootGetters["search/searchFoundProducts"]
      ? []
      : rootGetters["search/searchFoundProducts"].slice(0, end);
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
