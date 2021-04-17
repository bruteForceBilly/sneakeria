const VueLoaderPlugin = require("vue-loader/lib/plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
module.exports = {
  rules: [
    {
      test: /\.vue$/,
      loader: "vue-loader",
    },
  ],
  plugins: [
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ["**/*.{vue,htm,html,css,sss,less,scss,sass}"],
    }),
  ],
};
