import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../style/teamMem.css';

export default function TeamMem() {
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
      <h2 className="leaders-title">Our Leaders</h2>

      <div className="leaders-container">
        {/* LEFT LEADER */}
        <div className="leader-block">
          <div className="leader-card">
            <img
              src="/assets/leaders/sahil.png"
              alt="Sahil Singh"
              className="leader-img"
            />

            <div className="leader-overlay">
              <h3>SAHIL SINGH</h3>
              <p>Tax Consultant</p>

              <div className="leader-socials">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-linkedin-in"></i>
              </div>
            </div>
          </div>

          <div className="leader-info">
            <h4>Sahil Singh</h4>
            <span>Tax Consultant</span>
          </div>
        </div>

        {/* RIGHT LEADER */}
        <div className="leader-block">
          <div className="leader-card">
            <img
              src="/assets/leaders/abhishek.png"
              alt="Abhishek Yadav"
              className="leader-img"
            />
          </div>

          <div className="leader-info">
            <h4>Abhishek Yadav</h4>
            <span>Senior Business Consultant</span>
          </div>
        </div>
      </div>
    </section>

      
      <Footer />
    </div>
  );
}
