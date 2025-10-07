const mongoose = require('mongoose');

const waterSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,            
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  quality: {
    type: String,
    enum: ['Good', 'Moderate', 'Poor'],
    default: 'Good',
  },
  status: {
    type: String,
    enum: ['Available', 'Unavailable', 'Unknown'],
    default: 'Available',
  },
  description: {
    type: String,
    default: '',
  },
  addedBy: {
    type: String,             
    default: 'Anonymous',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  }
});

const WaterSource = mongoose.model('WaterSource', waterSourceSchema);
module.exports = WaterSource;
