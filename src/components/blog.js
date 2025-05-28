import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./blog.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    pdf: null,
    pin: "",
  });
  const [uploading, setUploading] = useState(false);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blogs");
      }
    };
    fetchBlogs();
  }, []);

  const openLightbox = (image) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  const openPdfViewer = (pdf) => setPdfUrl(pdf);
  const closePdfViewer = () => setPdfUrl(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handlePdfChange = (e) => {
    setFormData((prev) => ({ ...prev, pdf: e.target.files[0] }));
  };

  const uploadToCloudinary = async (file, resourceType = "image") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "meals_on_wheels"); // Replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/djiu5rr4n/${resourceType}/upload`, // Replace with your cloud name
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = null;
      let pdfUrl = null;

      // Upload image if exists
      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image, "image");
      }

      // Upload PDF if exists
      if (formData.pdf) {
        pdfUrl = await uploadToCloudinary(formData.pdf, "raw");
      }

      // Submit to backend
      const response = await axios.post(`${BASE_URL}/api/blogs`, {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
        pdf: pdfUrl,
        pin: formData.pin,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.message);
        // Refresh blogs list
        const res = await axios.get(`${BASE_URL}/api/blogs`);
        setBlogs(res.data);
        // Reset form
        setFormData({
          title: "",
          description: "",
          image: null,
          pdf: null,
          pin: "",
        });
        setShowForm(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err);
    } finally {
      setUploading(false);
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
    <section id="blog" className="blog-section">
      <h2>Our Blog</h2>
      <button onClick={() => setShowForm(true)} className="add-blog-btn">
        Add Blog Post
      </button>
      {showForm && (
        <div className="blog-dialog-overlay">
          <div className="blog-dialog-box">
            <div className="blog-dialog-header">
              <h3>Add a New Blog Post</h3>
              <span
                className="blog-dialog-close"
                onClick={() => setShowForm(false)}
              >
                &times;
              </span>
            </div>
            <form onSubmit={handleSubmit} className="blog-dialog-form">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Blog title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Blog description"
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
              <label>PDF File (Optional)</label>
              <input
                type="file"
                name="pdf"
                accept="application/pdf"
                onChange={handlePdfChange}
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
              <button type="submit" disabled={uploading}>
                {uploading ? "Uploading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="blogs-container">
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              {blog.image && (
                <div
                  className="blog-image-container"
                  style={{ backgroundImage: `url(${blog.image})` }}
                  onClick={() => openLightbox(blog.image)}
                >
                  <img src={blog.image} alt={blog.title} loading="lazy" />
                </div>
              )}
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                {blog.pdf && (
                  <button
                    className="pdf-view-btn"
                    onClick={() => openPdfViewer(blog.pdf)}
                  >
                    View PDF
                  </button>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {lightboxImage && (
        <div className="blog-lightbox" onClick={closeLightbox}>
          <span className="blog-close-btn" onClick={closeLightbox}>
            &times;
          </span>
          <img
            src={lightboxImage}
            alt="Enlarged"
            className="blog-lightbox-img"
          />
        </div>
      )}
      {pdfUrl && (
        <div className="blog-lightbox" onClick={closePdfViewer}>
          <span className="blog-close-btn" onClick={closePdfViewer}>
            &times;
          </span>
          <iframe
            src={pdfUrl}
            className="pdf-viewer"
            title="PDF Viewer"
          ></iframe>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </section>
  );
};

export default Blog;
