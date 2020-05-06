import axios from "axios";
import { API_PRODUCTS } from "@/constants";

export default function(q, cb) {
  if (q === "all") {
    //console.log("ALL PRODUCTS", q);
    return axios
      .get(API_PRODUCTS)
      .then(response => {
        cb(response.data);
      })
      .catch(err => err.toString());
  } else {
    //console.log("Q PRODUCTS", q);
    return axios
      .get(API_PRODUCTS + "?" + q)
      .then(response => {
        cb(response.data);
      })
      .catch(err => err.toString());
  }
}
