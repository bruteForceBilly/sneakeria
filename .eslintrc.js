module.exports = {
  root: true,

  env: {
    node: true,
  },

  plugins: ["prettier"],

  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier",
    "plugin:prettier/recommended",
  ],

  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 10,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": ["error", { varsIgnorePattern: "[h]", args: "none" }],
  },

  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
