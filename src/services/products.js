import axios from "axios";
import { API_PRODUCTS } from "@/constants";
// Refactor so it also takes an option var called o to link it to the right if
// Route, Filter, Slice, Sort, Full-text search

export default function (o, q, cb) {
  if (o === "route" && q === "all") {
    //console.log("ALL PRODUCTS", q);
    return axios
      .get(API_PRODUCTS)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => err.toString());
  } else if (o === "route") {
    //console.log("product id hit");
    return axios
      .get(API_PRODUCTS + "/" + q)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => err.toString());
  } else if (o === "filter") {
    console.log("product service Q PRODUCTS", q);
    return axios
      .get(API_PRODUCTS + "?" + q)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => err.toString());
  }
}
