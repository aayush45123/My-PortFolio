require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const certificateRoutes = require("./routes/certificateRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files (IMPORTANT FIX)
app.use("/uploads", express.static(__dirname + "/uploads"));

// Routes
app.use("/api/certificates", certificateRoutes);
app.use("/api/projects", projectRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
