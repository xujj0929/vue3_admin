import { ref, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as views from "@/router/views";
import addRoutes from "@/router/addRoutes";

const filterRoute = (routes) => {
  return routes
    .map((route) => {
      if (route.children && route.children.length) {
        return {
          ...route,
          children: filterRoute(route.children),
          component: views.routerView,
        };
      } else if (views[route.component]) {
        return {
          ...route,
          children: null,
          component: views[route.component],
        };
      }
      return null;
    })
    .filter((e) => !!e);
};

export default () => {
  const route = useRoute();
  const router = useRouter();

  const loading = ref(true);
  const routes = ref([]);
  provide("routes", routes);

  setTimeout(() => {
    //获取路由信息  加载路由
    const filterRoutes = filterRoute(addRoutes);
    routes.value = filterRoutes;
    filterRoutes.forEach((e) => router.addRoute("layout", e));

    //判断是否重定向页面
    if (route.query.replace) {
      const fullPathList = router.getRoutes().map((e) => e.path);
      const replace = decodeURIComponent(route.query.replace);
      if (fullPathList.includes(replace)) router.replace(route.query.replace);
    }
    loading.value = false;
  }, 1000);

  return {
    loading,
    routes,
  };
};
