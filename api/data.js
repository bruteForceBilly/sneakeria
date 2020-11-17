const group = [
  {
    id: 1,
    name: "section",
    optionIds: [1, 2],
  },
  {
    id: 2,
    name: "category",
    optionIds: [3, 4],
  },
  {
    id: 3,
    name: "campaigns",
    optionIds: [5, 6, 7],
  },
  {
    id: 4,
    name: "look",
    optionIds: [8, 9, 10],
  },
  {
    id: 5,
    name: "brand",
    optionIds: [11, 12, 13, 14],
  },
];

const option = [
  {
    id: 1,
    name: "men",
    groupId: 1,
  },
  {
    id: 2,
    name: "women",
    groupId: 1,
  },
  {
    id: 3,
    name: "shoes",
    groupId: 2,
  },
  {
    id: 4,
    name: "clothing",
    groupId: 2,
  },
  {
    id: 5,
    name: "sale",
    groupId: 3,
  },
  {
    id: 6,
    name: "essentials",
    groupId: 3,
  },
  {
    id: 7,
    name: "new",
    groupId: 3,
  },
  {
    id: 8,
    name: "tennis",
    groupId: 4,
  },
  {
    id: 9,
    name: "basketball",
    groupId: 4,
  },
  {
    id: 10,
    name: "fotball",
    groupId: 4,
  },
  {
    id: 11,
    name: "nike",
    groupId: 5,
  },
  {
    id: 12,
    name: "adidas",
    groupId: 5,
  },
  {
    id: 13,
    name: "rebook",
    groupId: 5,
  },
  {
    id: 14,
    name: "puma",
    groupId: 5,
  },
];

const productType = [
  {
    id: 1,
    name: "boots",
    optionId: 3,
  },
  {
    id: 2,
    name: "sandals",
    optionId: 3,
  },
  {
    id: 3,
    name: "sneakers",
    optionId: 3,
  },
  {
    id: 3,
    name: "hoodies",
    optionId: 4,
  },
  {
    id: 5,
    name: "t-shirts",
    optionId: 4,
  },
  {
    id: 6,
    name: "trousers",
    optionId: 4,
  },
];

const styleType = [
  {
    id: 1,
    name: "pullover",
    productTypeId: 3,
  },
  {
    id: 2,
    name: "zip up",
    productTypeId: 3,
  },
  {
    id: 3,
    name: "fleece",
    productTypeId: 3,
  },
  {
    id: 4,
    name: "longsleeve",
    productTypeId: 4,
  },
  {
    id: 5,
    name: "sleeveless",
    productTypeId: 4,
  },
  {
    id: 6,
    name: "graphic tees",
    productTypeId: 4,
  },
  {
    id: 7,
    name: "chinos",
    productTypeId: 5,
  },
  {
    id: 8,
    name: "jeans",
    productTypeId: 5,
  },
  {
    id: 9,
    name: "sweat pants",
    productTypeId: 5,
  },
];

const colors = [
  "white",
  "black",
  "grey",
  "blue",
  "green",
  "brown",
  "red",
  "beige",
  "yellow",
  "burgundy",
  "orange",
  "pink",
  "gold",
  "silver",
  "purple",
];

const catalog = {
  groups: [
    {
      id: 1,
      name: "section",
      many: false,
      options: [
        {
          id: 1,
          name: "men",
        },
        {
          id: 2,
          name: "women",
        },
      ],
    },
    {
      id: 2,
      name: "category",
      many: false,
      options: [
        {
          id: 1,
          name: "shoes",
        },
        {
          id: 2,
          name: "clothing",
          attributes: [
            {
              id: 1,
              name: "product type",
              attributes: [
                {
                  id: 1,
                  name: "hoodies",
                  attributes: [
                    {
                      id: 1,
                      name: "style",
                      attributes: [
                        {
                          id: 1,
                          name: "Pullover",
                        },
                        {
                          id: 2,
                          name: "Zip Up",
                        },
                        {
                          id: 3,
                          name: "Fleece",
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 2,
                  name: "t-shirts",
                  attributes: [
                    {
                      id: 1,
                      name: "style",
                      attributes: [
                        {
                          id: 1,
                          name: "longsleeve",
                        },
                        {
                          id: 2,
                          name: "sleeveless",
                        },
                        {
                          id: 3,
                          name: "graphic tees",
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 3,
                  name: "trousers",
                  attributes: [
                    {
                      id: 1,
                      name: "style",
                      attributes: [
                        {
                          id: 1,
                          name: "chinos",
                        },
                        {
                          id: 2,
                          name: "jeans",
                        },
                        {
                          id: 3,
                          name: "sweat pants",
                        },
                      ],
                    },
                  ],
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
      many: true,
      options: [
        {
          id: 1,
          name: "sale",
        },
        {
          id: 2,
          name: "essentials",
        },
        {
          id: 3,
          name: "new",
        },
      ],
    },
    {
      id: 4,
      name: "look",
      many: false,
      options: [
        {
          id: 1,
          name: "tennis",
        },
        {
          id: 2,
          name: "basketball",
        },
        {
          id: 3,
          name: "fotball",
        },
        {
          id: 4,
          name: "street",
        },
      ],
    },
    {
      id: 5,
      name: "brand",
      many: false,
      options: [
        {
          id: 1,
          name: "nike",
        },
        {
          id: 2,
          name: "adidas",
        },
        {
          id: 3,
          name: "rebook",
        },
        {
          id: 4,
          name: "puma",
        },
      ],
    },
  ],
};

module.exports = {
  catalog: catalog,
  group: group,
  option: option,
  productType: productType,
  styleType: styleType,
  colors: colors,
};
