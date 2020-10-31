const { catalog, site, colors } = require("./data.js");

const groupNames = catalog.groups.map((group) => group.name);

module.exports = {
  groupNames: groupNames,
  colors: colors,
  catalog: catalog,
  site: site,
};
