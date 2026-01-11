import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../style/achievements.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const UPLOAD_BASE = "http://localhost:5000";

export default function AchievementPage() {
  const { id } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetch(`${API_BASE}/public/achievements/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?._id) setAchievement(data);
        else if (!cancelled) setError("Achievement not found");
      })
      .catch(() => !cancelled && setError("Failed to load achievement"))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div style={{ textAlign: "center", padding: "100px", minHeight: "60vh" }}>
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div
          style={{
            textAlign: "center",
            padding: "100px",
            color: "red",
            minHeight: "60vh",
          }}
        >
          <h2>{error}</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!achievement) return null;

  return (
    <>
      <NavBar />

      {/* ================= HERO WITH ANIMATION ================= */}
      <section className="achievements-hero animated-hero">
        <div className="hero-glow" />

        <div className="hero-content">
          <h1 className="hero-title">{achievement.title}</h1>

          <div className="hero-meta">
            {new Date(achievement.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* subtle floating accents */}
        <span className="hero-dot d1" />
        <span className="hero-dot d2" />
        <span className="hero-dot d3" />
      </section>

      <section className="achievements-section">
        <div className="achievement-detail-container">
          <div className="achievement-detail-image-wrapper">
            <img
              src={`${UPLOAD_BASE}${achievement.photo}`}
              alt={achievement.title}
              className="achievement-detail-image"
            />
          </div>

          <div className="achievement-detail-content">
            <div
              className="achievement-date"
              style={{ marginBottom: "20px", fontSize: "16px" }}
            >
              {new Date(achievement.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="achievement-text">
              {achievement.content.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
