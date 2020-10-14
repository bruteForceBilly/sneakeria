const { pickOneRandom, groupNames } = require("./helpers.js");

const groupFactory = function ({
  group_id = null,
  product_id = null,
  name = null,
  label = null,
}) {
  return {
    group_id,
    product_id,
    name,
    label,
  };
};

const newGroup = (n) =>
  groupFactory({
    group_id: n,
    name: pickOneRandom(groupNames),
  });

module.exports = {
  newGroup: newGroup,
};
