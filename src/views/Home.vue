<template>
  <div>{{ userInfo }}</div>
  <div>{{ routes }}</div>
</template>

<script>
import { defineComponent, inject } from "vue";
export default defineComponent({
  setup() {
    const userInfo = inject("userInfo");
    const routes = inject("routes");

    return {
      userInfo,
      routes,
    };
  },
});
</script>
