<template>
  <a-spin :spinning="loading" tip="用户资料加载中...">
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
          <div class="router-view">
            <router-view :key="routerKey" />
          </div>
        </a-layout-content>
        <a-layout-footer>{{ copyright }}</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-spin>
</template>
<script>
import { defineComponent, ref, provide } from "vue";
import useLoadUserInfo from "@/hooks/useLoadUserInfo";
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
    const copyright = process.env.VUE_APP_COPYRIGHT;

    const routerKey = ref(new Date().getTime());
    provide("routerKey", routerKey);

    const collapsed = ref(false);
    provide("collapsed", collapsed);

    const { loading } = useLoadUserInfo();

    return {
      routerKey,
      copyright,
      collapsed,
      loading,
    };
  },
});
</script>

<style lang="less" scoped>
.ant-layout {
  height: 100%;
  background: #fff;
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
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    border-radius: 8px;
    border: 5px solid #eee;
    background: #fff;
    > .router-view {
      flex: 1;
      padding-left: 10px;
      padding-right: 4px;
      border-top: 10px solid #fff;
      border-bottom: 10px solid #fff;
      background: #fff;
      overflow-y: scroll;
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
