require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const certificateRoutes = require("./routes/certificateRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// ✅ CORS (CORRECT + PRODUCTION SAFE)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://aayush45123.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/certificates", certificateRoutes);
app.use("/api/projects", projectRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
