import { ref, provide } from "vue";
import { useRequest } from "vue-request";
import { useRoute, useRouter } from "vue-router";

import * as views from "@/router/views";
import { getUserInfo, getUserRouter } from "@/api/user";

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

const loadData = async () => {
  return await Promise.all([getUserInfo(), getUserRouter()]);
};

export default () => {
  const route = useRoute();
  const router = useRouter();

  const userInfo = ref(null);
  provide("userInfo", userInfo);

  const routes = ref([]);
  provide("routes", routes);

  const { loading } = useRequest(loadData, {
    onSuccess([_userInfo, _routes]) {
      userInfo.value = _userInfo;
      routes.value = _routes;

      filterRoute(_routes).forEach((e) => router.addRoute("layout", e));

      //判断是否重定向页面
      const replace = route.query.replace;
      if (replace) {
        const fullPathList = router.getRoutes().map((e) => e.path);
        const replace = decodeURIComponent(replace);
        if (fullPathList.includes(replace)) return router.replace(replace);
      }

      router.replace({ name: "home" });
    },
  });

  return {
    loading,
  };
};
