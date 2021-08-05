<template>
  <a-dropdown v-if="userInfo" :trigger="['click']">
    <a class="ant-dropdown-link" @click.prevent>
      {{ userInfo.name }}
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a>个人资料</a>
        </a-menu-item>
        <a-menu-item>
          <a>修改密码</a>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <a-button type="link" @click="onClickLogout">退出登录</a-button>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
import { defineComponent, inject } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const userInfo = inject("userInfo");

    const onClickLogout = () => {
      userInfo.value = null;
      localStorage.removeItem("token");
      router.push({ name: "login" });
    };

    return {
      userInfo,
      onClickLogout,
    };
  },
});
</script>
