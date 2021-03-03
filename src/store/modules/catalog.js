import getCatalog from "@/services/catalog.js";

const state = () => ({
  catalogIsloading: false,
  content: null,
});

const getters = {
  product: (state) => {
    return state.catalogIsloading
      ? null
      : [...state.content]
          .filter((catalog) => catalog.name == "product")
          .map((catalog) => catalog.content)[0];
  },
  productVersion: (state) => {
    return state.catalogIsloading
      ? null
      : [...state.content]
          .filter((catalog) => catalog.name == "productVersion")
          .map((catalog) => catalog.content)[0];
  },
  operator: (state) => {
    return state.catalogIsloading
      ? null
      : [...state.content]
          .filter((catalog) => catalog.name == "operator")
          .map((catalog) => catalog.content)[0];
  },
};

const actions = {
  async catalogGetAction({ commit, state }) {
    commit("catalogLoadingMutation", true);
    return await getCatalog();
  },
  async catalogSetAction({ commit, state }, catalog) {
    commit("catalogSetMutation", catalog);
  },
  async initialize({ dispatch, commit, state }) {
    await dispatch("catalogGetAction").then(async function (catalog) {
      await dispatch("catalogSetAction", catalog);
      await commit("catalogLoadingMutation", false);
    });
    return;
  },
  toggleIndex({ commit }, { name, value }) {
    return commit("toggleElement", {
      name: name,
      value: value,
    });
  },
};

const mutations = {
  catalogLoadingMutation(state, isLoading) {
    return (state.catalogIsloading = isLoading);
  },
  catalogSetMutation(state, catalog) {
    return (state.content = catalog);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
