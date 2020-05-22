// CATALOG MODEL
import { Model } from "@vuex-orm/core";
import Level from "./Level";
import Group from "./Group.js";

export default class Catalog extends Model {
  static entity = "catalogs";
  static fields() {
    return {
      id: this.uid(null),
      // Relationships
      // A catalog has many levels
      levels: this.hasMany(Level, "catalog_id"),
      groups: this.hasMany(Group, "catalog_id")
    };
  }
}
