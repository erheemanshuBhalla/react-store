import api from "../api/axios";
import type { Category } from "../types/product";


export const getCategories = async (): Promise<Category[]> =>
  (await api.get<Category[]>("/categories")).data;

export const createCategory = async (name: string): Promise<void> =>
  api.post("/categories", { name });

export const updateCategory = async (id: number, name: string): Promise<void> =>
  api.put(`/categories/${id}`, { name });

export const deleteCategory = async (id: number): Promise<void> =>
  api.delete(`/categories/${id}`);