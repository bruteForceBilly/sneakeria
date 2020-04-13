const state = {
  // absolutePath: null
  name: null,
  meta: null,
  path: null,
  query: null,
  params: null,
  fullpath: null
};

/*
const getters = {
  // make absolute path getter
  absolutePathAsArray: absolutePath => {
    return absolutePath.substr(1).split("-");
  },
  absolutePathAsObject: (state, getters) => {
    let res = {};
    let arr = [];
    getters.absolutePathAsArray.forEach(function(pathItem) {
      state.navigation.filter(function(obj) {
        if (obj.values.includes(pathItem)) {
          arr.push((res[obj.name] = pathItem));
        }
      });
    });
    return res;
  }
}; */

const actions = {
  setRouteTo({ commit }, to) {
    commit("setRouteTo", to);
  }
};

const mutations = {
  setRouteTo(state, to) {
    const { name, meta, path, query, params, fullPath } = to;
    state.name = name;
    state.meta = meta;
    state.path = path;
    state.query = query;
    state.params = params;
    state.fullPath = fullPath;
  }
};

export default {
  namespaced: true,
  state,
  //getters,
  actions,
  mutations
};
