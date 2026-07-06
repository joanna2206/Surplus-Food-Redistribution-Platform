const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createRequest
} = require("../controllers/requestController");

// Protected Route
router.post(
    "/",
    authMiddleware,
    roleMiddleware("NGO"),
    createRequest
);

module.exports = router;