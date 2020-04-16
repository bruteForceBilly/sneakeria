import axios from "axios";
import { API_SITE } from "@/constants";

export default function(cb) {
  console.log("sevices ran");
  return axios
    .get(API_SITE)
    .then(response => cb(response.data))
    .catch(err => err.toString());
}
