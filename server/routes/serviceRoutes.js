const express = require("express");
const router = express.Router();
const Service = require("../models/service");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

// POST service with image
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, pin } = req.body;
  const imageUrl = req.file.path;

  if (pin !== "2025") {
    return res.status(400).json({ message: "Invalid Pin" });
  } else {
    try {
      const newService = new Service({
        image: imageUrl,
        title,
        description,
      });
      await newService.save();
      res.status(201).json({ message: "Sucess" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
