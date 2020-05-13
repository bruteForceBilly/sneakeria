import { Model } from "@vuex-orm/core";

export default class Image extends Model {
  static entity = "images";
  static fields() {
    return {
      id: this.uid(),
      url: this.attr(null),
      imageable_id: this.attr(null), // 4
      imageable_type: this.attr(null), // Users,
      imageable: this.morphTo("imageable_id", "imageable_type")
    };
  }
}
