import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

export default function AdminCategoryForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {
    if (!id) return;

    api.get(`/categories/${id}`).then(res => {
      setName(res.data.name);
    });
  }, [id]);

  const submit = async () => {
    if (id) {
      await api.put(`/categories/${id}`, { name });
    } else {
      await api.post("/categories", { name });
    }

    navigate("/admin/categories");
  };

  return (
    <div className="container mt-4">
      <h4>{id ? "Edit Category" : "Create Category"}</h4>

      <input
        className="form-control mb-2"
        placeholder="Category name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button className="btn btn-primary" onClick={submit}>
        Save
      </button>
    </div>
  );
}
