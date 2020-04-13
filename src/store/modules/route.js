/* state: {
    navigation: null,
    absolutePath: null
  },
  getters: {
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
  },
  mutations: {
    setSite(state) {
      state.navigation = state;
    },
    setAbsolutePath(state) {
      state.absolutePath = state;
    }
  },

  actions: {
    setSite({ commit }) {
      commit("setSite");
    }
  },

  */
