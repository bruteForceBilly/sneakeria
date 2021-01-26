const state = () => ({
  stack: [],
});

const getters = {
  // Last route is current route
  currentRoute: function (state) {
    return state.stack[state.stack.length - 1] ?? "get router to here";
  },
  // Second to last is previous route
  previousRoute: function (state) {
    return state.stack[state.stack.length - 2];
  },
  hasRecords: function (state) {
    return state.stack.length > 0 ? true : false;
  },
};

// go back action that mutates the stack
const actions = {
  writeHistory({ commit, getters }, record) {
    if (record.fullPath !== getters.currentRoute.fullPath) {
      commit("pushStack", record);
    }
  },
};

const mutations = {
  resetStack(state) {
    state.stack = [];
  },

  popStack(state) {
    state.stack.pop();
  },

  pushStack(state, record) {
    state.stack.push(record);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
