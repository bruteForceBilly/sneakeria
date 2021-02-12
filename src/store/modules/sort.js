const state = () => ({
  setting: { sort: "default", order: "default" },
  sorts: [
    {
      id: 1,
      name: "sortBy",
      label: "Sort By",
      value: null,
      inputType: "hidden",
      containerSize: "base-left",
      multiple: false,
      options: [
        {
          id: 1,
          name: "sortBy",
          label: "Price (Low - High)",
          value: { sort: "PriceMin", order: "Ascending" },
          checked: false,
        },
        {
          id: 2,
          name: "sortBy",
          label: "Price (High - Low)",
          value: { sort: "PriceMax", order: "Descending" },
          checked: false,
        },
        {
          id: 3,
          name: "sortBy",
          label: "Oldest",
          value: { sort: "DateMin", order: "Ascending" },
          checked: false,
        },
        {
          id: 4,
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
    //console.log("formattedSettingParameters", formattedSettingParameters);

    return commit("settingMutation", formattedSettingParameters);
  },
};

const mutations = {
  settingMutation(state, formattedSettingParameters) {
    state.setting = formattedSettingParameters;
  },
};

const getters = {
  dateMin: (state, getters, rootState, rootGetters) => {
    let copyProducts = [...rootGetters["load/products"]];
    copyProducts.forEach((product) => {
      const minDateObj = new Date(
        Math.min(
          ...product.versions.map((version) => new Date(version.dateRelease))
        )
      );
      const d = new Date(minDateObj);
      const yy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      const mm = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
      const dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

      product.maxDate = `${yy}-${mm}-${dd}`;
    });

    return copyProducts;
  },
  dateMinAscending: (state, getters) => {
    let sorted = [...getters.dateMin].sort(function (a, b) {
      let dateA = new Date(a.minDate);
      let dateB = new Date(b.minDate);
      return dateA - dateB;
    });
    return sorted;
  },
  dateMinDescending: (state, getters) => {
    let sorted = [...getters.dateMinAscending].reverse();
    return sorted;
  },
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
    });

    return copyProducts;
  },
  dateMaxAscending: (state, getters) => {
    let sorted = [...getters.dateMax].sort(function (a, b) {
      let dateA = new Date(a.maxDate);
      let dateB = new Date(b.maxDate);
      return dateA - dateB;
    });
    return sorted;
  },

  dateMaxDescending: (state, getters) => {
    let sorted = [...getters.dateMaxAscending].reverse();
    return sorted;
  },
  priceMin: (state, getters, rootSate, rootGetters) => {
    let copyProducts = [...rootGetters["load/products"]];

    copyProducts.forEach((product) => {
      let prices = [];
      product.versions.forEach((ver) => prices.push(ver.price.amountOffered));
      let minPrice = Math.min(...prices);
      product.minPrice = minPrice;
    });

    return copyProducts;
  },
  priceMinAscending: (state, getters) => {
    return [...getters.priceMin].sort((a, b) => a.minPrice - b.minPrice);
  },

  priceMinDescending: (state, getters) => {
    return [...getters.priceMinAscending].reverse();
  },

  priceMax: (state, getters, rootSate, rootGetters) => {
    let copyProducts = [...rootGetters["load/products"]];

    copyProducts.forEach((product) => {
      let prices = [];
      product.versions.forEach((ver) => prices.push(ver.price.amountOffered));
      let maxPrice = Math.max(...prices);
      product.maxPrice = maxPrice;
    });

    return copyProducts;
  },
  priceMaxAscending: (state, getters) => {
    return [...getters.priceMax].sort((a, b) => a.maxPrice - b.maxPrice);
  },
  priceMaxDescending: (state, getters) => {
    return [...getters.priceMaxAscending].reverse();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
