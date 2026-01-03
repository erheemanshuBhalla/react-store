export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  categories: Category[];
}

export interface ProductSearchParams {
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  sort?: string;
  page?: number;
  pageSize?: number;
}
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
}
