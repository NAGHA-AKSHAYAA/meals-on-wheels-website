// src/components/Header.js
import React, { useState } from "react";
import "./header.css";

import lionsLogo from "../assets/lions-logo.png";

import mealsOnWheelsLogo from "../assets/meals on wheels logo.png";

const Header = ({ onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Function to toggle menu

  return (
    <header className="main-header">
      <div className="logo-container">
        <div className="logo">
          <img src={lionsLogo} alt="Lions Club Logo" />
        </div>
        <div className="logo">
          <img src={mealsOnWheelsLogo} alt="Meals on Wheels Logo" />
        </div>
        <div className="logo">
          <h1>Meals On Wheels</h1>
        </div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
          <i className="fas fa-bars"></i> 
        </div>
        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <a href="#home" onClick={onHomeClick} className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#vision">Vision</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </nav>
    </header>
  );
};

export default Header;
