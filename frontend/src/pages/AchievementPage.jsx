import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/achievements.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const BASE_URL = API_BASE.replace("/api", "");

export default function AchievementPage() {
  const { id } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/public/achievements/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?._id) setAchievement(data);
        else setError("Achievement not found");
      })
      .catch(() => setError("Failed to load achievement"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="loader-page">Loading...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="error-page">{error}</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      {/* HERO */}
      <section className="achievements-hero animated-hero">
        <div className="hero-content">
          <h1 className="hero-title">{achievement.title}</h1>

          {/* <div className="hero-meta">
            {new Date(achievement.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div> */}
          
        </div>
      </section>

      {/* DETAIL */}
      <section className="achievements-section">
        <div className="achievement-detail-container">

          {/* LEFT CONTENT */}
          <div className="achievement-detail-content">
            <div className="achievement-date">
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

          {/* RIGHT IMAGE */}
          <div className="achievement-detail-image-wrapper">
            <img
              src={`${BASE_URL}${achievement.photo}`}
              alt={achievement.title}
              className="achievement-detail-image"
            />
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
