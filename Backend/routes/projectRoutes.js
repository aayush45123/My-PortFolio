const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../model/projectModel");

// storage for project images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, __dirname + "/../uploads/projects"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST - create new project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newProject = await Project.create({
      title: req.body.title,
      description: req.body.description,
      techStack: req.body.techStack ? req.body.techStack.split(",") : [],
      imageURL: `/uploads/projects/${req.file.filename}`,
      githubURL: req.body.githubURL,
      liveURL: req.body.liveURL,
    });

    res.json(newProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// GET all projects
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

module.exports = router;
