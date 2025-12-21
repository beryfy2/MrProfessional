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

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    await createCategory(newCategory);
    setNewCategory("");
    loadCategories();
  };

  const removeCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    loadCategories();
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
        />
        <button onClick={addCategory}>Add Category</button>
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
