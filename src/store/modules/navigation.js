const state = () => ({
  selects: [
    {
      id: 1,
      name: "section",
      label: "Section",
      options: [
        {
          id: 1,
          name: "section",
          label: "Men",
          value: "men",
          checked: false,
        },
        {
          id: 2,
          name: "section",
          label: "Women",
          value: "women",
          checked: false,
        },
      ],
    },
    {
      id: 2,
      name: "category",
      label: "Category",
      options: [
        {
          id: 1,
          name: "category",
          label: "Shoes",
          value: "shoes",
          checked: false,
        },
        {
          id: 2,
          name: "category",
          label: "Clothing",
          value: "clothing",
          checked: false,
        },
      ],
    },
    {
      id: 3,
      name: "campaigns",
      label: "Campaigns",
      options: [
        { id: 1, name: "campaigns", label: "Sale", value: "sale" },
        {
          id: 2,
          name: "campaigns",
          label: "Essentials",
          value: "essentials",
        },
        {
          id: 3,
          name: "campaigns",
          label: "New Arrivals",
          value: "new",
        },
      ],
    },
    {
      id: 4,
      name: "look",
      label: "Look",
      options: [
        {
          id: 1,
          name: "look",
          label: "Tennis",
          value: "tennis",
          checked: false,
        },
        {
          id: 2,
          name: "look",
          label: "Basketball",
          value: "basketball",
          checked: false,
        },
        {
          id: 3,
          name: "look",
          label: "Soccer",
          value: "soccer",
          checked: false,
        },
      ],
    },
    {
      id: 5,
      name: "brand",
      label: "Brand",
      options: [
        {
          id: 1,
          name: "brand",
          label: "Nike",
          value: "nike",
          checked: false,
        },
        {
          id: 2,
          name: "brand",
          label: "Adidas",
          value: "adidas",
          checked: false,
        },
        {
          id: 3,
          name: "brand",
          label: "Rebook",
          value: "rebook",
          checked: false,
        },
        {
          id: 4,
          name: "brand",
          label: "Puma",
          value: "puma",
          checked: false,
        },
      ],
    },
  ],
});

const getters = {
  selectedOptionsElements: (state) => {
    return state.selects
      .map((select) => select.options)
      .flat()
      .filter((option) => option.checked);
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
