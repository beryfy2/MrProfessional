import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../style/blog.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setBlog(null);
    fetch(`${API_BASE}/public/blogs/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled) return;
        if (!json || !json._id) {
          setError("Blog not found");
          return;
        }
        setBlog(json);
      })
      .catch(() => setError("Failed to load blog"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <>
      <NavBar />
      <section className="blog-section">
        <div className="blog-layout" style={{ maxWidth: 960, margin: "0 auto" }}>
          {loading && <p>Loading…</p>}
          {error && !loading && (
            <div className="blog-empty">
              <h3>{error}</h3>
              <p>
                <Link to="/blogs" className="read-more">
                  ← Back to Blogs
                </Link>
              </p>
            </div>
          )}
          {!loading && !error && blog && (
            <article className="blog-article">
              <div style={{ marginBottom: 12 }}>
                <Link to="/blogs" className="read-more">← Back to Blogs</Link>
              </div>
              <h1 className="blog-title">{blog.title}</h1>
              <p className="blog-meta">
                {blog.category?.name || "Uncategorized"} •{" "}
                {new Date(blog.createdAt).toDateString()}
                {blog.status === "draft" && (
                  <> • <span className="draft-badge">Draft</span></>
                )}
              </p>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              />
            </article>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
