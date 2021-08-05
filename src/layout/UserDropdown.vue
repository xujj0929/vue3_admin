<template>
  <a-dropdown v-if="userInfo" :trigger="['click']">
    <a-button type="link">
      {{ userInfo.name }}
      <DownOutlined />
    </a-button>
    <template #overlay>
      <a-menu>
        <a-menu-item> 个人资料 </a-menu-item>
        <a-menu-item> 修改密码 </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="onClickLogout"> 退出登录 </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { defineComponent, createVNode, inject } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
export default defineComponent({
  setup() {
    const router = useRouter();
    const userInfo = inject("userInfo");

    const onClickLogout = () => {
      Modal.confirm({
        title: "确定退出登录？",
        icon: createVNode(ExclamationCircleOutlined),
        okText: "取消",
        okButtonProps: {
          type: "primary",
        },
        cancelText: "确定",
        cancelButtonProps: {
          type: "primary",
          danger: true,
        },
        onCancel() {
          userInfo.value = null;
          localStorage.removeItem("token");
          router.push({ name: "login" });
        },
      });
    };

    return {
      userInfo,
      onClickLogout,
    };
  },
});
</script>
