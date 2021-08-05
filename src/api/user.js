import request from "@/utils/request";

export const userLogin = (data) => request.post("/hsh-auth/auth/login", data);
