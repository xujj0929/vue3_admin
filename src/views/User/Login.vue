<template>
  <a-form ref="formRef" :model="formState" :rules="rules" scrollToFirstError>
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
      <a-button
        type="primary"
        htmlType="submit"
        @click="onSubmit"
        :loading="loading"
      >
        立即登录
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const formRef = ref();
    const formState = reactive({
      username: "",
      password: "",
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
      try {
        await formRef.value.validate();
        loading.value = true;
        setTimeout(() => {
          //调用登录接口 保存token到本地
          localStorage.setItem("token", toRaw(formState));
          router.push("/");
          loading.value = false;
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      loading,
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
