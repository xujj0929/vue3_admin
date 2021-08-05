const resolve = (dir) => {
  return require("path").join(__dirname, dir);
};

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test

    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial",
        },
        antDesignVue: {
          name: "chunk-ant-design-vue",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/,
        },
        antDesign: {
          name: "chunk-ant-design",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?@ant-design(.*)/,
        },
        commons: {
          name: "chunk-commons",
          test: resolve("src/components"),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    });
    config.optimization.runtimeChunk("single");
  },
};
