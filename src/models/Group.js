// GROUP MODEL
import { Model } from "@vuex-orm/core";
import Level from "./Level.js";
import GroupLevel from "./GroupLevel.js";
import GroupOption from "./GroupOption.js";
import Option from "./Option";

export default class Group extends Model {
  static entity = "groups";
  static fields() {
    return {
      id: this.uid(null),
      name: this.attr(""),
      catalog_id: this.attr(null),
      //Relationships
      levels: this.belongsToMany(Level, GroupLevel, "group_id", "level_id"),
      options: this.belongsToMany(Option, GroupOption, "group_id", "option_id")
    };
  }
}