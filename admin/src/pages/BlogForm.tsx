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
  content?: string;
  sections?: { heading: string; content: string }[];
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
  const [sectionCount, setSectionCount] = useState<number>(0);
  const [sections, setSections] = useState<{ heading: string; content: string }[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchCategories();
        if (mounted) setCategories(data);
      } catch {
        if (mounted) setCategories([]);
      }
      if (id) {
        try {
          const blog = await fetchBlogById(id);
          if (mounted) {
            setTitle(blog.title);
            setContent(blog.content);
            const bSections = (blog as unknown as { sections?: { heading?: string; content?: string }[] }).sections || [];
            const loaded = Array.isArray(bSections) ? bSections : [];
            const normalized = loaded.map((s: { heading?: string; content?: string }) => ({
              heading: String(s?.heading || ""),
              content: String(s?.content || "")
            }));
            setSections(normalized);
            setSectionCount(normalized.length);
            const cat = blog.category as unknown;
            let catId = "";
            if (typeof cat === "string") {
              catId = cat;
            } else if (cat && typeof cat === "object" && "_id" in cat) {
              const maybe = (cat as { _id?: unknown })._id;
              catId = typeof maybe === "string" ? maybe : "";
            }
            setCategory(catId);
            setStatus(blog.status);
          }
        } catch {
          // ignore load error
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);
  useEffect(() => {
    const next = [...sections];
    if (sectionCount > next.length) {
      for (let i = next.length; i < sectionCount; i++) {
        next.push({ heading: "", content: "" });
      }
    } else if (sectionCount < next.length) {
      next.length = sectionCount;
    }
    setSections(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionCount]);

  const saveBlog = async () => {
    const hasSections = sections.some((s) => (s.heading || s.content).trim());
    if (!title || !category || (!content && !hasSections)) {
      alert("All fields are required");
      return;
    }

    const payload: BlogPayload = {
      title,
      content: content || undefined,
      sections: hasSections
        ? sections
            .map((s) => ({
              heading: s.heading.trim(),
              content: s.content.trim()
            }))
            .filter((s) => s.heading || s.content)
        : undefined,
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

        <div className="form-section">
          <label className="form-label">
            <span className="label-text">Table Content</span>
            <span className="label-hint">Enter number of titles and content for each</span>
          </label>
          <div className="grid-1-2" style={{ alignItems: "center" }}>
            <input
              className="form-input"
              type="number"
              placeholder="Number of titles"
              value={sectionCount || ""}
              onChange={(e) => setSectionCount(Number(e.target.value || 0))}
            />
            {sectionCount > 0 && (
              <button
                className="btn"
                onClick={() => setSectionCount(Math.max(0, sectionCount - 1))}
              >
                Remove Last
              </button>
            )}
          </div>
          {sections.map((s, idx) => (
            <div key={idx} className="card" style={{ display: "grid", gap: 8 }}>
              <input
                className="form-input"
                placeholder={`Title ${idx + 1}`}
                value={s.heading}
                onChange={(e) => {
                  const next = [...sections];
                  next[idx] = { ...next[idx], heading: e.target.value };
                  setSections(next);
                }}
              />
              <textarea
                className="form-input"
                rows={4}
                placeholder="Content"
                value={s.content}
                onChange={(e) => {
                  const next = [...sections];
                  next[idx] = { ...next[idx], content: e.target.value };
                  setSections(next);
                }}
              />
            </div>
          ))}
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
