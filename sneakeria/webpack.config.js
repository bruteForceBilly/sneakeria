const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  entry: {
    main: "./src/main.js",
  },
  rules: [
    {
      test: /\.vue$/,
      loader: "vue-loader",
    },
  ],
  plugins: [new VueLoaderPlugin()],
};
