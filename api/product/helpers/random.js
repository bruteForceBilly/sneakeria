/* eslint-disable no-unused-vars */
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
  return Math.floor(Math.random() * (max - min + min) + min);
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

/*
const deepChild = function (n, q) {
  let root = [];
  let arr = n;
  const run = function (n, q) {
    if (root.length < 1) {
      root.push(n);
    }
    if (Array.isArray(n)) {
      //console.log(elementFromArray(n).forEach((i) => run(i, q)));
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
        //let index = numberBetween(0, arr.length - 1);
        //console.log("index", index, arr);
        let el = arr[index];
        arr.splice(0, arr.length, el);
      }
      return;
    }
  };

  run(n, q);
  return root.pop();
}; */

const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// const r = (arg) => randomInt(0, arg);

const r = function (arg) {
  return randomInt(0, arg);
};

const findRandomElement = (a, j) => {
  return a.filter((el, i) => j === i);
};

const deepChild = (n, q) => {
  let trail = [];
  let prev;
  let el;

  const run = function (n, q) {
    trail.push(n);

    if (Array.isArray(n)) {
      prev = n;
      el = findRandomElement(prev, r(prev.length - 1));
      prev.splice(0, prev.length, el[0]);
      return prev.forEach((cv) => run(cv, q));
    }
    if (q in n) {
      run(n[q], q);
    } else {
      if (Array.isArray(prev) === true) {
        el = findRandomElement(prev, r(prev.length - 1));
        prev.splice(0, prev.length, el[0]);
        console.log("prev", prev);
      }
      return;
    }
  };

  run(n, q);

  return trail[0];
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
