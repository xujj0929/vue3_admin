import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import icons from "./icons";
import "ant-design-vue/dist/antd.css";

createApp(App).use(Antd).use(router).use(icons).mount("#app");
