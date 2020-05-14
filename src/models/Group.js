import { Model } from "@vuex-orm/core";
import Category from "./Category";

export default class Group extends Model {
  static entity = "groups";
  static fields() {
    return {
      id: this.uid(null),
      name: this.attr(""),
      category_ids: this.attr([]),
      // Relationships
      categories: this.hasManyBy(Category, "category_ids")
    };
  }
}
