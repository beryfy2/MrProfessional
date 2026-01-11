import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../style/teamMem.css";

import adv11 from "../assets/advisors/11.jpg";
import adv12 from "../assets/advisors/12.jpg";
import adv13 from "../assets/advisors/13.jpg";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const IMG_BASE = API_BASE.replace("/api", "");

export default function TeamMem() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/employees`)
      .then((res) => res.json())
      .then(setEmployees)
      .catch(() => setEmployees([]));
  }, []);

  function displayPhoto(emp) {
    return emp.photoUrl
      ? `${IMG_BASE}${emp.photoUrl}`
      : `https://i.pravatar.cc/400?u=${encodeURIComponent(
          emp.email || emp.name
        )}`;
  }

  function displayRole(emp) {
    return emp.designation || emp.position || "";
  }

  return (
    <div>
      <NavBar />

      {/* ================= HERO SECTION ================= */}
      <section className="team-hero">
        <div className="team-hero-container">
          <div className="team-hero-left">
            <h1>Mr Professional Team</h1>
            <p>
              Young individuals who are passionate about helping <br />
              entrepreneurs of India
            </p>
          </div>

          <div className="team-hero-card">
            <div className="team-card-text">
              <h3>Come work with us</h3>
              <p>
                We are an organisation of young & vibrant professionals,
                looking for candidates who are passionate about India's growth
                story.
              </p>
            </div>
            <div className="team-card-icon">💼</div>
          </div>
        </div>
      </section>

      {/* ================= TEAM MEMBERS ================= */}
      <section className="leaders-section">
        <h2 className="leaders-title">Our Team</h2>

        <div className="leaders-container">
          {employees.map((emp) => (
            <div key={emp._id} className="leader-block">
              <div className="leader-card">
                <img
                  src={displayPhoto(emp)}
                  alt={emp.name}
                  className="leader-img"
                />
              </div>

              <div className="leader-info">
                <h4>{emp.name}</h4>
                <span>{displayRole(emp)}</span>
                {emp.degree && <h3>({emp.degree})</h3>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ADVISORY COUNCIL ================= */}
      <section className="leaders-section">
        <h2 className="leaders-title">Advisory Council Members</h2>
        <p className="leaders-subtitle">
          Our source of guidance and motivation
        </p>

        <div className="leaders-container advisory-grid">
          {/* Advisor 1 */}
          <div className="leader-block">
            <div className="leader-card">
              <img
                src={adv11}
                alt="Anand Prakash Rathore"
                className="leader-img"
              />
            </div>
            <div className="leader-info">
              <h4>Anand Prakash Rathore</h4>
              <span>
                Head Finance and Accounts, <br />
                18+ Years Experience
              </span>
            </div>
          </div>

          {/* Advisor 2 */}
          <div className="leader-block">
            <div className="leader-card">
              <img
                src={adv12}
                alt="Manoj Kumar"
                className="leader-img"
              />
            </div>
            <div className="leader-info">
              <h4>Manoj Kumar</h4>
              <span>
                Cost Accountant <br />
                Working in Coal India Limited
              </span>
            </div>
          </div>

          {/* Advisor 3 */}
          <div className="leader-block">
            <div className="leader-card">
              <img
                src={adv13}
                alt="Yati Nijhawan"
                className="leader-img"
              />
            </div>
            <div className="leader-info">
              <h4>Yati Nijhawan</h4>
              <span>
                B.Com, LLB, CS Executive <br />
                Legal practitioner – IPR, IBC & Corporate Law
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
