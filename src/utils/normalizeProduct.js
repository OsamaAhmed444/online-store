// The real API returns Mongo documents keyed by `_id`; normalize to `id`
// once at the data boundary so every component can just use `product.id`.
export const normalizeProduct = (product) => {
  if (!product) return product;

  return { ...product, id: product._id || product.id };
};

export const normalizeProducts = (products) =>
  Array.isArray(products) ? products.map(normalizeProduct) : [];

export default normalizeProduct;
