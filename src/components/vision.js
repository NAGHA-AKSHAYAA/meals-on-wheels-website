// src/components/Vision.js
import React from 'react';
import './vision.css';
import personImage from '../assets/ravichandran.png'; // replace with your actual image file

const Vision = () => {
  return (
    <section id="vision" className="vision-section">
      <div className="vision-container">
        <div className="vision-text">
          <h2>Our Vision</h2>
          <p>
          In the heart of compassion, Meals on Wheels was born — a permanent project led by A T Ravichandran during his tenure as District Governor (2024–2025). 
           He envisioned a mission to serve those most in need.
          </p>
          <p>
            On December 16, 2024, that vision became reality.
            Every day since, 150 hot meals have been lovingly prepared
            in a centralized kitchen and delivered to hungry hands.
          </p>
          <p className="quote">What began as one man's mission has become a community's promise.</p>
        </div>
        <div className="vision-image">
          <img src={personImage} alt="Beneficiary" />
        </div>
      </div>
    </section>
  );
};

export default Vision;
