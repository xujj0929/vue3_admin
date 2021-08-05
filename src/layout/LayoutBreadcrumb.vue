<template>
  <a-breadcrumb>
    <template v-for="item in route.matched" :key="item.name">
      <a-breadcrumb-item v-if="item.meta.title">
        <component :is="item.meta.icon || 'HomeOutlined'" />
        {{ item.meta.title }}
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
});
</script>
