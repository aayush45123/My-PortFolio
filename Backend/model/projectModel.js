const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  techStack: { type: [String], default: [] },
  imageURL: { type: String, required: true },   // project image thumbnail
  githubURL: { type: String },
  liveURL: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
