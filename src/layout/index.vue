<template>
  <a-spin :spinning="spinning" tip="用户资料加载中...">
    <a-layout style="height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <Sider />
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <component
            style="font-size: 18px"
            :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
            @click="() => (collapsed = !collapsed)"
          />
          <UserDropdown />
        </a-layout-header>
        <a-layout-content>
          <LayoutBreadcrumb />
          <div :style="{ padding: '10px', background: '#fff' }">
            <router-view />
          </div>
        </a-layout-content>
        <a-layout-footer> Ant Design ©2018 Created by Ant UED </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-spin>
</template>
<script>
import { defineComponent, ref, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import addRoutes from "@/router/addRoutes";
import Sider from "./Sider";
import UserDropdown from "./UserDropdown";
import LayoutBreadcrumb from "./LayoutBreadcrumb";

export default defineComponent({
  components: {
    Sider,
    UserDropdown,
    LayoutBreadcrumb,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const collapsed = ref(false);
    const spinning = ref(true);
    const routes = ref([]);
    const userInfo = ref(null);
    provide("collapsed", collapsed);
    provide("routes", routes);
    provide("userInfo", userInfo);

    setTimeout(() => {
      //获取用户信息
      userInfo.value = { name: "许佳俊" };
      //获取路由信息
      routes.value = addRoutes;
      //加载路由
      addRoutes.forEach((e) => router.addRoute("layout", e));

      //判断是否重定向页面
      if (route.query.replace) {
        const fullPathList = router.getRoutes().map((e) => e.path);
        const replace = decodeURIComponent(route.query.replace);
        if (fullPathList.includes(replace)) router.replace(route.query.replace);
      }
      spinning.value = false;
    }, 1000);

    return {
      routes,
      collapsed,
      spinning,
    };
  },
});
</script>

<style lang="less" scoped>
.ant-layout {
  height: 100%;
  > .ant-layout-header {
    user-select: none;
    background: #fff;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > .ant-layout-sider {
    user-select: none;
  }
  > .ant-layout-content {
    overflow-y: auto;
    padding: 0 5px;
    border-top: 5px;
    border-bottom: 5px;
    border-color: #eee;
    border-style: solid;

    > .ant-breadcrumb {
      user-select: none;
      position: sticky;
      top: 0;
      padding: 5px;
      background: #fff;
      border-bottom: 2px solid #eee;
    }
  }
  > .ant-layout-footer {
    user-select: none;
    text-align: left;
    padding: 5px;
    background: #fff;
  }
}
</style>
