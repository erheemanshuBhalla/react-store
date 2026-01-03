import { useEffect, useState } from "react";
import { myOrders } from "../orders/orderApi";
import type { OrderDetails } from "../types/order";

export default function MyOrders() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    myOrders().then(setOrders);
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Orders</h3>

      {orders.map(o => (
        <div className="card mb-2" key={o.Id}>
          <div className="card-body">
            <b>Order #{o.Id}</b>
            <div>Status: {o.status}</div>
            <div>Total: ₹{o.totalAmount}</div>
            <small>{new Date(o.createdAt).toLocaleDateString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
