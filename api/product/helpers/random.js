const { groupByName } = require("./getters.js");

const ifArray = function (arr) {
  if (Array.isArray(arr) === false) {
    console.error("ifArray > arg is not array:", arr);
  } else if (arr === null) {
    console.error("ifArray: arg was not passed", arr);
  } else {
    return true;
  }
};

const index = function (arr = null) {
  //console.log("index >", Array.isArray(arr), arr);
  if (ifArray(arr)) {
    return Math.floor(Math.random() * arr.length);
  }
};

function numberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const elementFromArray = function (arr = null) {
  let i = numberBetween(arr.length - 1, 1);
  let el = arr[i];
  return arr.splice(0, arr.length, el);
};

const childFromParentsChildren = function (parent = null, children = null) {
  if (!parent || !children) {
    console.error(
      `childFromParentsChildren > parent: ${parent} children: ${children}`
    );
  } else {
    return groupByName(parent)[children][index(groupByName(parent)[children])];
  }
};

const deepChild = function (n, q) {
  let root = [];
  let arr = n;
  const run = function (n, q) {
    if (root.length < 1) {
      root.push(n);
    }
    if (Array.isArray(n)) {
      //return elementFromArray(n).forEach((i) => run(i, q));
      arr = n;
      let index = Math.floor(Math.random() * (n.length - 1 + 1) + 0);
      let el = n[index];
      n.splice(0, n.length, el);
      return n.forEach((i) => run(i, q));
    }
    if (q in n) {
      return run(n[q], q);
    } else {
      if (arr.length > 0) {
        //elementFromArray(arr);
        let index = Math.floor(Math.random() * (arr.length - 1 + 1) + 0);
        let el = arr[index];
        arr.splice(0, arr.length, el);
      }
      return;
    }
  };

  run(n, q);
  return root.pop();
};

const sliver = function (arr = []) {
  //console.log("sliver >", arr);
  if (!ifArray(arr)) return console.error("You must pass an Array");
  let shuffled = null;
  shuffled = (arr) => {
    return arr
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };
  return shuffled(arr).slice(index(arr));
};

module.exports = {
  elementFromArray: elementFromArray,
  numberBetween: numberBetween,
  index: index,
  childFromParentsChildren: childFromParentsChildren,
  sliver: sliver,
  deepChild: deepChild,
  ifArray: ifArray,
};
