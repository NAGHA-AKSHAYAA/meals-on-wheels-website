import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./service.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../api";

const Service = () => {
  const [services, setServices] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    pin: "",
  });

  // Fetch services from backend
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/services`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const openLightbox = (image) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("image", formData.image);
    submitData.append("pin", formData.pin);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/services`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      setShowForm(false);
      setFormData({ title: "", description: "", image: null, pin: "" });

      const res = await axios.get(`${BASE_URL}/api/services`);
      setServices(res.data);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id ="services" className="services-section">
      <h2>Our Services</h2>
      <button onClick={() => setShowForm(true)} className="add-service-btn">
        Add Service
      </button>

      {showForm && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <div className="dialog-header">
              <h3>Add a New Service</h3>
              <span className="dialog-close" onClick={() => setShowForm(false)}>
                &times;
              </span>
            </div>
            <form onSubmit={handleSubmit} className="dialog-form">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Service title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Service description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
              <label>Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <label>Pin</label>
              <input
                type="text"
                name="pin"
                placeholder="Pin To Post"
                value={formData.pin}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <div className="services-container">
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <div
                className="image-container"
                onClick={() => openLightbox(service.image)}
              >
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

      {lightboxImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <span className="close-btn" onClick={closeLightbox}>
            &times;
          </span>
          <img src={lightboxImage} alt="Enlarged" className="lightbox-img" />
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </section>
  );
};

export default Service;
