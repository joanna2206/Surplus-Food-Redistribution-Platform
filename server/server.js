const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const requestRoutes = require("./routes/requestRoutes");

const { initSocket } = require("./socket");

// ===============================
// Load Environment Variables
// ===============================
dotenv.config();

// ===============================
// Connect MongoDB
// ===============================
connectDB();

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());

app.use(express.json());

// ===============================
// Routes
// ===============================
app.use("/api/users", userRoutes);

app.use("/api/foods", foodRoutes);

app.use("/api/requests", requestRoutes);

// ===============================
// Test Route
// ===============================
app.get("/", (req, res) => {

    res.send("Food Donation API is running...");

});

// ===============================
// Create HTTP Server
// ===============================
const server = http.createServer(app);

// ===============================
// Initialize Socket.IO
// ===============================
initSocket(server);

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`🚀 Server is running on port ${PORT}`);

});