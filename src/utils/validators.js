export const isRequired = (value) =>
  String(value ?? "").trim().length > 0;

export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());

export const isValidPhone = (value) =>
  /^[0-9+\s()-]{7,15}$/.test(String(value || "").trim());

export const isValidPassword = (value) =>
  String(value || "").length >= 6;

export const passwordsMatch = (password, confirmPassword) =>
  String(password || "") === String(confirmPassword || "");
