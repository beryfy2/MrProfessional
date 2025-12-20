import { useState } from "react";

export default function BlogCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (!newCategory.trim()) return;
    setCategories([...categories, newCategory]);
    setNewCategory("");
  };

  const deleteCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

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
        {categories.map((cat, i) => (
          <li key={i}>
            {cat}
            <button onClick={() => deleteCategory(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
