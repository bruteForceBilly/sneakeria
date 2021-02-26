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
  "black",
  "blue",
  "gold",
  "green",
  "grey",
  "orange",
  "red",
  "silver",
  "white",
  "yellow",
];

const catalog = [
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
];

const navigation = [
  {
    id: 1,
    menuName: "sidebar",
    menuContent: [],
  },
  {
    id: 2,
    menuName: "header",
    menuContent: [
      {
        name: "links",
        items: [
          {
            name: "section",
            label: "Men",
            value: "men",
          },
          {
            name: "section",
            label: "Women",
            value: "women",
          },
          {
            name: "campaigns",
            label: "New",
            value: "new",
          },
          {
            name: "campaigns",
            label: "Essentials",
            value: "essentials",
          },
        ],
      },
      {
        name: "icons",
        items: [
          {
            name: "Help",
            label: "help",
            value: "help",
            src: "help-circle.svg",
          },
          {
            name: "Whishlist",
            label: "Whishlist",
            value: "whishlist",
            src: "heart.svg",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    menuName: "selectionbar",
    menuContent: [],
  },
];

let versions = [];

module.exports = {
  catalog: catalog,
  group: group,
  option: option,
  productType: productType,
  styleType: styleType,
  colors: colors,
  versions: versions,
  navigation: navigation,
};
