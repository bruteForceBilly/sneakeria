import getSelects from "@/services/selects.js";
import getNavigation from "@/services/navigation.js";

const state = () => ({
  selectsIsLoading: false,
  navigationIsLoading: false,
  mobile: [
    {
      label: "Filter By",
      value: "FilterSelects",
      menus: ["FilterSelects", "RangeSelects"],
    },
    {
      label: "Sort By",
      value: "SortSelects",
      menus: ["SortSelect"],
    },
  ],
  header: null,
  sidebar: null,
  selectionbar: null,
});

const getters = {
  headerLinks: (state) => {
    return state.header
      ? state.header.menuContent.reduce((acc, cv) => {
          if (cv.name === "links") {
            acc = cv.items;
          }
          return acc;
        }, {})
      : null;
  },
  headerIcons: (state) => {
    return state.header
      ? state.header.menuContent.reduce((acc, cv) => {
          if (cv.name === "icons") {
            acc = cv.items;
          }
          return acc;
        }, {})
      : null;
  },
  sidebar: (state) => {
    return state.sidebar ? state.sidebar.menuContent[0] : {};
  },
  selectionbarGetter: (state) => {
    return state.selectionbar ? state.selectionbar.menuContent : [];
  },

  selectsGetter: (state) => {
    return state.selects;
  },
  allOptions: (state) => {
    let res;
    // if selects are not there return empty array
    if (state.selectsIsLoading || !state.selects) {
      res = [];
    } else {
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
    }

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
  async selectsGetAction({ commit, state }) {
    commit("selectsLoadingMutation", true);
    return await getSelects();
  },
  async selectsSetAction({ commit, state }, selects) {
    commit("selectsSetMutation", selects);
  },
  async selectsInitAction({ dispatch, commit, state }) {
    await dispatch("selectsGetAction").then(async function (selects) {
      await dispatch("selectsSetAction", selects);
      commit("selectsLoadingMutation", false);
    });
  },

  async navigationGetAction({ commit, state }, menuName) {
    // you need query param so json server can filter
    commit("navigationLoadingMutation", true);
    return await getNavigation(menuName);
  },
  async navigationSetAction({ commit, state }, navigation) {
    // Set mutation depending on query param
    // if query is "header" then set headerSetMutation
    console.log("nav store", navigation);

    const { menuName } = navigation;

    if (menuName == "header") {
      commit("headerSetMutation", navigation);
    } else if (menuName == "sidebar") {
      commit("sidebarSetMutation", navigation);
    } else if (menuName == "selectionbar") {
      commit("selectionbarSetMutation", navigation);
    } else {
      console.error("navigationSetAction Menu Not Found");
    }
  },
  async navigationInitAction({ dispatch, commit, state }, menuName) {
    // Should take query param
    await dispatch("navigationGetAction", menuName).then(async function (
      navigation
    ) {
      await dispatch("navigationSetAction", navigation);
      commit("navigationLoadingMutation", false);
    });
  },
  toggleIndex({ commit }, { name, value }) {
    return commit("toggleElement", {
      name: name,
      value: value,
    });
  },
  toggleIndexAndSuccseedors({ commit, getters }, index) {
    let indexSuccseedors = getters.selectedOptionsElements.splice(index + 1);

    indexSuccseedors.forEach(function (cv) {
      return commit("toggleElement", {
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
  selectOptionsCheckToggle(
    { commit, state, getters, rootState },
    queryParamsObject
  ) {
    // rename to selectOptionsCheckToggleByRouter

    // console.log(
    //   "selectOptionsCheckToggle queryParamsObject",
    //   queryParamsObject
    // );

    const { productProp = null, versionProp = null } = queryParamsObject;

    let elements = [];

    [productProp, versionProp].forEach((prop) =>
      prop !== null ? elements.push(prop) : ""
    );

    const mappedElements = function (options, elements) {
      let mapped = [];
      elements.flat().forEach((el) => {
        let foundOptions = options.reduce((acc, cv) => {
          if (
            Object.keys(el).includes(cv.name) &&
            Object.values(el).includes(cv.value)
          ) {
            acc.push(cv);
          }
          return acc;
        }, []);

        return mapped.push(foundOptions);
      });

      return mapped.flat();
    };

    return mappedElements(getters.allOptions, elements).forEach((el) =>
      commit("toggleElement", el)
    );
  },
  selectOptionsCheckReset({ commit, getters }) {
    return getters.allOptions.forEach((el) => commit("resetElement", el));
  },
};

const mutations = {
  clickedOptionObjectMutation(state, object) {
    return (state.clickedOption = object);
  },

  toggleElement(state, el) {
    // I was too tired to do recursion, please forgive me

    let foundElement;

    if (el.groupId) {
      foundElement = state.selects
        .find((select) => select.id === el.groupId)
        .options.find((option) => option.id === el.id);
    }

    if (el.groupId && el.optionId && el.attributeId) {
      foundElement = state.selects
        .find((select) => select.id === el.groupId)
        .options.find((option) => option.id === el.optionId)
        .attributes.find((attribute) => attribute.id === el.attributeId)
        .options.find((attributeOption) => attributeOption.id === el.id);
    }

    if (el.groupId && el.optionId && el.attributeId && el.productTypeId) {
      foundElement = state.selects
        .find((select) => select.id === el.groupId)
        .options.find((option) => option.id === el.optionId)
        .attributes.find((attribute) => attribute.id === el.attributeId)
        .options.filter((option) => option.id === el.id);
    }

    return !foundElement.checked
      ? (foundElement.checked = true)
      : (foundElement.checked = false);
  },

  resetElement(state, el) {
    return (el.checked = false);
  },

  selectsSetMutation(state, selects) {
    return (state.selects = selects);
  },
  selectsLoadingMutation(state, selectsIsLoading) {
    return (state.selectsIsLoading = selectsIsLoading);
  },
  headerSetMutation(state, navigation) {
    return (state.header = navigation);
  },
  sidebarSetMutation(state, navigation) {
    return (state.sidebar = navigation);
  },
  selectionbarSetMutation(state, navigation) {
    return (state.selectionbar = navigation);
  },

  navigationLoadingMutation(state, navigationIsLoading) {
    return (state.navigationIsLoading = navigationIsLoading);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
