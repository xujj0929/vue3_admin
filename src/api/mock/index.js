export default {
  install: () => {
    const isProduction = process.env.NODE_ENV === "production";
    if (!isProduction) {
      const Mock = require("mockjs");
      Mock.setup({
        timeout: "600-1200",
      });
      const files = require.context(".", true, /\.js$/);
      files.keys().forEach((key) => {
        if (key === "./index.js") return;
        for (let [path, target] of Object.entries(files(key).default)) {
          const [rtype, rurl] = path.split("|");
          const [, controller] = key.split(".");
          Mock.mock(controller + rurl, rtype, target);
        }
      });
    }
  },
};
