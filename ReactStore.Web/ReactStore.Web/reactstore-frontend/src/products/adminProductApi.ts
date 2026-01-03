import api from "../api/axios";
import type { Product } from "../types/product";

export interface CreateOrUpdateProduct {
  name: string;
  description?: string;
  price: number;
  categoryIds: number[];
}

export const getAdminProducts = async (): Promise<Product[]> =>
  (await api.get<Product[]>("/products")).data;

export const createProduct = async (data: CreateOrUpdateProduct) =>
  api.post("/products", data);

export const updateProduct = async (id: number, data: CreateOrUpdateProduct) =>
  api.put(`/products/${id}`, data);

export const deleteProduct = async (id: number) =>
  api.delete(`/products/${id}`);
