import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs, deleteBlog } from "../lib/blogApi";

interface Blog {
  _id: string;
  title: string;
  category?: {
    name: string;
  };
  status: "draft" | "published";
}

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const loadBlogs = async () => {
    const data = await fetchBlogs();
    setBlogs(data);
  };

  const removeBlog = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    await deleteBlog(id);
    loadBlogs();
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Blogs</h1>
          <p className="page-subtitle">Manage your blog posts and content</p>
        </div>
        <button className="btn primary" onClick={() => navigate("/admin/blogs/new")}>
          <span className="btn-icon">+</span>
          Add Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p className="empty-text">No blogs added yet</p>
            <p className="empty-subtext">Create your first blog post to get started</p>
            <button className="btn primary" onClick={() => navigate("/admin/blogs/new")}>
              Create First Blog
            </button>
          </div>
        </div>
      ) : (
        <div className="card table-card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th className="th">Title</th>
                  <th className="th">Category</th>
                  <th className="th">Status</th>
                  <th className="th">Actions</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="td">
                      <div className="blog-title-cell">
                        <strong>{blog.title}</strong>
                      </div>
                    </td>
                    <td className="td">
                      <span className="category-badge">
                        {blog.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="td">
                      <span className={`status-badge status-${blog.status}`}>
                        {blog.status === 'published' ? '✅ Published' : '📝 Draft'}
                      </span>
                    </td>
                    <td className="td">
                      <div className="action-buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => navigate(`/admin/blogs/${blog._id}`)}
                        >
                          <span>✏️</span>
                          Edit
                        </button>
                        <button 
                          className="btn btn-delete"
                          onClick={() => removeBlog(blog._id)}
                        >
                          <span>🗑️</span>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
