import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import components from "./components";
import Antd from "ant-design-vue";
import icons from "./icons";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);
app.use(router);
app.use(components);
app.use(Antd);
app.use(icons);
app.mount("#app");
