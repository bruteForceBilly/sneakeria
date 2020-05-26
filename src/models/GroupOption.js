// GROUP LEVEL MODEL
import { Model } from "@vuex-orm/core";

export default class GroupOption extends Model {
  static entity = "groupOption";
  static primaryKey = ["group_id", "option_id"];

  static fields() {
    return {
      group_id: this.attr(null),
      option_id: this.attr(null)
    };
  }
}
