module.exports = {
  devServer: {
    host: "localhost",
    public: "http://localhost:" + process.env.PORT,
    proxy: "http://localhost:" + process.env.PROXY,
  },

  publicPath: "/",
  outputDir: "dist",
  indexPath: "index.html",
  filenameHashing: true,

  pages: {
    index: {
      entry: "./src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: process.env.VUE_APP_TITLE,
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },

  lintOnSave: process.env.NODE_ENV !== "production",

  configureWebpack: {
    devtool: "source-map",
  },
};
