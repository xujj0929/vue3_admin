export default {
  install: (app) => {
    const files = require.context(".", true, /\.vue$/);
    files.keys().forEach((key) => {
      const fileName = key.replace(/.vue|.\//g, "");
      for (let [, target] of Object.entries(files(key))) {
        app.component(fileName, target);
      }
    });
  },
};
