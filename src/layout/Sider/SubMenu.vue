<template>
  <a-sub-menu v-if="menuInfo" :key="menuInfo.name">
    <template #icon>
      <component :is="menuInfo.meta.icon || 'BarsOutlined'" />
    </template>
    <template #title>{{ menuInfo.meta.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <template v-if="item.children && item.children.length">
        <sub-menu :menu-info="item" :key="item.key" />
      </template>
      <template v-else>
        <a-menu-item :key="item.name">
          <template #icon>
            <component :is="item.meta.icon || 'BarsOutlined'" />
          </template>
          {{ item.meta.title }}
        </a-menu-item>
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "sub-menu",
  props: {
    menuInfo: Object,
  },
});
</script>

<style></style>
