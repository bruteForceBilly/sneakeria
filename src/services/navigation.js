import axios from "axios";
import { API_NAVIGATION } from "@/constants";

export default function (q) {
  let { menuName } = q;
  return axios
    .get(API_NAVIGATION + "?menuName=" + menuName)
    .then((response) => response.data[0])
    .catch((err) => err.toString());
}
