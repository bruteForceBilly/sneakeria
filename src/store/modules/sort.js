const state = () => ({
  setting: { sort: "Default", order: "Default" }
});

const actions = {
  settingAction: ({ commit }, settingParameters) => {
    // Rename option.value in sort selects component so that you dont have to use
    // this akward CapitalCasing when selecting getters
    return commit("settingMutation", settingParameters);
  }
};

const mutations = {
  settingMutation(state, arg) {
    state.setting = arg;
  }
};

const getters = {
  PriceMax: (state, getters, rootSate, rootGetters) => {
    let copyProducts = [...rootGetters["load/products"]];
    copyProducts.forEach(product => {
      let maxPriceObj = product.versions.reduce(
        (max, version) => (max > version.price.offeredAmount ? max : version),
        null
      );
      product.maxPrice = maxPriceObj.price.offeredAmount;
      return;
    });
    return copyProducts;
  },
  PriceMaxAscending: (state, getters) => {
    return [...getters.PriceMax].sort((a, b) => a.maxPrice - b.maxPrice);
  },
  PriceMaxDescending: (state, getters) => {
    return [...getters.PriceMax].sort((b, a) => a.maxPrice - b.maxPrice);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
