const { catalogModel } = require("../data.js");
const { pickIndex } = require("../helpers.js");

const groupsDefaultParameter = function (n, groups = catalogModel.groups) {
  let result = [];
  groups.forEach((group, index) =>
    result.push({
      id: index,
      product_id: n,
      name: group.name,
      options:
        group.name.split("").pop() === "s"
          ? group.options
          : group.options[pickIndex(group.options)],
    })
  );
  return result;
};

const groupsFactory = function (groups = null) {
  if (groups === null) return console.error("No groups array was passed");
  return groups;
};

const newGroups = (n) => groupsFactory(groupsDefaultParameter(n));

module.exports = {
  newGroups: newGroups,
};
