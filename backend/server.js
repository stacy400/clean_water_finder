import express from "express"; 
import mongoose from "mongoose"; 
import cors from "cors"; 
import dotenv from "dotenv";
dotenv.config(); 
const app = express(); app.use(cors()); app.use(express.json());
app.use(cors()); 
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_ATLAS_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));