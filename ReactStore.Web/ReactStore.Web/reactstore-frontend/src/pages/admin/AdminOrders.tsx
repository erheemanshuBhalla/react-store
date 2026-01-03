import { useEffect, useState } from "react";
import api from "../../api/axios";

interface AdminOrder {
  id: number;
  totalAmount: number;
  status: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    api.get("/admin/orders").then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await api.put(`/orders/${id}/status`, { status });
    setOrders(o =>
      o.map(x => x.id === id ? { ...x, status } : x)
    );
  };

  return (
    <div className="container mt-4">
      <h3>Manage Orders</h3>

      {orders.map(o => (
        <div key={o.id} className="d-flex justify-content-between mb-2">
          <span>
            #{o.id} – ₹{o.totalAmount}
          </span>

          <select
            value={o.status}
            onChange={e => updateStatus(o.id, e.target.value)}
          >
            <option>Pending</option>
            <option>Paid</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}
