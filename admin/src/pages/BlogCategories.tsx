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
      <div className="page-header">
        <div>
          <h1>Blog Categories</h1>
          <p className="page-subtitle">Organize your blog posts with categories</p>
        </div>
      </div>

      <div className="card">
        <div className="form-section">
          <label className="form-label">
            <span className="label-text">Add New Category</span>
            <span className="label-hint">Create a new category for your blog posts</span>
          </label>
          <div className="category-input-group">
            <input
              className="form-input"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g., Technology, Business, Marketing"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addCategory();
                }
              }}
            />
            <button className="btn primary" onClick={addCategory}>
              <span className="btn-icon">+</span>
              Add Category
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Existing Categories</h3>
        {categories.length === 0 ? (
          <div className="empty-state-small">
            <p className="empty-text">No categories yet</p>
            <p className="empty-subtext">Add your first category above</p>
          </div>
        ) : (
          <ul className="categories-list">
            {categories.map((cat) => (
              <li key={cat._id} className="category-item">
                <div className="category-info">
                  <span className="category-icon">📂</span>
                  <span className="category-name">{cat.name}</span>
                </div>
                <button 
                  className="btn-icon-only btn-delete"
                  onClick={() => removeCategory(cat._id)}
                  title="Delete category"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
