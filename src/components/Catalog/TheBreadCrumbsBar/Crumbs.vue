<script>
import { mapGetters } from "vuex";

export default {
  name: "Crumbs",
  props: {
    selects: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters("navigation", ["selectedOptionsElements"]),
  },
  methods: {
    clickedOptionObject(name, value) {
      let o = {};
      o[name] = value;
      return o;
    },
  },
  render: function (h) {
    if (this.selectedOptionsElements.length) {
      const labelFormatTemplate = function (
        label,
        event,
        underline = true,
        slashCharacter = true,
        slashVisibility = true
      ) {
        return (
          <div class="inline">
            <a
              onClick={event ? event : ""}
              class={`cursor-pointer ${underline ? "underline" : ""}`}
            >
              {label}
            </a>
            <span class={`mx-2 ${slashVisibility ? "visible" : "invisible"}`}>
              {slashCharacter ? "/" : ""}
            </span>
          </div>
        );
      };
      const labelFormat = (label, index) => {
        const singleItem = !!(this.selectedOptionsElements.length === 1);
        if (index === 0) {
          return labelFormatTemplate(
            label,
            this.$emit("toggle-index-succseedors", index),
            singleItem ? false : true,
            singleItem ? false : true
          );
        } else if (index === this.selectedOptionsElements.length - 1) {
          return labelFormatTemplate(label, false, false, false);
        } else if (index > 0 && index % 2) {
          return labelFormatTemplate(
            label,
            this.$emit("toggle-index-succseedors", index)
          );
        } else {
          return labelFormatTemplate(
            label,
            this.$emit(
              "crumbs-toggle",
              this.clickedOptionObject(
                this.selectedOptionsElements[index + 1].name,
                this.selectedOptionsElements[index + 1].value
              )
            )
          );
        }
      };
      return (
        <ul>
          {this.selectedOptionsElements.map((el, index) => (
            <li class="inline" key={el.value}>
              {labelFormat(el.label, index)}
            </li>
          ))}
        </ul>
      );
    } else {
      return h("p", "No items found.");
    }
  },
};
</script>
