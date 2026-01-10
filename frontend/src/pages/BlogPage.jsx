import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../style/blog-detail.css";


const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetch(`${API_BASE}/public/blogs/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?._id) setBlog(data);
        else if (!cancelled) setError("Blog not found");
      })
      .catch(() => !cancelled && setError("Failed to load blog"))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <>
      <NavBar />

      {/* ================= HERO ================= */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-inner">
          <h1>{blog?.title || "Loading..."}</h1>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <section className="blog-detail-section">
        <div className="blog-detail-layout">
          {/* CONTENT */}
          <div className="blog-detail-content">
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && blog && (
              <div className="blog-card-main">
                <p className="blog-meta">
                  {blog.category?.name || "Uncategorized"} •{" "}
                  {new Date(blog.createdAt).toDateString()}
                </p>

                {/* TABLE OF CONTENT */}
                {Array.isArray(blog.sections) && blog.sections.length > 0 && (
                  <div className="toc-box">
                    <h3>Table Of Content</h3>
                    <ul>
                      {blog.sections.map((s, i) => {
                        const title = s?.heading || `Section ${i + 1}`;
                        const id = `sec-${title
                          .toLowerCase()
                          .replace(/[^\w\s-]/g, "")
                          .replace(/\s+/g, "-")}`;
                        return (
                          <li key={i}>
                            <a href={`#${id}`} className="toc-link">
                              {title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <div
                  className="blog-html"
                  dangerouslySetInnerHTML={{
                    __html: blog.content || "",
                  }}
                />
                {Array.isArray(blog.sections) && blog.sections.length > 0 && (
                  <div className="blog-sections">
                    {blog.sections.map((s, i, arr) => {
                      const title = s?.heading || `Section ${i + 1}`;
                      const id = `sec-${title
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/\s+/g, "-")}`;
                      const text = String(s?.content || "");
                      const paras = text.split("\n\n");
                      return (
                        <section key={i} id={id} className="blog-section-item">
                          <h2 className="section-title">{title}</h2>
                          <div className="section-divider" />
                          <div className="section-content">
                            {paras.map((p, idx) => (
                              <p key={idx}>{p}</p>
                            ))}
                          </div>
                          {i !== arr.length - 1 && <div className="section-spacer" />}
                        </section>
                      );
                    })}
                  </div>
                )}
                     {/* ================= WHY PROFESSIONAL UTILITIES ================= */}
<section className="why-pu-section">
  <div className="why-pu-container">
    {/* LEFT IMAGE */}
    <div className="why-pu-image">
      <img
        src="https://professionalutilities.com/assets/images/why-pu.png"
        alt="Why "
        className="max-w-full h-auto"
      />
    </div>

    {/* CENTER CONTENT */}
    <div className="why-pu-content">
      <h2>Why ?</h2>

      <p className="why-pu-desc">
        simplify registrations, licenses, and compliances
        for your business. With experienced guidance and nationwide support, we
        help you complete every requirement efficiently and effectively.
      </p>

      <div className="why-pu-points">
        <div className="why-pu-item">
          <span className="why-icon">🏢</span>
          <p>Complete Corporate Solutions</p>
        </div>

        <div className="why-pu-item">
          <span className="why-icon">🗺️</span>
          <p>PAN India Assistance</p>
        </div>

        <div className="why-pu-item">
          <span className="why-icon">🎓</span>
          <p>Free Expert Guidance</p>
        </div>

        <div className="why-pu-item">
          <span className="why-icon">✔️</span>
          <p>Google-Verified Team</p>
        </div>

        <div className="why-pu-item">
          <span className="why-icon">🎧</span>
          <p>Dedicated Support</p>
        </div>

        <div className="why-pu-item">
          <span className="why-icon">₹</span>
          <p>Transparent Refund Assurance</p>
        </div>
      </div>
    </div>

   
  </div>
</section>
                <Link to="/blogs" className="back-link">
                  ← Back to Blogs
                </Link>
              </div>

              
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="blog-detail-sidebar">
            <div className="expert-card">
              <h3>Have Queries? Talk to an Expert</h3>
              <input placeholder="Full Name *" />
              <input placeholder="Email *" />
              <input placeholder="Mobile *" />
              <button>Request a Callback</button>
            </div>

            <div className="trust-card">
              <div className="trust-icon">✔</div>
              <div>
                <strong>Reliable</strong>
                <p>
                  Businesses rely on us due to our commitment to customer
                  satisfaction.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
  

      <Footer />
    </>
  );
}
