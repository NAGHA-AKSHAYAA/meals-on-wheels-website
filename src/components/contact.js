// src/components/Contact.js
import React from 'react';
import './contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaUser } from 'react-icons/fa';
import contactImg from '../assets/contact_side.jpg'; // Ensure you add this image

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-wrapper">
        <div className="contact-image">
          <img src={contactImg} alt="Contact Visual" />
        </div>
        <div className="contact-details">
          <h2>Contact Us</h2>
          <div className="contact-item">
            <span className="label"><FaUser /> Name:</span>
            <span className="value">Lions Club Chennai - Meals on Wheels</span>
          </div>
          <div className="contact-item">
            <span className="label"><FaPhone /> Phone:</span>
            <span className="value">+91 9790937389</span>
          </div>
          <div className="contact-item">
            <span className="label"><FaEnvelope /> Email:</span>
            <span className="value">ravichandranathithan@gmail.com</span>
          </div>
          <div className="contact-item">
            <span className="label"><FaMapMarkerAlt /> Address:</span>
            <span className="value">25W2+28F, 3rd St, Swami Vivekananda, Porur Gardens, Chennai, Tamil Nadu 600116</span>
          </div>
          <div className="contact-item">
            <span className="label"><FaInstagram /> Instagram:</span>
            <a 
            href="https://www.instagram.com/meals_on_wheels_chennai/" 
            className="value" 
            target="_blank" 
            rel="noopener noreferrer"
            >
            @lions_meals_on_wheels_chennai
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
