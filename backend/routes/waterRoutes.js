const express = require('express');
const router = express.Router();
const WaterSource = require('../models/waterSource');

// Create a new water source
router.post('/', async (req, res) => {
  try {
    const newSource = new WaterSource(req.body);
    const saved = await newSource.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all water sources
router.get('/', async (req, res) => {
  const sources = await WaterSource.find();
  res.json(sources);
});
module.exports = router;