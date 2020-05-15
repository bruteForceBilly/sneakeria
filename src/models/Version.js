import { Model } from "@vuex-orm/core";
import Product from "./Product";

export default class Version extends Model {
  static entity = "versions";
  static fields() {
    return {
      id: this.uid(null),
      product_id: this.attr(null),
      color: this.attr(""),
      price: this.attr(null),
      image: this.attr(null),
      // Relationships
      product: this.belongsTo(Product, "product_id")
    };
  }
}
