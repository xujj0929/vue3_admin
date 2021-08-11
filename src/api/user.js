import request from "@/utils/request";

export const userLogin = (data) => request.post("/user/login", data);
export const getUserInfo = () => request.get("/user/info");
export const getUserRouter = () => request.get("/user/router");
