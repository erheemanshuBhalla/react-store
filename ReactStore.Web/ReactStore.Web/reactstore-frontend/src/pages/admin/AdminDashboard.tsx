import { useEffect, useState } from "react";
import api from "../../api/axios";
import type { Dashboard } from "../../types/order";

export default function AdminDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);

  useEffect(() => {
    api.get("/admin/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>

      <div className="row mb-4">
        <Stat title="Orders" value={data.totalOrders} />
        <Stat title="Revenue" value={`₹${data.totalRevenue}`} />
        <Stat title="Users" value={data.totalUsers} />
        <Stat title="Products" value={data.totalProducts} />
      </div>

      <h5>Recent Orders</h5>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order</th>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.recentOrders.map(o => (
            <tr key={o.Id}>
              <td>#{o.Id}</td>
              <td>{o.userEmail}</td>
              <td>₹{o.totalAmount}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="col-md-3">
      <div className="card text-center">
        <div className="card-body">
          <h6>{title}</h6>
          <h4>{value}</h4>
        </div>
      </div>
    </div>
  );
}
