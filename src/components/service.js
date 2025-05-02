import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './service.css'; 

import Day100 from '../assets/carousal/100day.jpg'; 
import Inaugration from '../assets/carousal/Inaugration.jpg'; 
import Day137  from '../assets/carousal/service 1.jpg'
import Remote from '../assets/carousal/service 2.jpg'

const servicesData = [
  {
    id: 1,
    image: Inaugration,
    title: 'Inaugration',
    description: 'Feeding food after our Inaugration on 26th December 2024'
  },
  {
    id: 2,
    image: Day100,
    title: '100th Day',
    description: 'Celebrating the 100th day of Meals on Wheels with gratitude and joy'
  },
  {
    id: 3,
    image: Day137,
    title: 'Remote Distribution',
    description: 'Reaching remote areas to feed people with hunger'
  },
  {
    id: 4,
    image: Remote,
    title: 'Day 137 Service',
    description: 'Food distributed in nearby villages'
  }
];

const Service = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (image) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="services-container">
        <Slider {...settings}>
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="image-container" onClick={() => openLightbox(service.image)}>
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <span className="close-btn" onClick={closeLightbox}>&times;</span>
          <img src={lightboxImage} alt="Enlarged" className="lightbox-img" />
        </div>
      )}
    </section>
  );
};

export default Service;
