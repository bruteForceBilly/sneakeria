const data = [
  {
    id: 1,
    name: "section",
    label: "Section",
    value: null,
    multiple: false,
    inputType: "checkbox",
    containerSize: "base",
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
    inputType: "checkbox",
    containerSize: "base",
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
            inputType: "checkbox",
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
            inputType: "checkbox",
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
            inputType: "checkbox",
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
    inputType: "checkbox",
    containerSize: "base",
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
    inputType: "checkbox",
    containerSize: "base",
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
    inputType: "checkbox",
    containerSize: "base",
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
  {
    id: 6,
    name: "color",
    label: "Color",
    multiple: false,
    containerSize: "wide",
    inputType: "checkbox",
    options: [
      {
        id: 1,
        groupId: 6,
        checked: false,
        name: "color",
        label: "Black",
        value: "black",
      },
      {
        id: 2,
        groupId: 6,
        checked: false,
        name: "color",
        label: "Blue",
        value: "blue",
      },
      {
        id: 3,
        groupId: 6,
        checked: false,
        name: "color",
        label: "Gold",
        value: "gold",
      },
      {
        id: 4,
        groupId: 6,
        checked: false,
        name: "color",
        label: "Green",
        value: "green",
      },
      {
        id: 5,
        groupId: 6,
        checked: false,
        name: "color",
        label: "Grey",
        value: "grey",
      },
      {
        id: 6,
        groupId: 6,
        checked: false,
        name: "color",
        label: "Orange",
        value: "orange",
      },
      {
        id: 7,
        groupId: 6,
        checked: false,
        name: "color",
        label: "Red",
        value: "red",
      },
      {
        id: 8,
        groupId: 6,
        checked: false,
        name: "color",
        label: "Silver",
        value: "silver",
      },
      {
        id: 9,
        groupId: 6,
        checked: false,
        name: "color",
        label: "White",
        value: "white",
      },
      {
        id: 10,
        groupId: 6,
        checked: false,
        name: "color",
        label: "Yellow",
        value: "yellow",
      },
    ],
  },
];
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getSelects(args) {
  await timeout(1000);
  return args;
}

export default function (cb) {
  return getSelects(data);
}