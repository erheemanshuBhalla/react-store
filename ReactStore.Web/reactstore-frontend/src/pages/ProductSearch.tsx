import { useEffect, useState } from "react";
import { searchProducts } from "../products/productsApi";
import type { Product } from "../types/product";
import { saveCart, getCart } from "../utils/cart";
import { toast } from "react-toastify";

export default function ProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string>("price_asc");
  const addToCart = (productId: number, price: number) => {
  const cart = getCart();
  const item = cart.find(c => c.productId === productId);

  if (item) item.quantity++;
  else cart.push({ productId, price, quantity: 1 });

  saveCart(cart);
  toast.success("Added to cart");
};
  useEffect(() => {
    searchProducts({
      page,
      pageSize: 6,
      sort
    }).then(setProducts);
  }, [page, sort]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h3>Products</h3>

        <select
          className="form-select w-25"
          onChange={e => setSort(e.target.value)}
        >
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
        </select>
      </div>

      <div className="row mt-3">
        {products.map(p => (
          <div key={p.id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>₹{p.price}</p>
                <button
          className="btn btn-sm btn-success"
          onClick={() => addToCart(p.id, p.price)}
        >
          Add to Cart
        </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          className="btn btn-secondary"
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
