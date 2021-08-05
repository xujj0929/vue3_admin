import * as icons from "@ant-design/icons-vue";

export default {
  install: (app) => {
    Object.entries(icons).forEach(([name, icon]) => {
      app.component(name, icon);
    });
  },
};
