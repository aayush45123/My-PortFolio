const express = require("express");
const router = express.Router();
const multer = require("multer");
const Certificate = require("../model/certificateModel");

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/certificates");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST — upload file + thumbnail
router.post(
  "/",
  upload.fields([{ name: "file" }, { name: "thumbnail" }]),
  async (req, res) => {
    try {
      const file = req.files.file[0];
      const thumbnail = req.files.thumbnail[0];

      const newCert = await Certificate.create({
        title: req.body.title,
        fileURL: `/uploads/certificates/${file.filename}`,
        thumbnailURL: `/uploads/certificates/${thumbnail.filename}`,
        type: req.body.type,
      });

      res.json(newCert);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// GET — all certificates
router.get("/", async (req, res) => {
  const certs = await Certificate.find().sort({ createdAt: -1 });
  res.json(certs);
});

module.exports = router;
