import getCatalog from "@/services/catalog.js";

import Vue from "vue";

const state = () => ({
  catalog: null,
});

const actions = {
  catalogAction({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      getCatalog((data) => {
        commit("catalogMutation", data);

        dispatch("navigation/setSelectsAction", data, { root: true });
      })
        .then(() => {
          resolve(state.catalog);
        })
        .catch((reason) => {
          console.error("error", reason);
        });
    });
  },
};

const mutations = {
  catalogMutation(state, data) {
    Vue.set(state, "catalog", data);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
