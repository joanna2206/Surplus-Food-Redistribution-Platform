const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Test Route
app.get("/", (req, res) => {
    res.send("Food Donation API is running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});