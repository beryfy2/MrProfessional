import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../style/teamMem.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

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
    const url = emp.photoUrl ? `http://localhost:5000${emp.photoUrl}` : `https://i.pravatar.cc/400?u=${encodeURIComponent(emp.email || emp.name)}`;
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
            <div className="card" style={{ margin: '0 auto', maxWidth: 900, display: 'grid', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0b3a5e' }}>{selected.name}</div>
                <button className="btn" onClick={() => setSelected(null)}>Close</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, alignItems: 'start' }}>
                <img src={displayPhoto(selected)} alt={selected.name} style={{ width: 160, height: 160, borderRadius: 12, objectFit: 'cover' }} />
                <div style={{ display: 'grid', gap: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{displayRole(selected)}</div>
                  <div style={{ fontSize: 14, color: '#374151' }}>{selected.department}</div>
                  <div style={{ fontSize: 14, color: '#374151' }}>{selected.email}</div>
                  <div style={{ fontSize: 14, color: '#374151' }}>{selected.phone}</div>
                  <div style={{ fontSize: 14, color: '#374151' }}>{selected.workLocation}</div>
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
