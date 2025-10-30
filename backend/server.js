import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Ensure we load the .env file from this backend folder explicitly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

// --- Import WaterSource Model ---
 import WaterSource from './models/waterSource.js'; 

// --- Routes ---
app.get("/api/water-sources", async (req, res) => {
    try {
        const sources = await WaterSource.find();
        res.json(sources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/water-sources", async (req, res) => {
  try { 
    const newSource = new WaterSource(req.body);
    await newSource.save();
    res.json({ success: true, source: newSource });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get single water source by ID
app.get("/api/water-sources/:id", async (req, res) => {
  try {
    const source = await WaterSource.findById(req.params.id);
    if (!source) {
      return res.status(404).json({ message: "Water source not found" });
    }
    res.json(source);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Start Server ---
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();