const catalogModel = {
  groups: [
    {
      id: 1,
      name: "section",
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
          attributes: [
            {
              id: 1,
              name: "field",
              attributes: [
                {
                  id: 1,
                  name: "outdoor",
                },
                {
                  id: 2,
                  name: "indoor",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 5,
      name: "brand",
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

const groupNames = catalogModel.groups.map((group) => group.name);

module.exports = {
  groupNames: groupNames,
  colors: colors,
  catalogModel: catalogModel,
};
