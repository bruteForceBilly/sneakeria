import axios from "axios";
import { API_NAVIGATION } from "@/constants";

export default function () {
  return axios
    .get(API_NAVIGATION)
    .then((response) => response.data)
    .catch((err) => err.toString());
}
