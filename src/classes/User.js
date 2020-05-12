import { Model } from "@vuex-orm/core";
import List from "./List";

export default class User extends Model {
  static entity = "users";
  static fields() {
    return {
      id: this.uid(),
      name: this.attr(""),
      email: this.attr(""),
      // relationships
      // user has many list
      lists: this.hasMany(List, "user_id")
    };
  }
}
