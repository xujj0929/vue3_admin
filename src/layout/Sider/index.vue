<template>
  <div class="logo" />
  <a-menu
    mode="inline"
    theme="dark"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @select="onSelectMenu"
  >
    <a-menu-item key="home">
      <template #icon>
        <HomeOutlined />
      </template>
      首页
    </a-menu-item>
    <template v-for="item in routes" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.name">
          <template #icon>
            <component :is="item.meta.icon || 'BarsOutlined'" />
          </template>
          {{ item.meta.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.name" />
      </template>
    </template>
  </a-menu>
</template>
<script>
import { defineComponent, watch, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import SubMenu from "./SubMenu";

export default defineComponent({
  components: {
    SubMenu,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const selectedKeys = ref(["home"]);
    const openKeys = ref([]);
    const routes = inject("routes");

    const onSelectMenu = (e) => {
      router.push({ name: e.key });
    };

    watch(route, (val) => {
      selectedKeys.value = [val.name];
      if (openKeys.value.length) return;
      openKeys.value = route.matched.map((e) => e.name);
    });

    return {
      routes,
      openKeys,
      selectedKeys,
      onSelectMenu,
    };
  },
});
</script>

<style lang="less" scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
.ant-menu {
  height: calc(100% - 70px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
}
.ant-menu-inline-collapsed {
  :deep(.ant-menu-submenu-selected) {
    background: #1890ff;
  }
}
</style>
