const state = () => ({
  setting: { sort: "default", order: "default" },
  sorts: [
    {
      id: 1,
      name: "sortBy",
      label: "Sort By",
      value: null,
      inputType: "hidden",
      multiple: false,
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
        {
          id: 3,
          name: "sortBy",
          label: "Date (low - high)",
          value: { sort: "DateMax", order: "Ascending" },
          checked: false,
        },
        {
          id: 4,
          name: "sortBy",
          label: "Date (high - low)",
          value: { sort: "DateMax", order: "Descending" },
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
  settingMutation(state, formattedSettingParameters) {
    state.setting = formattedSettingParameters;
  },
};

const getters = {
  priceMax: (state, getters, rootSate, rootGetters) => {
    let copyProducts = [...rootGetters["load/products"]];
    copyProducts.forEach((product) => {
      let maxPriceObj = product.versions.reduce(
        (max, version) => (max > version.price.amountOffered ? max : version),
        null
      );
      product.maxPrice = maxPriceObj.price.amountOffered;
      return;
    });
    return copyProducts;
  },
  priceMaxAscending: (state, getters) => {
    return [...getters.priceMax].sort((b, a) => a.maxPrice - b.maxPrice);
  },
  priceMaxDescending: (state, getters) => {
    return [...getters.priceMax].sort((a, b) => a.maxPrice - b.maxPrice);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
