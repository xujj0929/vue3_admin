<template>
  <a-breadcrumb>
    <template v-for="item in route.matched" :key="item.name">
      <a-breadcrumb-item v-if="item.meta.title" @click="onClick(item)">
        <component :is="item.meta.icon || 'HomeOutlined'" />
        {{ item.meta.title }}
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const onClick = ({ path, children }) => {
      if (path === "/") return router.push(path);
      if (children && children.length) return;
      router.push(path);
    };
    return {
      route,
      onClick,
    };
  },
});
</script>
<style lang="less" scoped>
.ant-breadcrumb {
  :deep(.ant-breadcrumb-link) {
    cursor: pointer;
  }
}
</style>
