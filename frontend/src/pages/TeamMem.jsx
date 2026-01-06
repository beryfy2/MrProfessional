import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../style/teamMem.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
const IMG_BASE = API_BASE.replace('/api', '');

export default function TeamMem() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    fetch(`${API_BASE}/employees`)
      .then((res) => res.json())
      .then(setEmployees)
      .catch(() => setEmployees([]));
  }, []);
  function displayPhoto(emp) {
    const url = emp.photoUrl ? `${IMG_BASE}${emp.photoUrl}` : `https://i.pravatar.cc/400?u=${encodeURIComponent(emp.email || emp.name)}`;
    return url;
  }
  function displayRole(emp) {
    return emp.designation || emp.position || '';
  }
  function openDetails(emp) {
    setSelected(emp);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
  return (
    <div>
      <NavBar />

      {/* HERO SECTION */}
      <section className="team-hero">
        <div className="team-hero-container">

          {/* LEFT CONTENT */}
          <div className="team-hero-left">
            <h1>The Professional Utilities Team</h1>
            <p>
              Young individuals who are passionate about helping <br />
              entrepreneurs of India
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="team-hero-card">
            <div className="team-card-text">
              <h3>Come work with us</h3>
              <p>
                We are an organisation of young & vibrant professionals,
                looking for candidates who are passionate about India's
                growth story.
              </p>
            </div>

            <div className="team-card-icon">
              💼
            </div>
          </div>

        </div>
      </section>

      <section className="leaders-section">
        <h2 className="leaders-title">Our Team</h2>
        <div className="leaders-container">
          {employees.map((emp) => (
            <div key={emp._id} className="leader-block" onClick={() => openDetails(emp)} style={{ cursor: 'pointer' }}>
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
              </div>
            </div>
          ))}
        </div>
      </section>
      {selected && (
        <section className="leaders-section">
          <div className="leaders-container" style={{ gridTemplateColumns: '1fr' }}>
            <div className="team-detail-card">
              <div className="team-detail-header">
                <div className="team-detail-name">{selected.name}</div>
                <button className="btn" onClick={() => setSelected(null)}>Close</button>
              </div>
              <div className="team-detail-grid">
                <img src={displayPhoto(selected)} alt={selected.name} className="team-detail-photo" />
                <div className="team-detail-info">
                  <div className="team-detail-role">{displayRole(selected)}</div>
                  <div className="team-detail-meta">{selected.department}</div>
                  <div className="team-detail-meta">{selected.email}</div>
                  <div className="team-detail-meta">{selected.phone}</div>
                  <div className="team-detail-meta">{selected.workLocation}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      
      <Footer />
    </div>
  );
}
