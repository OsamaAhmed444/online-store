// This storefront is scoped to show only the products tagged for this team.
export const TEAM_PRODUCT_TAG = "team-1-product";

const normalize = (value) => String(value || "").trim().toLowerCase();

export const isTeamProduct = (product) =>
  normalize(product?.subcategory) === TEAM_PRODUCT_TAG;

export const filterTeamProducts = (products) =>
  (Array.isArray(products) ? products : []).filter(isTeamProduct);

export default filterTeamProducts;
