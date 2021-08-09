<template>
  <div class="layout-breadcrumb">
    <a-breadcrumb>
      <template v-for="item in route.matched" :key="item.name">
        <a-breadcrumb-item v-if="item.meta.title">
          <component :is="item.meta.icon || 'HomeOutlined'" />
          {{ item.meta.title }}
        </a-breadcrumb-item>
      </template>
    </a-breadcrumb>
    <div class="icon-list">
      <ReloadOutlined @click="onReload" />
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const route = useRoute();
    const routerKey = inject("routerKey");

    const onReload = () => {
      routerKey.value = new Date().getTime();
    };

    return {
      route,
      onReload,
    };
  },
});
</script>

<style lang="less" scoped>
.layout-breadcrumb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  user-select: none;
  position: sticky;
  top: 0;
  padding: 5px;
  background: #fff;
  border-bottom: 2px solid #eee;
  z-index: 2;
  .icon-list {
    > span {
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
