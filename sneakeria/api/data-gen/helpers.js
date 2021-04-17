const repeat = function (func, times) {
    func(times);
    times && --times && repeat(func, times);
  };
  
  const randomNumberBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + min) + min);
  };
  
  const randomElement = function (arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  };
  
  const randomSliver = function (arr = []) {
    let shuffled = (arr) => {
      return arr
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
    };
    return shuffled(arr).slice(arr.indexOf(randomElement(arr)));
  };
  
  module.exports = {
    repeat: repeat,
    randomElement: randomElement,
    randomSliver: randomSliver,
    randomNumberBetween: randomNumberBetween,
  };