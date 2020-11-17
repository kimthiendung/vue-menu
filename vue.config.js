module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
  configureWebpack: {
    externals: {
      vue: "Vue"
    },
    output: {
      filename: "vue-im-menu.js"
    }
  },
  css: {
    extract: {
      filename: "vue-im-menu.css"
    }
  }
};
