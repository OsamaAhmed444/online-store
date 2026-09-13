import api from "./axios";

export const sendRegisterOtp = (data) =>
  api.post("/auth/register/send-otp", data);

export const verifyRegisterOtp = (data) =>
  api.post("/auth/register/verify-otp", data);

export const login = (data) => api.post("/auth/login", data);

export const logout = () => api.post("/auth/logout");

export const sendForgotPasswordOtp = (data) =>
  api.post("/auth/forgot-password/send-otp", data);

export const verifyForgotPasswordOtp = (data) =>
  api.post("/auth/forgot-password/verify-otp", data);

export const getMe = () => api.get("/auth/me");
