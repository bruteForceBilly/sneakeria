const state = () => ({
  selects: [
    {
      id: 1,
      name: "section",
      label: "Section",
      value: null,
      multiple: false,
      options: [
        {
          id: 1,
          groupId: 1,
          checked: false,
          name: "section",
          label: "Men",
          value: "men",
        },
        {
          id: 2,
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
      name: "category",
      label: "Category",
      value: null,
      multiple: false,
      options: [
        {
          id: 1,
          groupId: 2,
          checked: false,
          name: "category",
          label: "Shoes",
          value: "shoes",
          attributes: [
            {
              id: 1,
              optionId: 1,
              name: "shoes",
              label: "Product Types",
              value: null,
              multiple: false,
              options: [
                {
                  id: 1,
                  attributeId: 1,
                  optionId: 1,
                  checked: false,
                  name: "productType",
                  label: "Boots",
                  value: "boots",
                },
                {
                  id: 2,
                  attributeId: 1,
                  optionId: 1,
                  checked: false,
                  name: "productType",
                  label: "Sandals",
                  value: "sandals",
                },
                {
                  id: 3,
                  attributeId: 1,
                  optionId: 1,
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
          groupId: 2,
          checked: false,
          name: "category",
          label: "Clothing",
          value: "clothing",
          attributes: [
            {
              id: 1,
              optionId: 2,
              name: "category",
              label: "Product Types",
              value: null,
              multiple: false,
              options: [
                {
                  id: 1,
                  attributeId: 1,
                  optionId: 2,
                  checked: false,
                  name: "productType",
                  label: "Hoodies",
                  value: "hoodies",
                },
                {
                  id: 2,
                  attributeId: 1,
                  optionId: 2,
                  checked: false,
                  name: "productType",
                  label: "T-shirts",
                  value: "t-shirts",
                },
                {
                  id: 3,
                  attributeId: 1,
                  optionId: 2,
                  checked: false,
                  name: "productType",
                  label: "Trousers",
                  value: "trousers",
                },
              ],
            },
            {
              id: 2,
              optionId: 2,
              name: "category",
              label: "Style",
              value: null,
              multiple: true,
              options: [
                {
                  id: 1,
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 1,
                  checked: false,
                  name: "styleType",
                  label: "Pullover",
                  value: "pullover",
                },
                {
                  id: 2,
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 1,
                  checked: false,
                  name: "styleType",
                  label: "Zip up",
                  value: "zip-up",
                },
                {
                  id: 3,
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 1,
                  checked: false,
                  name: "styleType",
                  label: "Fleece",
                  value: "fleece",
                },
                {
                  id: 4,
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Longsleeve",
                  value: "longsleeve",
                },
                {
                  id: 5,
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Sleeveless",
                  value: "sleeveless",
                },
                {
                  id: 6,
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 2,
                  checked: false,
                  name: "styleType",
                  label: "Graphic T-shirts",
                  value: "graphic-tees",
                },
                {
                  id: 7,
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 3,
                  checked: false,
                  name: "styleType",
                  label: "Chinos",
                  value: "chinos",
                },
                {
                  id: 8,
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 3,
                  checked: false,
                  name: "styleType",
                  label: "Jeans",
                  value: "jeans",
                },
                {
                  id: 9,
                  attributeId: 2,
                  optionId: 2,
                  productTypeId: 3,
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
      name: "campaigns",
      label: "Campaigns",
      value: null,
      multiple: true,
      options: [
        {
          id: 1,
          groupId: 3,
          checked: false,
          name: "campaigns",
          label: "Sale",
          value: "sale",
        },
        {
          id: 2,
          groupId: 3,
          checked: false,
          name: "campaigns",
          label: "Essentials",
          value: "essentials",
        },
        {
          id: 3,
          groupId: 3,
          checked: false,
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
      value: null,
      multiple: false,
      options: [
        {
          id: 1,
          groupId: 4,
          checked: false,
          name: "look",
          label: "Tennis",
          value: "tennis",
        },
        {
          id: 2,
          groupId: 4,
          checked: false,
          name: "look",
          label: "Basketball",
          value: "basketball",
        },
        {
          id: 3,
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
      name: "brand",
      label: "Brand",
      multiple: false,
      options: [
        {
          id: 1,
          groupId: 5,
          checked: false,
          name: "brand",
          label: "Nike",
          value: "nike",
        },
        {
          id: 2,
          groupId: 5,
          checked: false,
          name: "brand",
          label: "Adidas",
          value: "adidas",
        },
        {
          id: 3,
          groupId: 5,
          checked: false,
          name: "brand",
          label: "Rebook",
          value: "rebook",
        },
        {
          id: 4,
          groupId: 5,
          checked: false,
          name: "brand",
          label: "Puma",
          value: "puma",
        },
      ],
    },
  ],
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
    // move all option to its own getter
    let allOptions = state.selects.reduce(function (acc, cv) {
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

    let mappedOptions = allOptions.reduce(function (acc, cv) {
      clickedOptionObject.forEach((object) => {
        for (const [key, value] of Object.entries(object)) {
          if (cv.name === key && cv.value === value) {
            acc.push(cv);
          }
        }
      });

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
