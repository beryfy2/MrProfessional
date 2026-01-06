import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/team.css';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const IMG_BASE = API_BASE.replace('/api', '');

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/employees`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter out employees without photos if you want, or keep all if you handle placeholders
          const withPhotos = data.filter(e => e.photoUrl);
          setEmployees(withPhotos.length > 0 ? withPhotos : []); 
        }
      })
      .catch(err => console.error('Failed to load team', err));
  }, []);

  // Use employees for images, or fallback if none loaded yet
  const displayImages = employees.length > 0 
    ? employees.map(e => `${IMG_BASE}${e.photoUrl}`)
    : [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop',
      ];

  // Auto-scroll carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayImages.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };



  return (
    <section className="team-section">
      <div className="team-container">
        {/* Left Content Side */}
        <div className="team-content">
          <h2 className="team-title">
            Meet the <span className="team-highlight">Professional Utilities</span> team
          </h2>

          <p className="team-description">
            Our highly skilled professionals are people who personify the very qualities that have made us successful.
          </p>

          <p className="team-long-description">
<<<<<<< HEAD
            Mr. Professional has been providing clients with personalized tax preparation and accounting services throughout India. With years of certified training, We have the necessary skills, qualifications and expertise to get the job done. Whether you’re looking for a Tax Expert or a Financial Advisor, Financial Services. We are in the business of Startup Registration, Licenses, Accounting, Taxes, Tax Planning & Management, Legal Services, Payroll Labour Laws and in Protection & Enforcement of Intellectual Property Rights.
=======
           Mr.Professional is a young and energetic team focused on supporting 
entrepreneurs and strengthening the Indian startup ecosystem. 
>>>>>>> e88dc536f529d97d1923309b21fa3712023198f8
          </p>

          <div className="team-buttons">
            <button
              type="button"
              className="btn-more-about"
              background="#3B3C99"
              onClick={() => navigate('/about')}
            >
              More About Us
            </button>
            <button className="btn-meet-team" background="#3B3C99"
            onClick={()=> navigate('/team')}>Meet Our Team</button>
          </div>
        </div>

        {/* Right Carousel Side */}
        <div className="team-carousel">
          <div className="carousel-container">
            {displayImages.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${
                  index === currentIndex ? 'active' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Team member ${index + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="carousel-dots">
            {displayImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
