import { ref, provide } from "vue";
export default () => {
  const loading = ref(true);
  const userInfo = ref(null);
  provide("userInfo", userInfo);

  setTimeout(() => {
    userInfo.value = { name: "许佳俊" };
    loading.value = false;
  }, 1000);

  return {
    loading,
    userInfo,
  };
};
