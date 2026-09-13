import api from "./axios";

export const updateProfile = (id, data) => api.patch(`/users/${id}`, data);
