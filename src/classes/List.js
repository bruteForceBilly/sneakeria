import { Model } from "@vuex-orm/core";
import User from "./User";
import Item from "./Item";

export default class List extends Model {
  static entity = "lists";
  static fields() {
    return {
      id: this.uid(),
      title: this.attr(""),
      user_id: this.attr(""),
      // relationships
      // belongs to user
      user: this.belongsTo(User, "user_id"),
      items: this.hasMany(Item, "list_id")
    };
  }
}
