import axios from "axios";
import { API_PRODUCTS } from "@/constants";

export default function(q, cb) {
  return axios
    .get(API_PRODUCTS + "/?" + q)
    .then(response => {
      cb(response.data);
      console.log("PRODUCTS", q, response.data);
    })
    .catch(err => err.toString());
}
