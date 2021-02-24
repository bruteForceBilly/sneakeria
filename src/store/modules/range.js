const state = () => ({
  ranges: [
    {
      id: 1,
      name: "price",
      label: "Price",
      valuue: "rangeSelects",
      inputType: "range",
      containerSize: "wide-center",
      options: [
        {
          id: 1,
          groupId: 1,
          name: "price",
          label: "Price Minimum",
          min: 34,
          max: 299,
          value: "0",
        },
      ],
    },
  ],
});

export default {
  namespaced: true,
  state,
};
