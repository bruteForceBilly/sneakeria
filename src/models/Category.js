import { Model } from "@vuex-orm/core";
import Option from "./Option";

export default class Category extends Model {
  static entity = "categories";
  static fields() {
    return {
      id: this.uid(null),
      name: this.attr(""),
      // Relationships
      options: this.hasMany(Option, "category_id")
    };
  }
}
