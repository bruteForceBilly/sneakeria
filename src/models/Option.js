import { Model } from "@vuex-orm/core";
import Group from "./Group";
import GroupOption from "./GroupOption.js";

export default class Option extends Model {
  static entity = "options";
  static fields() {
    return {
      id: this.uid(null),
      name: this.attr(""),
      label: this.attr(""),
      value: this.attr(""),
      catalog_id: this.attr(null),
      group_id: this.attr(""),
      // Relationships
      groups: this.belongsToMany(Group, GroupOption, "option_id", "group_id")
    };
  }
}
