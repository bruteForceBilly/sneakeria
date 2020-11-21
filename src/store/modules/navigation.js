import Vue from "vue";

const state = () => ({
  selects: null,
});

const getters = {
  selectedOptionsElements: (state) => {
    let optionsCheked = state.selects
      .map((select) => select.options)
      .flat()
      .filter((cv) => cv.checked);
    return optionsCheked;
  },
  selectedOptionsObject: (state, getters) => {
    return getters.selectedOptionsElements.reduce(function (previous, element) {
      if (element.name in previous) {
        previous[element.name] = [previous[element.name]];
        previous[element.name].push(element.value);
      } else {
        previous[element.name] = element.value;
      }
      return previous;
    }, {});
  },
};

const actions = {
  setSelectsAction({ commit }, catalog) {
    return commit("setSelectsMutation", catalog);
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
  selectOptionsCheckToggle({ commit, state }, clickedOptionObject) {
    for (let [key, value] of Object.entries(clickedOptionObject)) {
      if (Array.isArray(value)) {
        value.forEach((cv) => {
          state.selects
            .map((select) => select.options)
            .flat()
            .filter((option) => option.name === key)
            .filter((option) => option.value === cv)
            .forEach((el) => ("toggleElement", el));
        });
      } else {
        state.selects
          .map((select) => select.options)
          .flat()
          .filter((option) => option.name === key)
          .filter((option) => option.value === value)
          .forEach((el) => commit("toggleElement", el));
      }
    }
  },
};

const mutations = {
  setSelectsMutation(state, selects) {
    //console.log("setSelectsMutation", selects);
    return Vue.set(state, "selects", selects);
  },

  clickedOptionObjectMutation(state, object) {
    return (state.clickedOption = object);
  },
  toggleElement(state, el) {
    let foundElement = state.selects
      .find((select) => select.name === el.name)
      .options.find((option) => option.value === el.value);

    return !foundElement.checked
      ? (foundElement.checked = true)
      : (foundElement.checked = false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
