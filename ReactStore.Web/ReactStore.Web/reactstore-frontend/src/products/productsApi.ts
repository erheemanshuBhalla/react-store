import api from "../api/axios";
import type { Product, ProductSearchParams } from "../types/product";

export const searchProducts = async (
  params: ProductSearchParams
): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products/search", { params });
  return res.data;
};
