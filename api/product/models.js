const catalogModel = {
  groups: [
    {
      id: 1,
      name: "section",
      options: [
        {
          id: 1,
          groupId: 1,
          name: "men",
        },
        {
          id: 2,
          groupId: 1,
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
          groupId: 2,
          name: "shoes",
        },
        {
          id: 2,
          groupId: 2,
          name: "clothing",
        },
      ],
    },
    {
      id: 3,
      name: "campaigns",
      options: [
        {
          id: 1,
          groupId: 3,
          name: "sale",
        },
        {
          id: 2,
          groupId: 3,
          name: "essentials",
        },
        {
          id: 3,
          groupId: 3,
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
          groupId: 4,
          name: "tennis",
        },
        {
          id: 2,
          groupId: 4,
          name: "basketball",
        },
        {
          id: 3,
          groupId: 4,
          name: "soccer",
        },
      ],
    },
    {
      id: 5,
      name: "brand",
      options: [
        {
          id: 1,
          groupId: 5,
          name: "nike",
        },
        {
          id: 2,
          groupId: 5,
          name: "adidas",
        },
        {
          id: 3,
          groupId: 5,
          name: "rebook",
        },
        {
          id: 4,
          groupId: 5,
          name: "puma",
        },
      ],
    },
  ],
};

const groupNames = catalogModel.groups.map((group) => group.name);

module.exports = {
  groupNames: groupNames,
  catalogModel: catalogModel,
};
