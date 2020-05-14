import { Model } from "@vuex-orm/core";
import Option from "./Option";

export default class Category extends Model {
  static entity = "categories";
  static fields() {
    return {
      id: this.uid(null),
      name: this.attr(""),
      // Relationships
      // One Category has many Options
      options: this.hasMany(Option, "category_id")
    };
  }
}
