import api from "../api/axios";
import type { CartItem } from "../utils/cart";

export const checkout = async (items: CartItem[]) => {
  await api.post("/orders", {
    items
  });
};
