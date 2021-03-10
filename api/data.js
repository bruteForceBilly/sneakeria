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
    name: "product",
    value: "product",
    label: "Product",
    content: {
      section: ["men", "women"],
      category: ["shoes", "clothing"],
      campaigns: ["sale", "essentials"],
      productType: [
        "boots",
        "sandals",
        "sneakers",
        "hoodies",
        "t-shirts",
        "trousers",
      ],
      styleType: [
        "pullover",
        "zip-up",
        "fleece",
        "longsleeve",
        "sleeveless",
        "graphic tees",
        "chinos",
        "jeans",
        "sweat pants",
      ],
      look: ["tennis", "basketball", "fotball"],
      brand: ["nike", "adidas", "rebook", "puma"],
    },
  },
  {
    id: 2,
    name: "productVersion",
    value: "productVersion",
    label: "Product Version",
    content: {
      color: [
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
      ],
    },
  },
  {
    id: 3,
    name: "operator",
    value: "operator",
    label: "Operator",
    content: {
      price: ["price.amountOffered_gte", "price.amountOffered_lte"],
      page: ["_page", "_limit"],
    },
  },
];

const navigation = [
  {
    id: 1,
    menuName: "sidebar",
    menuContent: [
      {
        name: "Root",
        parent: "Root",
        children: [
          {
            name: "Men",
            label: "Men",
            value: "men",
            parent: "Root",
            children: [
              {
                name: "Shoes",
                value: "men-shoes",
                label: "Shoes",
                parent: "Men",
                children: [
                  {
                    name: "All",
                    label: "All Men's shoes",
                    value: "men-shoes",
                    parent: "Shoes",
                  },
                  {
                    name: "Essentials",
                    label: "Essentials",
                    value: "men-shoes-essentials",
                    parent: "Shoes",
                  },
                  {
                    name: "Basketball",
                    label: "Basketball",
                    value: "men-shoes-basketball",
                    parent: "Shoes",
                  },
                  {
                    name: "Soccer",
                    label: "Soccer",
                    value: "men-shoes-soccer",
                    parent: "Shoes",
                  },
                  {
                    name: "Tennis",
                    label: "Tennis",
                    value: "men-shoes-tennis",
                    parent: "Shoes",
                  },
                ],
              },
              {
                name: "Clothing",
                label: "Clothing",
                value: "men-clothing",
                parent: "Men",
                children: [
                  {
                    name: "All",
                    label: "All Men's clothing",
                    value: "men-clothing",
                    parent: "Clothing",
                  },
                  {
                    name: "Shirts",
                    label: "Men's Shirts",
                    value: "men-shirts",
                    parent: "Clothing",
                    children: [
                      {
                        name: "Sale",
                        label: "Men's Shirts",
                        value: "men-shirts-sale",
                        parent: "Clothing",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Sale",
                label: "Sale",
                value: "men-sale",
              },
            ],
          },
          {
            name: "Women",
            label: "Women",
            value: "women",
            parent: "Root",
            children: [
              {
                name: "Shoes",
                value: "women-shoes",
                label: "Shoes",
                parent: "Women",
                children: [
                  {
                    name: "All",
                    label: "All Women's shoes",
                    value: "women-shoes",
                    parent: "Shoes",
                  },
                  {
                    name: "Essentials",
                    label: "Essentials",
                    value: "women-shoes-essentials",
                    parent: "Shoes",
                  },
                  {
                    name: "Basketball",
                    label: "Basketball",
                    value: "women-shoes-basketball",
                    parent: "Shoes",
                  },
                  {
                    name: "Soccer",
                    label: "Soccer",
                    value: "women-shoes-soccer",
                    parent: "Shoes",
                  },
                  {
                    name: "Tennis",
                    label: "Tennis",
                    value: "women-shoes-tennis",
                    parent: "Shoes",
                  },
                ],
              },
              {
                name: "Clothing",
                label: "Clothing",
                value: "women-clothing",
                parent: "Women",
                children: [
                  {
                    name: "All",
                    label: "All Women's clothing",
                    value: "women-clothing",
                    parent: "Clothing",
                  },
                  {
                    name: "Shirts",
                    label: "Women's Shirts",
                    value: "women-shirts",
                    parent: "Clothing",
                    children: [
                      {
                        name: "Sale",
                        label: "Women's Shirts",
                        value: "women-shirts-sale",
                        parent: "Clothing",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Sale",
                label: "Sale",
                value: "women-sale",
              },
            ],
          },
        ],
      },
    ],
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
            label: "Essentials",
            value: "essentials",
          },
          {
            name: "campaigns",
            label: "Sale",
            value: "sale",
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
    menuContent: [
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
        value: "filterSelects",
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
        value: "filterSelects",
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
        value: "filterSelects",
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
        value: "filterSelects",
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
        value: "filterSelects",
        multiple: false,
        inputType: "checkbox",
        containerSize: "wide",
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
      {
        id: 7,
        level: "group",
        name: "price",
        label: "Price",
        value: "rangeSelects",
        multiple: false,
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
      {
        id: 8,
        name: "sortBy",
        label: "Sort",
        value: "sortSelect",
        multiple: false,
        inputType: "hidden",
        containerSize: "base-left",
        options: [
          {
            id: 1,
            name: "sortBy",
            label: "Price (Low - High)",
            value: { sort: "PriceMin", order: "Ascending" },
            checked: false,
          },
          {
            id: 2,
            name: "sortBy",
            label: "Price (High - Low)",
            value: { sort: "PriceMax", order: "Descending" },
            checked: false,
          },
          {
            id: 3,
            name: "sortBy",
            label: "Oldest",
            value: { sort: "DateMin", order: "Ascending" },
            checked: false,
          },
          {
            id: 4,
            name: "sortBy",
            label: "Newest",
            value: { sort: "DateMax", order: "Descending" },
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    menuName: "mobile",
    menuContent: [
      {
        id: 1,
        name: "filterBy",
        label: "Filter By",
        value: ["FilterSelects", "RangeSelects"],
      },
      {
        id: 2,
        name: "sortBy",
        label: "Sort By",
        value: ["SortSelect"],
      },
    ],
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
