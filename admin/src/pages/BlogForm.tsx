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
      <h2>{id ? "Edit Blog" : "Add Blog"}</h2>

      <div className="card">
        <input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* STATUS TOGGLE */}
        <div className="status-toggle">
          <label>
            <input
              type="radio"
              name="status"
              checked={status === "draft"}
              onChange={() => setStatus("draft")}
            />
            Draft
          </label>

          <label>
            <input
              type="radio"
              name="status"
              checked={status === "published"}
              onChange={() => setStatus("published")}
            />
            Published
          </label>
        </div>

        <BlogEditor value={content} onChange={setContent} />

        <button onClick={saveBlog}>Save Blog</button>
      </div>
    </div>
  );
}
