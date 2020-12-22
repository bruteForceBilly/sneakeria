import getSelects from "@/services/selects.js";

const state = () => ({
  selectsIsLoading: true,
  selects: null,
});

const getters = {
  allOptions: (state) => {
    let res;
    res = state.selects.reduce(function (acc, cv) {
      const recur = (n, q) => {
        if (Object.keys(n).includes(q)) {
          acc.push(n);
        }

        if (Object.values(n).some((val) => Array.isArray(val))) {
          Object.values(n)
            .filter((val) => Array.isArray(val))
            .flat()
            .forEach((el) => recur(el, q));
        }
      };

      recur(cv, "checked");
      return acc;
    }, []);

    return res;
  },
  selectedOptionsElements: (state, getters) => {
    let res = getters.allOptions.filter((option) => option.checked);
    return res;
  },
  selectedOptionsObject: (state, getters) => {
    let res = getters.selectedOptionsElements.reduce(function (
      previous,
      element
    ) {
      if (element.name in previous) {
        //previous[element.name] = [previous[element.name]];
        previous[element.name].push(element.value);
      } else {
        previous[element.name] = [];
        previous[element.name].push(element.value);
      }
      return previous;
    },
    {});
    return res;
  },
};

const actions = {
  selectsInit({ commit, dispatch }) {
    console.log("selectsInit Action");
    commit("selectsLoadingMutation", true);
    return new Promise((resolve) => {
      getSelects((data) => {
        commit("selectsInitMutation", data);
      })
        .then((data) => {
          commit("selectsLoadingMutation", false);
          resolve(data);
        })
        .catch((err) => {
          console.log("selects init error");
        });
    });
  },
  toggleIndex({ dispatch }, { name, value }) {
    let options = {};
    options[name] = value;
    return dispatch("selectOptionsCheckToggle", options);
  },
  toggleIndexAndSuccseedors({ dispatch, getters }, index) {
    let indexSuccseedors = getters.selectedOptionsElements.splice(index + 1);
    indexSuccseedors.forEach(function (cv) {
      return dispatch("toggleIndex", {
        name: cv.name,
        value: cv.value,
      });
    });
  },
  clearAll({ commit, state, getters }) {
    return getters.selectedOptionsObject.forEach((el) =>
      commit("toggleElementMutation", el)
    );
  },
  selectOptionsCheckToggle({ commit, state, getters }, clickedOptionObject) {
    let res = {};

    if (Object.keys(clickedOptionObject).includes("product" || "version")) {
      for (const valArr of Object.values(clickedOptionObject)) {
        valArr.forEach((val) => {
          for (const [key, value] of Object.entries(val)) {
            res[key] = value;
          }
        });
      }
    } else {
      res = clickedOptionObject;
    }

    let mappedOptions = getters.allOptions.reduce(function (acc, cv) {
      for (const [key, value] of Object.entries(res)) {
        if (cv.name === key && value.includes(cv.value)) {
          acc.push(cv);
        }
      }
      return acc;
    }, []);

    return mappedOptions.forEach((el) => commit("toggleElement", el));
  },
};

const mutations = {
  clickedOptionObjectMutation(state, object) {
    return (state.clickedOption = object);
  },
  toggleElement(state, el) {
    // You have to recur to find since options can be nested now inside attr
    let foundElement = state.selects
      .find((select) => select.name === el.name)
      .options.find((option) => option.value === el.value);
    return !foundElement.checked
      ? (foundElement.checked = true)
      : (foundElement.checked = false);
  },
  selectsInitMutation(state, selects) {
    return (state.select = selects);
  },
  selectsLoadingMutation(state, selectsIsLoading) {
    return (state.selectsIsLoading = selectsIsLoading);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
