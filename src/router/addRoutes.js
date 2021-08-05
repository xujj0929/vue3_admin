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
        path: "image",
        name: "userImage",
        meta: {
          title: "用户头像",
          icon: "PieChartOutlined",
        },
        component: home,
      },
      {
        path: "data",
        name: "userData",
        meta: {
          title: "用户资料",
          icon: "PieChartOutlined",
        },
        component: routerView,
        children: [
          {
            path: "password",
            name: "userPassword",
            meta: {
              title: "用户密码",
              icon: "PieChartOutlined",
            },
            component: home,
          },
          {
            path: "info",
            name: "userInfo",
            meta: {
              title: "用户详情",
              icon: "PieChartOutlined",
            },
            component: home,
          },
        ],
      },
    ],
    component: routerView,
  },
  {
    path: "account",
    name: "account",
    meta: {
      title: "用户账号",
      icon: "PieChartOutlined",
    },
    component: home,
  },
];

export default routes;
