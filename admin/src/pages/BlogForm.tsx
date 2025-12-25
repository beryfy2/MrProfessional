import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogEditor from "../components/BlogEditor";
import {
  fetchCategories,
  fetchBlogById,
  createBlog,
  updateBlog,
} from "../lib/blogApi";

interface Category {
  _id: string;
  name: string;
}

type BlogPayload = {
  title: string;
  content: string;
  category: string;
  status: "draft" | "published";
};

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const loadBlog = async () => {
    if (!id) return;
    const blog = await fetchBlogById(id);

    setTitle(blog.title);
    setContent(blog.content);
    setCategory(blog.category?._id);
    setStatus(blog.status);
  };

  const saveBlog = async () => {
    if (!title || !category || !content) {
      alert("All fields are required");
      return;
    }

    const payload: BlogPayload = {
      title,
      content,
      category,
      status,
    };

    if (id) {
      await updateBlog(id, payload);
    } else {
      await createBlog(payload);
    }

    navigate("/admin/blogs");
  };

  useEffect(() => {
    loadCategories();
    loadBlog();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{id ? "Edit Blog" : "Create New Blog"}</h1>
          <p className="page-subtitle">
            {id ? "Update your blog post" : "Write and publish a new blog post"}
          </p>
        </div>
        <button className="btn" onClick={() => navigate("/admin/blogs")}>
          ← Back to Blogs
        </button>
      </div>

      <div className="card blog-form-card">
        <div className="form-section">
          <label className="form-label">
            <span className="label-text">Blog Title</span>
            <span className="label-hint">Enter a compelling title for your blog post</span>
          </label>
          <input
            className="form-input"
            placeholder="e.g., 10 Tips for Better Business Management"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label className="form-label">
            <span className="label-text">Category</span>
            <span className="label-hint">Select or create a category for this post</span>
          </label>
          <select 
            className="form-select"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label className="form-label">
            <span className="label-text">Publication Status</span>
            <span className="label-hint">Choose whether to publish now or save as draft</span>
          </label>
          <div className="status-toggle">
            <label className={`status-option ${status === "draft" ? "active" : ""}`}>
              <input
                type="radio"
                name="status"
                checked={status === "draft"}
                onChange={() => setStatus("draft")}
              />
              <span className="status-label">
                <span className="status-icon">📝</span>
                Draft
              </span>
            </label>

            <label className={`status-option ${status === "published" ? "active" : ""}`}>
              <input
                type="radio"
                name="status"
                checked={status === "published"}
                onChange={() => setStatus("published")}
              />
              <span className="status-label">
                <span className="status-icon">✅</span>
                Published
              </span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <BlogEditor value={content} onChange={setContent} />
        </div>

        <div className="form-actions">
          <button className="btn" onClick={() => navigate("/admin/blogs")}>
            Cancel
          </button>
          <button className="btn primary" onClick={saveBlog}>
            <span className="btn-icon">💾</span>
            {id ? "Update Blog" : "Publish Blog"}
          </button>
        </div>
      </div>
    </div>
  );
}
