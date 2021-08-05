<template>
  <router-view />
</template>

<script>
import { defineComponent, watch, onErrorCaptured } from "vue";
import { notification } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    watch(route, () => {
      //判断是否刷新页面 跳转到首页添加重新向
      if (route.name) return;
      router.push(
        "/?replace=" + encodeURIComponent(route.fullPath.toLowerCase())
      );
    });
    onErrorCaptured((err) => {
      if (err && typeof err == "string") {
        notification.warning({
          message: "提示",
          description: err,
        });
      }
    });
  },
});
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #eee;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(133, 133, 133, 0.7);
}
</style>
