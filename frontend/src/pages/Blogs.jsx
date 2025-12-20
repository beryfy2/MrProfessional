import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../style/blog.css';

export default function BlogPage() {
  return (
    <>
      <NavBar />

      {/* BLOG HERO SECTION */}
      <section className="blog-hero">
        <div className="blog-hero-overlay" />

        <div className="blog-hero-container">
          {/* LEFT CONTENT */}
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

          {/* RIGHT FORM */}
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

      {/* BLOG CONTENT AREA (EMPTY FOR NOW) */}
      <section className="blog-content">
        {/* Future: blog list, filters, cards */}
      </section>
      {/* ================= BLOG SEARCH + CATEGORIES + LIST ================= */}

      <section className="blog-section">

        {/* SEARCH BAR */}
        <div className="blog-search-wrapper">
          <input
            type="text"
            placeholder="Search our knowledge base"
            disabled
          />
          <button disabled>🔍</button>
        </div>

        <div className="blog-layout">

          {/* LEFT CATEGORY SIDEBAR */}
          <aside className="blog-sidebar">
            <h3>Blog Categories</h3>

            <ul className="blog-category-list">
              {/* Empty state – admin will add later */}
              <li className="empty-category">No categories added yet</li>
            </ul>
          </aside>

          {/* BLOG CARDS GRID */}
          <div className="blog-cards">

            {/* Empty State */}
            <div className="blog-empty">
              <h3>No Blogs Published Yet</h3>
              <p>Blogs will appear here once added by admin.</p>
            </div>

            {/* Future blog cards will come here */}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}
