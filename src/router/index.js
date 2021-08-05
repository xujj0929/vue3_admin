import { createRouter, createWebHashHistory } from "vue-router";
import { login, home } from "./views";
import layout from "../layout";

const routes = [
  {
    path: "/",
    name: "layout",
    component: layout,
    redirect: "/home",
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: home,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const loginPath = "/login";
const whiteList = [loginPath];
router.beforeEach((to, _from, next) => {
  if (whiteList.includes(to.path)) return next();
  if (!localStorage.getItem("token")) return next(loginPath);
  return next();
});

export default router;
