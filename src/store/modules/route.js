const state = {
  to: {
    name: null,
    meta: null,
    path: null,
    query: null,
    params: null,
    fullpath: null
  }
};

const getters = {
  toPathAsArray: state => {
    return state.to.path.substr(1).split("-");
  }
};

const actions = {
  setRouteTo({ commit }, to) {
    commit("setRouteTo", to);
  }
};

const mutations = {
  setRouteTo(state, to) {
    const { name, meta, path, query, params, fullPath } = to;
    state.to.name = name;
    state.to.meta = meta;
    state.to.path = path;
    state.to.query = query;
    state.to.params = params;
    state.to.fullPath = fullPath;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
