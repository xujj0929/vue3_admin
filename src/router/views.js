import { h, resolveComponent } from "vue";

export const routerView = {
  render() {
    return h(resolveComponent("router-view"));
  },
};
export const home = () =>
  import(/* webpackChunkName: "views-home" */ "@/views/Home.vue");
export const login = () =>
  import(/* webpackChunkName: "views-login" */ "@/views/User/Login.vue");
export const userList = () =>
  import(/* webpackChunkName: "views-user" */ "@/views/User/List.vue");
