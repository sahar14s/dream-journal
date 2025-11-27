import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  console.log("🚀 Connected to MongoDB, starting server...");
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
