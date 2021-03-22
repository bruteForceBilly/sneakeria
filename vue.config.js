module.exports = {
  devServer: {
    host: "localhost",
    public: "http://localhost:8080",
    proxy: 'https://sneakeria-api.herokuapp.com/'
  },

  publicPath: "/",
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,

  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: process.env.VUE_APP_TITLE,
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },

  lintOnSave: process.env.NODE_ENV !== 'production',

  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {},
  },
};
