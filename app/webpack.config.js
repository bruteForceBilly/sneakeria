const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  rules: [
    {
      test: /\.vue$/,
      loader: "vue-loader",
    },
  ],
  plugins: [new VueLoaderPlugin()],
};
