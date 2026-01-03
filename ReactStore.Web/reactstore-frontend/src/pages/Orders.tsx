import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Orders</h3>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td>{o.status}</td>
              <td>₹{o.totalAmount}</td>
              <td>
                <Link
                  className="btn btn-sm btn-primary"
                  to={`/orders/${o.id}`}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
