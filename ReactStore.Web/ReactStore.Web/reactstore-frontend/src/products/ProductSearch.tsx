import { useEffect, useState } from "react";
import { searchProducts } from "../products/productsApi";
import type { Product } from "../types/product";

export default function ProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    searchProducts({}).then(setProducts);
  }, []);

  return (
    <>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id}>
          <b>{p.name}</b> – ₹{p.price}
          <div>
            Categories: {p.categories.map(c => c.name).join(", ")}
          </div>
        </div>
      ))}
    </>
  );
}
