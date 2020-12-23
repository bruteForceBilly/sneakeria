/* eslint-disable no-unused-vars */
const API_LEGEND = {
  section: "product",
  category: "product",
  campaigns: "product",
  productType: "product",
  styleType: "product",
  look: "product",
  brand: "product",
  color: "version",
  price_min: "operator",
  price_max: "operator",
};

const qObjectified = {
  section: "men",
  brand: "nike",
  campaigns: "sale",
  color: "red",
  price_min: 29,
  price_max: 359,
};

let test = Object.entries(qObjectified).reduce(
  function (acc, cv, i, arr) {
    let [key, value] = cv;

    if (API_LEGEND[key] === "product") {
      acc.product += `${key}=${value}&`;
    }

    if (API_LEGEND[key] === "version") {
      acc.version += `${key}=${value}&`;
    }

    if (API_LEGEND[key] === "operator") {
      acc.operator += `${key}=${value}&`;
    }

    return acc;
  },
  { product: "", version: "", operator: "" }
);

console.log(test);

// Cateoregorize each key into its parent Category
// for example section belongs to product
// color belongs to version
// { product: "section=men&brand=nike", "version": "color=red", "operator: "price_min=29" }

// if (
//     store.state.search.searchRouteLastBeforeEnter === "searchRequestRoute"
//   ) {
//     //console.log("ROUTER IF searchRequestRoute", to, from),
//     store.dispatch(
//       "search/queryParamsStringAction",
//       store.state.search.queryParamsObject
//     );
//   } else if (to.name === "searchQueryRoute") {
//     //console.log("ROUTER ELSE IF searchQueryRoute", to.query); // try searchQueryParamsObjectMutation
//     store.dispatch("search/queryParamsStringAction", to.query);
//     store.commit("search/queryParamsObjectMutation", to.query);
//   }

//   store.state.search.queryParamsString === ""
//     ? reject()
//     : resolve(store.state.search.queryParamsString);

//   store.dispatch(
//     "search/queryParamsStringAction",
//     store.state.search.queryParamsObject // check if this object exist?
//   );
