// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new blog
router.post('/', async (req, res) => {
  try {
    const { title, description, image, pdf, pin } = req.body;

    if (pin !== process.env.ADMIN_PIN) {
      return res.status(401).json({ message: 'Pin Invalid' });
    }

    const newBlog = new Blog({
      title,
      description,
      image,
      pdf
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ 
      message: 'Blog created successfully',
      blog: savedBlog
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;