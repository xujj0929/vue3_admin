import { h, resolveComponent } from "vue";
import { home } from "./views";

const routerView = {
  render() {
    return h(resolveComponent("router-view"));
  },
};
const routes = [
  {
    path: "/user",
    name: "user",
    meta: {
      title: "用户",
      icon: "PieChartOutlined",
    },
    children: [
      {
        path: "info",
        name: "userInfo",
        meta: {
          title: "用户资料",
          icon: "PieChartOutlined",
        },
        component: home,
      },
    ],
    component: routerView,
  },
];

export default routes;
