import getNavigation from "@/services/navigation.js";

const state = () => ({
  navigationIsLoading: false,
  header: null,
  sidebar: null,
  selectionbar: null,
  mobile: null,
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
    return state.sidebar ? state.sidebar.menuContent[0] : null;
  },
  selectionbarContent: (state) => {
    return state.selectionbar ? state.selectionbar.menuContent : null;
  },
  selectionbarFilters: (state, getters) => {
    return state.navigationIsLoading
      ? null
      : state.selectionbar.menuContent.filter(
          (menu) => menu.value === "filterSelects"
        );
  },
  selectionbarSorts: (state, getters) => {
    return state.navigationIsLoading
      ? null
      : state.selectionbar.menuContent.filter(
          (menu) => menu.value === "sortSelect"
        );
  },
  selectionbarRanges: (state, getters) => {
    return state.navigationIsLoading
      ? null
      : state.selectionbar.menuContent.filter(
          (menu) => menu.value === "rangeSelects"
        );
  },
  selectionbarMobile: (state, getters) => {
    return state.navigationIsLoading ? null : state.mobile.menuContent;
  },

  allOptions: (state, getters) => {
    return state.navigationIsLoading
      ? null
      : getters.selectionbarFilters.reduce(function (acc, cv) {
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
  },
  selectedOptionsElements: (state, getters) => {
    return state.navigationIsLoading
      ? null
      : getters.allOptions.filter((option) => option.checked);
  },
  selectedOptionsObject: (state, getters) => {
    return state.navigationIsLoading
      ? null
      : getters.selectedOptionsElements.reduce(function (previous, element) {
          if (element.name in previous) {
            //previous[element.name] = [previous[element.name]];
            previous[element.name].push(element.value);
          } else {
            previous[element.name] = [];
            previous[element.name].push(element.value);
          }
          return previous;
        }, {});
  },
};

const actions = {
  async navigationGetAction({ commit, state }) {
    commit("navigationLoadingMutation", true);
    return await getNavigation();
  },
  async navigationSetAction({ commit, state }, navigation) {
    const header = navigation.filter((nav) => nav.menuName === "header")[0];
    const sidebar = navigation.filter((nav) => nav.menuName === "sidebar")[0];
    const selectionbar = navigation.filter(
      (nav) => nav.menuName === "selectionbar"
    )[0];
    const mobile = navigation.filter((nav) => nav.menuName === "mobile")[0];

    commit("headerSetMutation", header);
    commit("sidebarSetMutation", sidebar);
    commit("selectionbarSetMutation", selectionbar);
    commit("mobileSetMutation", mobile);
  },
  async navigationInitAction({ dispatch, commit, state }) {
    // Should take query param
    await dispatch("navigationGetAction").then(async function (navigation) {
      await dispatch("navigationSetAction", navigation);
      commit("navigationLoadingMutation", false);
    });
    return "done";
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
    if (queryParamsObject === null) return;

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

    return state.navigationIsLoading
      ? null
      : mappedElements(getters.allOptions, elements).forEach((el) =>
          commit("toggleElement", el)
        );
  },
  selectOptionsCheckReset({ commit, state, getters }) {
    return state.navigationIsLoading
      ? null
      : getters.allOptions.forEach((el) => commit("resetElement", el));
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
      foundElement = state.selectionbar.menuContent
        .find((select) => select.id === el.groupId)
        .options.find((option) => option.id === el.id);
    }

    if (el.groupId && el.optionId && el.attributeId) {
      foundElement = state.selectionbar.menuContent
        .find((select) => select.id === el.groupId)
        .options.find((option) => option.id === el.optionId)
        .attributes.find((attribute) => attribute.id === el.attributeId)
        .options.find((attributeOption) => attributeOption.id === el.id);
    }

    if (el.groupId && el.optionId && el.attributeId && el.productTypeId) {
      foundElement = state.selectionbar.menuContent
        .find((select) => select.id === el.groupId)
        .options.find((option) => option.id === el.optionId)
        .attributes.find((attribute) => attribute.id === el.attributeId)
        .options.filter((option) => option.id === el.id);
    }

    return (foundElement.checked = !foundElement.checked);
  },

  resetElement(state, el) {
    return (el.checked = false);
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
  mobileSetMutation(state, navigation) {
    return (state.mobile = navigation);
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
