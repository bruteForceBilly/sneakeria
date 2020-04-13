import http from "@/services/http";

const state = {
  error: null,
  loading: null,
  data: null
};

const getters = {};

const actions = {
  getSiteMap({ commit }) {
    http.getSiteMapData(data => {
      commit("setSiteMapData", data);
    });
  },
  setSiteMapError({ commit }, error) {
    commit("setSiteMapError", error);
  },
  setSiteMapLoading({ commit }, isLoading) {
    commit("setSiteMapLoading", isLoading);
  }
};

const mutations = {
  setSiteMapData(state, data) {
    state.data = data;
  },
  setSiteMapError(state, error) {
    state.error = error;
  },
  setSiteMapLoading(state, isLoading) {
    state.loading = isLoading;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
