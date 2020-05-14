import { Model } from "@vuex-orm/core";

export default class Option extends Model {
  static entity = "options";
  static fields() {
    return {
      id: this.uid(null),
      name: this.attr(""),
      category_id: this.attr(null)
      // Relationships
    };
  }
}
