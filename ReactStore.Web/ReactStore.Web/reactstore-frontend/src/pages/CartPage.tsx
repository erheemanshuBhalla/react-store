import { useState } from "react";
import { type CartItem, getCart, saveCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(getCart());
  const navigate = useNavigate();

  const updateQty = (productId: number, qty: number) => {
    if (qty < 1) return;

    const updated = cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: qty }
        : item
    );

    setCart(updated);
    saveCart(updated);
  };

  const removeItem = (productId: number) => {
    const updated = cart.filter(i => i.productId !== productId);
    setCart(updated);
    saveCart(updated);
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  if (!cart.length) {
    return <div className="container mt-4">Cart is empty</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Cart</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {cart.map(item => (
            <tr key={item.productId}>
              <td>#{item.productId}</td>
              <td>₹{item.price}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e =>
                    updateQty(item.productId, Number(e.target.value))
                  }
                  style={{ width: 60 }}
                />
              </td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5>Total: ₹{total}</h5>

      <button
        className="btn btn-success"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
}
