const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileURL: { type: String, required: true },
  filePublicId: { type: String },
  thumbnailURL: { type: String, required: true },
  thumbnailPublicId: { type: String },
  type: { type: String, enum: ["pdf", "image"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Certificate", certificateSchema);
