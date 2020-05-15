import { Model } from "@vuex-orm/core";
import Category from "./Category";

export default class Option extends Model {
  static entity = "options";
  static fields() {
    return {
      id: this.uid(null),
      name: this.attr(""),
      category_id: this.attr(""),
      // Relationships
      category: this.belongsTo(Category, "category_id")
    };
  }
}
