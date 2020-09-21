const state = () => ({
  setting: { sort: "Default", order: "Default" },
  sortedProducts: {} // and the getter loadedProducts?
});

// Dispatch action with settings in payload -- Check Sort select
// Sort products in function
// Commit mutation to sortedProducts
// Only return the state in product grid

const actions = {
  settingAction: ({ commit }, settingParameters) => {
    // create new let assign a copy the products getter below
    // Do crap that sorts the copy of getter
    // commit the sorted
    // rename to sortAction

    function selectSort(
      { sort, order } = { sort: "Default", order: "Default" }
    ) {
      const sortSettingsLookupObject = {
        priceMax: {
          Ascending: () => {
            return [...getters.priceMax].sort(
              (a, b) => a.maxPrice - b.maxPrice
            );
          },
          Descending: () => {
            return [...getters.priceMax].sort(
              (b, a) => a.maxPrice - b.maxPrice
            );
          }
        }
      };
      return sortSettingsLookupObject.sort.order;
    }

    return commit("sortedProductsMutation", selectSort(settingParameters));
  }
};

const mutations = {
  settingMutation(state, arg) {
    state.setting = arg;
  },
  sortedProductsMutation(state, arg) {
    state.sortedProducts = arg;
  }
};

const getters = {
  products: (state, getters, rootSate, rootGetters) => {
    return rootGetters["load/products"];
  },
  priceMax: () => {
    let copyProducts = [...getters.products];
    copyProducts.forEach(product => {
      let maxPriceObj = product.versions.reduce(
        (max, version) => (max > version.price.offeredAmount ? max : version),
        null
      );
      product.maxPrice = maxPriceObj.price.offeredAmount;
      return;
    });
    return copyProducts;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
