// @vue/cli-plugin-babel/preset
module.exports = {
  presets: [
    ["@vue/app", { useBuiltIns: "entry" }],
    [
      "@babel/preset-env",
      {
        corejs: "core-js@3",
      },
    ],
    "@vue/cli-plugin-babel/preset",
  ],
  plugins: ["@babel/transform-runtime"],
};
