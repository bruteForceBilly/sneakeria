import { Model } from "@vuex-orm/core";
import Version from "./Version";

export default class Product extends Model {
  static entity = "products";
  static fields() {
    return {
      id: this.uid(null),
      name: this.attr(""),
      productTitle: this.attr(""),
      section: this.attr(""),
      campaigns: this.attr(""), // could be tag??
      category: this.attr(""),
      look: this.attr(""),
      brand: this.attr(""),
      // Relationships
      versions: this.hasMany(Version, "product_id")
    };
  }
}
