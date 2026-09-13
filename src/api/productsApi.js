import api from "./axios";

export const getProducts = (params) => api.get("/products", { params });

export const searchProducts = (params) =>
  api.get("/products/search", { params });

export const getProduct = (id) => api.get(`/products/${id}`);

export const getProductReviews = (id, params) =>
  api.get(`/products/${id}/reviews`, { params });

export const addProductReview = (id, data) =>
  api.post(`/products/${id}/reviews`, data);

export const deleteProductReview = (id, reviewId) =>
  api.delete(`/products/${id}/reviews/${reviewId}`);
