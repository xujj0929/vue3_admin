<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    @finish="onFinish"
    scrollToFirstError
  >
    <a-divider>
      <a-typography-title :level="3">登录</a-typography-title>
    </a-divider>
    <a-form-item name="account">
      <a-input
        type="text"
        v-model:value="formState.account"
        placeholder="请输入账号"
      />
    </a-form-item>
    <a-form-item name="password">
      <a-input
        type="password"
        v-model:value="formState.password"
        placeholder="请输入密码"
      />
    </a-form-item>
    <a-form-item name="setup">
      <a-row type="flex" justify="space-between" align="middle">
        <a-checkbox v-model:checked="formState.setup">记住密码</a-checkbox>
        <router-link :to="{ name: 'login' }">忘记密码</router-link>
      </a-row>
    </a-form-item>
    <a-button type="primary" htmlType="submit" :loading="loading" block>
      立即登录
    </a-button>
    <a-divider>{{ copyright }}</a-divider>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useRequest } from "vue-request";

import { userLogin } from "@/api/user";

export default defineComponent({
  setup() {
    const router = useRouter();
    const copyright = process.env.VUE_APP_COPYRIGHT;
    const formRef = ref();
    const formState = reactive({
      account: "",
      password: "",
      setup: false,
    });
    const rules = {
      account: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
    };

    const { run, data, loading } = useRequest(userLogin, {
      manual: true,
    });

    const onFinish = async () => {
      try {
        await formRef.value.validate();
        await run(toRaw(formState));
        if (!data.value) return;
        localStorage.setItem("token", data.value);
        router.push({ name: "home" });
      } catch (error) {
        console.error("error", error);
      }
    };

    return {
      loading,
      copyright,
      formRef,
      formState,
      rules,
      onFinish,
    };
  },
});
</script>

<style lang="less" scoped>
.ant-form {
  user-select: none;
  width: 400px;
  margin: 0 auto;
  margin-top: 15vh;
  padding: 20px 20px 10px;
  border-radius: 5px;
  background: #fff;
}
</style>
