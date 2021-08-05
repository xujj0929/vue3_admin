<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    @submit="onSubmit"
    scrollToFirstError
  >
    <a-form-item name="username">
      <a-input
        type="text"
        v-model:value="formState.username"
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
    <a-form-item>
      <a-button type="primary" htmlType="submit">立即登录</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";

// import { userLogin } from "@/api/user";

export default defineComponent({
  setup() {
    const router = useRouter();
    const formRef = ref();
    const formState = reactive({
      username: "",
      password: "",
      type: "business",
      setup: false,
    });
    const rules = {
      username: [
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

    const onSubmit = async () => {
      // const res = await userLogin(toRaw(formState));
      // res && console.info(res);
      localStorage.setItem("token", toRaw(formState));
      router.push("/");
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formRef,
      formState,
      rules,
      onSubmit,
      resetForm,
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
  &::before {
    display: block;
    content: "登录";
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 20px;
  }
  &::after {
    display: block;
    content: "Copyright © 2018-2020 渝ICP备18008972号-1";
    text-align: center;
  }
}
</style>
