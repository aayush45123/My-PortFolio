const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../model/projectModel");
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");

// Use in-memory buffer storage (production-safe, no local disk writes)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// POST - Create new project with Cloudinary upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, techStack, githubURL, liveURL } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Project title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Project image is required" });
    }

    // Stream image buffer directly to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, {
      folder: "portfolio/projects",
    });

    const parsedTechStack = Array.isArray(techStack)
      ? techStack
      : typeof techStack === "string"
      ? techStack.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const newProject = await Project.create({
      title,
      description,
      techStack: parsedTechStack,
      imageURL: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
      githubURL,
      liveURL,
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error("Project upload error:", err);
    res.status(500).json({ error: err.message || "Failed to upload project" });
  }
});

// GET all projects (sorted first uploaded first)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE project by ID (removes from MongoDB & Cloudinary)
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.cloudinaryPublicId) {
      await deleteFromCloudinary(project.cloudinaryPublicId);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
