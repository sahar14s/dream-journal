import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import dreamRoutes from "./routes/Dreams";
import authRoutes from "./routes/Auth";
dotenv.config();
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  console.log("🚀 Connected to MongoDB, starting server...");
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Adjust this to your client's origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log("➡", req.method, req.url);
  next();
});
// Simple CORS allowance so front-end calls (e.g. from localhost:3000) are not blocked
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });
//API Routes

app.use("/api",dreamRoutes)
app.use("/api",authRoutes)
// Basic route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
