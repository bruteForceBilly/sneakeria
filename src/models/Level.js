// LEVEL MODEL
import { Model } from "@vuex-orm/core";
import Group from "./Group.js";
import GroupLevel from "./GroupLevel.js";

export default class Level extends Model {
  static entity = "levels";
  static fields() {
    return {
      id: this.uid(null),
      catalog_id: this.attr(null),
      name: this.attr(""),
      //group_ids: this.attr(null),
      // Relationships
      groups: this.belongsToMany(Group, GroupLevel, "level_id", "group_id")
    };
  }
}
