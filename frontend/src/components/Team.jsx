import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/team.css';

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Team member images from Unsplash
  const teamImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop',
  ];

  // Auto-scroll carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [teamImages.length]);

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
            Professional Utilities is transforming the way to start and manage a business by simplifying the business laws for entrepreneurs. Our experts, specializing across tax, accounting and compliances, handhold entrepreneurs through their entrepreneurship journey right from business registration to complying with business laws.
          </p>

          <div className="team-buttons">
            <button
              type="button"
              className="btn-more-about"
              onClick={() => navigate('/about')}
            >
              More About Us
            </button>
            <button className="btn-meet-team"
            onClick={()=> navigate('/team')}>Meet Our Team</button>
          </div>
        </div>

        {/* Right Carousel Side */}
        <div className="team-carousel">
          <div className="carousel-container">
            {teamImages.map((image, index) => (
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
            {teamImages.map((_, index) => (
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
