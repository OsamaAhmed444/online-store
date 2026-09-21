export const resolveImageUrl = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.url || image.secure_url || "";
};

export const getProductImages = (product) => {
  const images = product?.images || product?.imageUrls || [];
  const list = Array.isArray(images) ? images : [];
  const resolved = list.map(resolveImageUrl).filter(Boolean);

  if (resolved.length) return resolved;

  const single = resolveImageUrl(product?.image || product?.thumbnail);
  return single ? [single] : [];
};

export default getProductImages;
