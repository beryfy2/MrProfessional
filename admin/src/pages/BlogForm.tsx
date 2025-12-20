import { useState } from "react";
import BlogEditor from "../components/BlogEditor";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const saveBlog = () => {
    const payload = { title, category, content };
    console.log("Saving Blog:", payload);
    alert("Blog saved (API later)");
  };

  return (
    <div className="page">
      <h2>Add / Edit Blog</h2>

      <div className="card">
        <input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {/* categories from API later */}
          <option>GST</option>
          <option>MSME</option>
          <option>NGO</option>
        </select>

        <BlogEditor value={content} onChange={setContent} />

        <button onClick={saveBlog}>Save Blog</button>
      </div>
    </div>
  );
}
