import { useCallback, useEffect,  useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../categories/categoryApi";
import type { Category } from "../../types/product";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
 //const loadedRef = useRef(false);

  const load = useCallback(async () => {
    const data = await getCategories();
    setCategories(data);
  }, []);

 

  useEffect(() => {
    const load = async () => {

      const [categories] = await Promise.all([
        getCategories()
      ]);
  
     
      setCategories(categories);
    };
  
    load();
  }, []);

  const submit = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editId
      ? await updateCategory(editId, name)
      : await createCategory(name);

    setName("");
    setEditId(null);
    load();
  };

  return (
    <div className="container mt-4">
      <h3>Categories</h3>

      <input
        className="form-control mb-2"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={submit}>
        {editId ? "Update" : "Add"}
      </button>

      <ul className="list-group">
        {categories.map(c => (
          <li key={c.id} className="list-group-item d-flex justify-content-between">
            {c.name}
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => {
                  setEditId(c.id);
                  setName(c.name);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteCategory(c.id).then(load)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
