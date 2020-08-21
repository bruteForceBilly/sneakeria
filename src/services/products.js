import axios from "axios";
import { API_PRODUCTS } from "@/constants";
// Refactor so it also takes an option var called o to link it to the right if
// Route, Filter, Slice, Sort, Full-text search
//  l - limit by slice 
//  o - object
//  q - query
//  cb - callBack

export default function(o, q, s, e, cb) {
  if (o === "route" && q === "all") {
    //console.log("ALL PRODUCTS", q);
    return axios
      .get(API_PRODUCTS + `?_start=1&_end=$10` )
      .then(response => {
        cb(response.data);
      })
      .catch(err => err.toString());
  } else if (o === "route") {
    console.log("product id hit");
    return axios
      .get(API_PRODUCTS + "/" + q + `?_start=1&_end=10`)
      .then(response => {
        cb(response.data);
      })
      .catch(err => err.toString());
  } else if (o === "filter") {
    //console.log("Q PRODUCTS", q);
    return axios
      .get(API_PRODUCTS + "?" + q + `&_start=1&_end=10`)
      .then(response => {
        cb(response.data);
      })
      .catch(err => err.toString());
  }
}
