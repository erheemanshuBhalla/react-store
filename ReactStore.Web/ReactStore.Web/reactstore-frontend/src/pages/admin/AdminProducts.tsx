import { useEffect, useState } from "react";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../../products/adminProductApi";
import { getCategories } from "../../categories/categoryApi";
import type { Category, Product } from "../../types/product";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
const load = async () => {
  setProducts(await getAdminProducts());
  setCategories(await getCategories());
};

  useEffect(() => {
  const load = async () => {
    const [products, categories] = await Promise.all([
      getAdminProducts(),
      getCategories()
    ]);

    setProducts(products);
    setCategories(categories);
  };

  load();
}, []);

  const submit = async () => {
    const data = { name, price, categoryIds: selected };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editId
      ? await updateProduct(editId, data)
      : await createProduct(data);

    setEditId(null);
    setName("");
    setPrice(0);
    setSelected([]);
    const load = async () => {
    const [products, categories] = await Promise.all([
      getAdminProducts(),
      getCategories()
    ]);

    setProducts(products);
    setCategories(categories);
  };
    load();
  };

  const toggle = (id: number) =>
    setSelected(s =>
      s.includes(id) ? s.filter(x => x !== id) : [...s, id]
    );

  return (
    <div className="container mt-4">
      <h3>Products</h3>

      <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input className="form-control mb-2" placeholder="Price" type="number" value={price} onChange={e => setPrice(+e.target.value)} />

      {categories.map(c => (
        <div key={c.id}>
          <input
            type="checkbox"
            checked={selected.includes(c.id)}
            onChange={() => toggle(c.id)}
          /> {c.name}
        </div>
      ))}

      <button className="btn btn-success mt-3" onClick={submit}>
        {editId ? "Update" : "Create"}
      </button>

      <hr />

      {products.map(p => (
        <div key={p.id} className="d-flex justify-content-between border p-2 mb-2">
          <span>{p.name} – ₹{p.price}</span>
          <div>
            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => {
                setEditId(p.id);
                setName(p.name);
                setPrice(p.price);
                setSelected(p.categories.map(c => c.id));
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteProduct(p.id).then(load)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
