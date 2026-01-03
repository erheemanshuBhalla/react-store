import api from "../api/axios";
import type { OrderDetails } from "../types/order";

export const myOrders = async (): Promise<OrderDetails[]> => {
  const res = await api.get<OrderDetails[]>("/orders");
  return res.data;
};



export const getOrderDetails = async (id: number) => {
  const res = await api.get<OrderDetails>(`/orders/${id}`);
  return res.data;
};