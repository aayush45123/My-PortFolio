const express = require("express");
const router = express.Router();
const multer = require("multer");
const Certificate = require("../model/certificateModel");
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");

// Use in-memory buffer storage (production-safe, no local disk writes)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit for certificate documents
});

// POST — Upload certificate file + thumbnail to Cloudinary
router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, type } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Certificate title is required" });
      }

      if (!req.files || !req.files.file || !req.files.thumbnail) {
        return res.status(400).json({ error: "Both certificate file and thumbnail are required" });
      }

      const fileObj = req.files.file[0];
      const thumbnailObj = req.files.thumbnail[0];

      // Upload main certificate file (PDF or image)
      const fileUpload = await uploadToCloudinary(fileObj.buffer, {
        folder: "portfolio/certificates/files",
        resource_type: "auto",
      });

      // Upload thumbnail image
      const thumbnailUpload = await uploadToCloudinary(thumbnailObj.buffer, {
        folder: "portfolio/certificates/thumbnails",
        resource_type: "image",
      });

      const newCert = await Certificate.create({
        title,
        fileURL: fileUpload.secure_url,
        filePublicId: fileUpload.public_id,
        thumbnailURL: thumbnailUpload.secure_url,
        thumbnailPublicId: thumbnailUpload.public_id,
        type: type || "pdf",
      });

      res.status(201).json(newCert);
    } catch (err) {
      console.error("Certificate upload error:", err);
      res.status(500).json({ error: err.message || "Failed to upload certificate" });
    }
  }
);

// GET — All certificates (sorted newest first)
router.get("/", async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    console.error("Error fetching certificates:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE — Certificate by ID (removes from MongoDB and Cloudinary)
router.delete("/:id", async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    if (cert.filePublicId) {
      await deleteFromCloudinary(cert.filePublicId);
    }
    if (cert.thumbnailPublicId) {
      await deleteFromCloudinary(cert.thumbnailPublicId);
    }

    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    console.error("Error deleting certificate:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
