import { Model } from "@vuex-orm/core";
import List from "./List";
import Item from "./Item";
import Role from "./Role";
import RoleUser from "./RoleUser";
import Image from "./Image";

export default class User extends Model {
  static entity = "users";
  static fields() {
    return {
      id: this.uid(),
      name: this.attr(""),
      email: this.attr(""),
      // relationships
      // user has many list
      // has many by is when user knows about list, but list dosent know about the user
      lists: this.hasMany(List, "user_id"),
      items: this.hasManyThrough(Item, List, "user_id", "list_id"),
      roles: this.belongsToMany(Role, RoleUser, "user_id", "role_id"),
      image: this.morphOne(Image, "imageable_id", "imageable_type")
    };
  }
}
