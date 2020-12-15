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
          label: "Newest",
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
  dateMax: (state, getters, rootState, rootGetters) => {
    let copyProducts = [...rootGetters["load/products"]];
    copyProducts.forEach((product) => {
      const maxDateObj = new Date(
        Math.max(
          ...product.versions.map((version) => new Date(version.dateRelease))
        )
      );
      const d = new Date(maxDateObj);
      const yy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      const mm = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
      const dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

      product.maxDate = `${yy}-${mm}-${dd}`;
      return;
    });
  },
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
