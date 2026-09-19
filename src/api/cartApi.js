import api from "./axios";

export const get = () => api.get("/s");

export const addItem = (data) => api.post("/s/items", data);

export const updateItem = (data) => api.patch("/s/items", data);

export const removeItem = (productId) =>
  api.delete(`/s/items/${productId}`);

export const applyCoupon = (data) => api.post("/s/coupon", data);

export const removeCoupon = () => api.delete("/s/coupon");

export const clear = () => api.delete("/s/clear");
