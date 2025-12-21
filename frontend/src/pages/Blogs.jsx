import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../style/blog.css";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

/* Utility: strip HTML for safe preview */
function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export default function Blogs() {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Load categories + blogs */
  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, blogRes] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/public/blogs`),
        ]);

        if (!catRes.ok || !blogRes.ok) {
          throw new Error("Failed to load blog data");
        }

        const cats = await catRes.json();
        const blgs = await blogRes.json();

        setCategories(cats);
        setBlogs(blgs);
      } catch {
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  /* Filter blogs */
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchCategory =
        !activeCategory || b.category?._id === activeCategory;

      const text = stripHtml(b.content || "").toLowerCase();
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        text.includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [blogs, activeCategory, search]);

  return (
    <>
      <NavBar />

      {/* BLOG HERO SECTION */}
      <section className="blog-hero">
        <div className="blog-hero-overlay" />

        <div className="blog-hero-container">
          <div className="blog-hero-left">
            <h1>
              Professional Utilities Blog: <br />
              Business & Compliance Tips
            </h1>

            <ul className="blog-hero-points">
              <li>Lowest Price Guarantee</li>
              <li>Free Export Related Guidance</li>
              <li>Quick and Hassle-Free Process</li>
              <li>Expert Assistance Without the Hassle</li>
            </ul>

            <div className="blog-rating">
              <span className="google-logo">G</span>
              <div>
                <p>Google Customer Rating</p>
                <strong>4.9 ★★★★★</strong>
              </div>
            </div>
          </div>

          <div className="blog-hero-right">
            <div className="consultation-form">
              <h3>Get Expert Consultation</h3>
              <input type="text" placeholder="Full Name *" />
              <input type="email" placeholder="Email *" />
              <input type="tel" placeholder="Mobile *" />
              <button>REQUEST A CALLBACK</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BLOG SEARCH + CATEGORIES + LIST ================= */}
      <section className="blog-section">
        {/* SEARCH BAR */}
        <div className="blog-search-wrapper">
          <input
            type="text"
            placeholder="Search our knowledge base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>

        <div className="blog-layout">
          {/* CATEGORY SIDEBAR */}
          <aside className="blog-sidebar">
            <h3>Blog Categories</h3>

            <ul className="blog-category-list">
              <li
                className={!activeCategory ? "active" : ""}
                onClick={() => setActiveCategory(null)}
              >
                All Blogs
              </li>

              {categories.length === 0 && (
                <li className="empty-category">No categories added yet</li>
              )}

              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className={activeCategory === cat._id ? "active" : ""}
                  onClick={() => setActiveCategory(cat._id)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </aside>

          {/* BLOG CARDS */}
          <div className="blog-cards">
            {loading && <p>Loading blogs...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && filteredBlogs.length === 0 && (
              <div className="blog-empty">
                <h3>No Blogs Found</h3>
                <p>Try another category or search term.</p>
              </div>
            )}

            {filteredBlogs.map((blog) => (
              <article key={blog._id} className="blog-card">
                <h3>{blog.title}</h3>

                <p className="blog-meta">
                  {blog.category?.name} •{" "}
                  {new Date(blog.createdAt).toDateString()}
                </p>

                <p className="blog-excerpt">
                  {stripHtml(blog.content).slice(0, 180)}...
                </p>

                <Link to={`/blogs/${blog.slug}`} className="read-more">
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
