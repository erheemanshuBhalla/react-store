export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  productName: string;
}

export interface OrderDetails {
  Id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  userEmail:string;
  address: string;
  items: OrderItem[];
}
/*export interface OrderSummary {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}*/
export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}
export interface Dashboard {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: OrderDetails[];
}