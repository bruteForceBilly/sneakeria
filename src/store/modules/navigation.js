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
  selects: [
    {
      id: 1,
      level: "group",
      name: "section",
      label: "Section",
      value: "filterSelects",
      multiple: false,
      inputType: "checkbox",
      containerSize: "base",
      options: [
        {
          id: 1,
          level: "option",
          groupId: 1,
          checked: false,
          name: "section",
          label: "Men",
          value: "men",
        },
        {
          id: 2,
          level: "option",
          groupId: 1,
          checked: false,
          name: "section",
          label: "Women",
          value: "women",
        },
      ],
    },
    {
      id: 2,
      level: "group",
      name: "category",
      label: "Category",
      value: null,
      multiple: false,
      inputType: "checkbox",
      containerSize: "base",
      options: [
        {
          id: 1,
          level: "option",
          groupId: 2,
          checked: false,
          name: "category",
          label: "Shoes",
          value: "shoes",
          attributes: [
            {
              id: 1,
              level: "attribute",
              optionId: 1,
              groupId: 2,
              name: "shoes",
              label: "Type",
              value: null,
              multiple: false,
              inputType: "checkbox",
              options: [
                {
                  id: 1,
                  level: "option",
                  attributeId: 1,
                  optionId: 1,
                  groupId: 2,
                  checked: false,
                  name: "productType",
                  label: "Boots",
                  value: "boots",
                },
                {
                  id: 2,
                  level: "option",
                  attributeId: 1,
                  optionId: 1,
                  groupId: 2,
                  checked: false,
                  name: "productType",
                  label: "Sandals",
                  value: "sandals",
                },
                {
                  id: 3,
                  level: "option",
                  attributeId: 1,
                  optionId: 1,
                  groupId: 2,
                  checked: false,
                  name: "productType",
                  label: "Sneakers",
                  value: "sneakers",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          level: "option",
          groupId: 2,
          attributeId: 1,
          checked: false,
          name: "category",
          label: "Clothing",
          value: "clothing",
          attributes: [
            {
              id: 1,
              level: "attribute",
              optionId: 2,
              groupId: 2,
              name: "clothing",
              label: "Type",
              value: null,
              multiple: false,
              inputType: "checkbox",
              options: [
                {
                  id: 1,
                  level: "option",
                  attributeId: 1,
                  optionId: 2,
                  groupId: 2,
                  checked: false,
                  name: "productType",
                  label: "Hoodies",
                  value: "hoodies",
                },
                {
                  id: 2,
                  level: "option",
                  attributeId: 1,
                  optionId: 2,
                  groupId: 2,
                  checked: false,
                  name: "productType",
                  label: "T-shirts",
                  value: "t-shirts",
                },
                {
                  id: 3,
                  level: "option",
                  attributeId: 1,
                  optionId: 2,
                  groupId: 2,
                  checked: false,
                  name: "productType",
                  label: "Trousers",
                  value: "trousers",
                },
              ],
            },
            {
              id: 2,
              level: "attribute",
              optionId: 2,
              groupId: 2,
              name: "clothing",
              label: "Style",
              value: null,
              multiple: true,
              inputType: "checkbox",
              options: [
                {
                  id: 1,
                  level: "option",
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 1,
                  groupId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Pullover",
                  value: "pullover",
                },
                {
                  id: 2,
                  level: "option",
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 1,
                  groupId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Zip up",
                  value: "zip-up",
                },
                {
                  id: 3,
                  level: "option",
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 1,
                  groupId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Fleece",
                  value: "fleece",
                },
                {
                  id: 4,
                  level: "option",
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 2,
                  groupId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Longsleeve",
                  value: "longsleeve",
                },
                {
                  id: 5,
                  level: "option",
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 2,
                  groupId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Sleeveless",
                  value: "sleeveless",
                },
                {
                  id: 6,
                  level: "option",
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 2,
                  groupId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Graphic T-shirts",
                  value: "graphic-tees",
                },
                {
                  id: 7,
                  level: "option",
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 3,
                  groupId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Chinos",
                  value: "chinos",
                },
                {
                  id: 8,
                  level: "option",
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 3,
                  groupId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Jeans",
                  value: "jeans",
                },
                {
                  id: 9,
                  level: "option",
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 3,
                  groupId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Sweat Pants",
                  value: "sweat-pants",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      level: "group",
      name: "campaigns",
      label: "Campaigns",
      value: null,
      multiple: true,
      inputType: "checkbox",
      containerSize: "base",
      options: [
        {
          id: 1,
          level: "option",
          groupId: 3,
          checked: false,
          name: "campaigns",
          label: "Sale",
          value: "sale",
        },
        {
          id: 2,
          level: "option",
          groupId: 3,
          checked: false,
          name: "campaigns",
          label: "Essentials",
          value: "essentials",
        },
      ],
    },
    {
      id: 4,
      level: "group",
      name: "look",
      label: "Look",
      value: null,
      multiple: false,
      inputType: "checkbox",
      containerSize: "base",
      options: [
        {
          id: 1,
          level: "option",
          groupId: 4,
          checked: false,
          name: "look",
          label: "Tennis",
          value: "tennis",
        },
        {
          id: 2,
          level: "option",
          groupId: 4,
          checked: false,
          name: "look",
          label: "Basketball",
          value: "basketball",
        },
        {
          id: 3,
          level: "option",
          groupId: 4,
          checked: false,
          name: "look",
          label: "Soccer",
          value: "soccer",
        },
      ],
    },
    {
      id: 5,
      level: "group",
      name: "brand",
      label: "Brand",
      value: null,
      multiple: false,
      inputType: "checkbox",
      containerSize: "base",
      options: [
        {
          id: 1,
          level: "option",
          groupId: 5,
          checked: false,
          name: "brand",
          label: "Nike",
          value: "nike",
        },
        {
          id: 2,
          level: "option",
          groupId: 5,
          checked: false,
          name: "brand",
          label: "Adidas",
          value: "adidas",
        },
        {
          id: 3,
          level: "option",
          groupId: 5,
          checked: false,
          name: "brand",
          label: "Rebook",
          value: "rebook",
        },
        {
          id: 4,
          level: "option",
          groupId: 5,
          checked: false,
          name: "brand",
          label: "Puma",
          value: "puma",
        },
      ],
    },
    {
      id: 6,
      level: "group",
      name: "color",
      label: "Color",
      value: null,
      multiple: false,
      containerSize: "wide",
      inputType: "checkbox",
      options: [
        {
          id: 1,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "Black",
          value: "black",
        },
        {
          id: 2,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "Blue",
          value: "blue",
        },
        {
          id: 3,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "Gold",
          value: "gold",
        },
        {
          id: 4,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "Green",
          value: "green",
        },
        {
          id: 5,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "Grey",
          value: "grey",
        },
        {
          id: 6,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "Orange",
          value: "orange",
        },
        {
          id: 7,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "Red",
          value: "red",
        },
        {
          id: 8,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "Silver",
          value: "silver",
        },
        {
          id: 9,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "White",
          value: "white",
        },
        {
          id: 10,
          level: "option",
          groupId: 6,
          checked: false,
          name: "color",
          label: "Yellow",
          value: "yellow",
        },
      ],
    },
  ],
  header: null,
});

const getters = {
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
    } else {
      console.log("not header");
    }

    //commit("headerSetMutation", navigation);

    //commit("navigationSetMutation", navigation);
  },
  async navigationInitAction({ dispatch, commit, state }) {
    // Should take query param
    await dispatch("navigationGetAction", {
      menuName: "header",
    }).then(async function (navigation) {
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
