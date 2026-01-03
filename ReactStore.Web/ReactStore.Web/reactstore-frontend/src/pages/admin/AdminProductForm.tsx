import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import api from "../../api/axios";
import type { Category } from "../../types/product";

interface CategoryOption {
  value: number;
  label: string;
}

interface ProductForm {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export default function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    stock: 0
  });

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // 🔹 Load all categories (for autocomplete)
  useEffect(() => {
    api.get("/categories").then(res => {
      setCategories(
        res.data.map((c: Category) => ({
          value: c.id,
          label: c.name
        }))
      );
    });
  }, []);

  // 🔹 Edit mode: prefill product, categories & image
  useEffect(() => {
    if (!id || categories.length === 0) return;

    const load = async () => {
      const productRes = await api.get(`/products/${id}`);
      const categoryIdsRes = await api.get(`/products/${id}/categories`);

      setForm({
        name: productRes.data.name,
        description: productRes.data.description,
        price: productRes.data.price,
        stock: productRes.data.stock
      });

      setSelectedCategories(
        categories.filter(c => categoryIdsRes.data.includes(c.value))
      );

      if (productRes.data.imageUrl) {
        setPreview(`https://localhost:7184${productRes.data.imageUrl}`);
      }
    };

    load();
  }, [id, categories]);

  // 🔹 Image upload + preview + replace
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔹 Submit (Create / Update)
  const submit = async () => {
    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price.toString());
    data.append("stock", form.stock.toString());

    selectedCategories.forEach(c =>
      data.append("CategoryIds", c.value.toString())
    );

    if (image) data.append("Image", image);

    if (id) {
      await api.put(`/products/${id}`, data);
    } else {
      await api.post("/products", data);
    }

    navigate("/admin/products");
  };

  return (
    <div className="container mt-4">
      <h4>{id ? "Edit Product" : "Create Product"}</h4>

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: +e.target.value })}
      />

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Stock"
        value={form.stock}
        onChange={e => setForm({ ...form, stock: +e.target.value })}
      />

      {/* 🔹 Category Autocomplete (Multi-select) */}
      <Select
        isMulti
        options={categories}
        value={selectedCategories}
        onChange={v => setSelectedCategories(v as CategoryOption[])}
        placeholder="Select categories"
        className="mb-3"
      />

      {/* 🔹 Image Upload */}
      <input
        type="file"
        className="form-control"
        onChange={onImageChange}
      />

      {/* 🔹 Image Preview */}
      {preview && (
        <img
          src={preview}
          className="img-thumbnail mt-2"
          style={{ maxHeight: 200 }}
        />
      )}

      <button className="btn btn-primary mt-3" onClick={submit}>
        Save
      </button>
    </div>
  );
}
