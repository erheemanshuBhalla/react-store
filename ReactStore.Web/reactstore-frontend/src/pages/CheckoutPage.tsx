import { useState } from "react";
import api from "../api/axios";
import { getCart, clearCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cart = getCart();

  const placeOrder = async () => {
    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    if (!address.trim()) {
      toast.warning("Address required");
      return;
    }

    setLoading(true);

    await api.post("/orders", {
      address,
      items: cart.map(i => ({
        productId: i.productId,
        quantity: i.quantity
      }))
    });

    clearCart();
    toast.success("Order placed successfully");
    navigate("/orders");
  };

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>

      <textarea
        className="form-control mb-3"
        placeholder="Delivery address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />

      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={placeOrder}
      >
        {loading ? "Placing..." : "Place Order"}
      </button>
    </div>
  );
}
