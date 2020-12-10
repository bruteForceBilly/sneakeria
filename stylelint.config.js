module.exports = {
  processors: ["stylelint-processor-html"],

  extends: [
    "stylelint-config-standard",
    "stylelint-config-prettier",
    "stylelint-config-recommended",
    "stylelint-config-recess-order",
  ],

  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "block-no-empty": null,
    "unit-whitelist": ["em", "rem", "s", "%"],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "no-empty-source": null,
  },
  ignoreFiles: ["**/*.js"],
  root: true,
};
