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
        <h2>Blogs</h2>
        <button onClick={() => navigate("/admin/blogs/new")}>
          + Add Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs added yet</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.category?.name || "-"}</td>
                <td>{blog.status}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/blogs/${blog._id}`)
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button onClick={() => removeBlog(blog._id)}>
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
