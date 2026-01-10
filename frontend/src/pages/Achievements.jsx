import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../style/achievements.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function Achievements() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/public/achievements`)
      .then((res) => res.json())
      .then((data) => {
        setList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load achievements", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />

      <section className="achievements-hero">
        <h1>Our Achievements</h1>
        <p>Celebrating success stories and milestones from our community.</p>
      </section>

      <section className="achievements-section">
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            Loading achievements...
          </div>
        ) : list.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <p style={{ fontSize: "18px" }}>No achievements shared yet.</p>
          </div>
        ) : (
          <div className="achievements-grid">
            {list.map((item) => (
              <div key={item._id} className="achievement-card">
                <Link to={`/achievements/${item._id}`} className="achievement-link-wrapper">
                  <div className="achievement-image-wrapper">
                    <img
                      src={`http://localhost:5000${item.photo}`}
                      alt={item.title}
                      className="achievement-image"
                    />
                  </div>
                </Link>
                <div className="achievement-content">
                  <div className="achievement-date">
                    {new Date(item.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <Link to={`/achievements/${item._id}`} className="achievement-title-link">
                    <h3 className="achievement-title">{item.title}</h3>
                  </Link>
                
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
