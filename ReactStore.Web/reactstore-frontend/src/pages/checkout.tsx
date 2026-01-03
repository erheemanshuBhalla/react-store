import { useState } from "react";
import { getCart, saveCart } from "../utils/cart";
import { checkout } from "../orders/checkoutApi";
import { toast } from "react-toastify";

export default function Checkout() {
  const [cart, setCart] = useState(getCart());

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity, 0
  );

  const placeOrder = async () => {
    await checkout(cart);
    saveCart([]);
    setCart([]);
    toast.success("Order placed!");
    window.location.href = "/orders";
  };

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>

      {cart.map((i, idx) => (
        <div key={idx} className="d-flex justify-content-between">
          <span>Product #{i.productId}</span>
          <span>{i.quantity} × ₹{i.price}</span>
        </div>
      ))}

      <hr />
      <h5>Total: ₹{total}</h5>

      <button className="btn btn-success" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}
