import axios from "axios";
import md5 from "js-md5";
import { notification } from "ant-design-vue";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

// request拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = localStorage.getItem("token") || "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    const code = res.code;
    if (code == 200) return res.data || true;
    const message = res.message;
    if (message) {
      notification.warning({
        key: md5(message),
        message: "提示",
        description: message,
      });
    }
    if (code == 401) {
      localStorage.removeItem("token");
      location.href = "/";
      location.replace();
    }
    return Promise.reject(res);
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default {
  get: (url, params, config) =>
    instance.get(url, {
      params,
      ...config,
    }),
  post: (url, data, config) => instance.post(url, data, config),
  delete: (url, params, config) =>
    instance.delete(url, {
      params,
      ...config,
    }),
  put: (url, data, config) => instance.put(url, data, config),
};
