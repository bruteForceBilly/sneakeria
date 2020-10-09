const state = () => ({
  setting: { sort: "default", order: "default" },
  sorts: [
    {
      id: 1,
      name: "sortBy",
      label: "Sort By",
      options: [
        {
          id: 1,
          name: "sortBy",
          label: "Price (low - high)",
          value: { sort: "PriceMax", order: "Ascending" },
          checked: false,
        },
        {
          id: 2,
          name: "sortBy",
          label: "Price (high - low)",
          value: { sort: "PriceMax", order: "Descending" },
          checked: false,
        },
      ],
    },
  ],
});

const actions = {
  settingAction: ({ commit }, settingParameters) => {
    const formattedSettingParameters = Object.fromEntries(
      Object.entries(settingParameters).map(([k, v]) => [
        k,
        v[0].toLowerCase() + v.slice(1),
      ])
    );
    return commit("settingMutation", formattedSettingParameters);
  },
};

const mutations = {
  settingMutation(state, arg) {
    state.setting = arg;
  },
};

const getters = {
  priceMax: (state, getters, rootSate, rootGetters) => {
    let copyProducts = [...rootGetters["load/products"]];
    copyProducts.forEach((product) => {
      let maxPriceObj = product.versions.reduce(
        (max, version) => (max > version.price.offeredAmount ? max : version),
        null
      );
      product.maxPrice = maxPriceObj.price.offeredAmount;
      return;
    });
    return copyProducts;
  },
  priceMaxAscending: (state, getters) => {
    return [...getters.priceMax].sort((a, b) => a.maxPrice - b.maxPrice);
  },
  priceMaxDescending: (state, getters) => {
    return [...getters.priceMax].sort((b, a) => a.maxPrice - b.maxPrice);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
