import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import components from "./components";
import antd from "ant-design-vue";
import icons from "./icons";
import mock from "./api/mock";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);
app.use(router);
app.use(components);
app.use(antd);
app.use(icons);
app.use(mock);
app.mount("#app");
