const express = require('express');
const dotenv = require('dotenv');
const connectDB  = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

// Middleware: parse JSON
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/water", require("./routes/waterRoutes"));

// Default route (HOME Page)
app.get("/", (req, res) => {
    res.send("API Server for Express JS is up and running....");
});


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));