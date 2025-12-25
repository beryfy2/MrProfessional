import { useEffect, useState } from "react";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../lib/blogApi";

interface Category {
  _id: string;
  name: string;
}

export default function BlogCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    setError("");
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (e) {
      const msg =
        typeof e === "object" && e && "message" in e
          ? String((e as any).message)
          : "Failed to load categories";
      setError(msg);
    }
  };

  const addCategory = async () => {
    setError("");
    const name = newCategory.trim();
    if (!name) {
      setError("Category name is required");
      return;
    }
    setLoading(true);
    try {
      await createCategory(name);
      setNewCategory("");
      await loadCategories();
    } catch (e) {
      const msg =
        typeof e === "object" && e && "message" in e
          ? String((e as any).message)
          : "Failed to add category";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const removeCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    setError("");
    setLoading(true);
    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (e) {
      const msg =
        typeof e === "object" && e && "message" in e
          ? String((e as any).message)
          : "Failed to delete category";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="page">
      <h2>Blog Categories</h2>

      <div className="card">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name"
          onKeyDown={(e) => {
            if (e.key === "Enter") addCategory();
          }}
        />
        <button onClick={addCategory} disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
        {error && (
          <p style={{ color: "#b91c1c", marginTop: 10 }}>{error}</p>
        )}
      </div>

      <ul className="list">
        {categories.length === 0 && <p>No categories yet</p>}
        {categories.map((cat) => (
          <li key={cat._id}>
            {cat.name}
            <button onClick={() => removeCategory(cat._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
