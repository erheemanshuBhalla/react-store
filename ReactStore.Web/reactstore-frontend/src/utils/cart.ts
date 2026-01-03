export interface CartItem {
  productId: number;
  price: number;
  quantity: number;
}

const CART_KEY = "cart";

export const getCart = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
