const state = () => ({
  price: {
    id: 1,
    name: "price",
    label: "Price",
    inputType: "range",
    options: [
      {
        id: 1,
        groupId: 1,
        name: "price",
        label: "Price Minimum",
        min: 0,
        max: 100,
        value: "0",
      },
      {
        id: 2,
        groupId: 7,
        checked: false,
        name: "price",
        label: "Price Maximum",
        min: 0,
        max: 100,
        value: "100",
      },
    ],
  },
});

export default {
  namespaced: true,
  state,
};
