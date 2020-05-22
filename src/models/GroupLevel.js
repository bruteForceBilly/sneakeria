// GROUP LEVEL MODEL
import { Model } from "@vuex-orm/core";

export default class GroupLevel extends Model {
  static entity = "groupLevel";
  static primaryKey = ["group_id", "level_id"];

  static fields() {
    return {
      group_id: this.attr(null),
      level_id: this.attr(null)
    };
  }
}
