import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../orders/orderApi";
import type { OrderDetails } from "../types/order";
//import api from "../api/axios";
//import { toast } from "react-toastify";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetails>();
//const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) getOrderDetails(+id).then(setOrder);
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Order #{order.Id}</h3>
      <p>Status: <b>{order.status}</b></p>
      

      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((i, idx) => (
            <tr key={idx}>
              <td>{i.productId}</td>
              <td>{i.quantity}</td>
              <td>₹{i.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5>Total: ₹{order.totalAmount}</h5>
    </div>
  );
}
