import api from "./axios";

export const placeOrder = (data) => api.post("/orders", data);

export const getMyOrders = (params) => api.get("/orders/my", { params });

export const getMyOrder = (id) => api.get(`/orders/my/${id}`);

export const cancelMyOrder = (id) => api.patch(`/orders/my/${id}/cancel`);
