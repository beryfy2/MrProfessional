import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  category: string;
}

export default function Blogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<Blog[]>([]);

  const deleteBlog = (id: number) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>
                  <button onClick={() => navigate(`/admin/blogs/${blog.id}`)}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => deleteBlog(blog.id)}>
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
