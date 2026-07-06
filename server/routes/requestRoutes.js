const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createRequest,
    getAllRequests,
    acceptRequest
} = require("../controllers/requestController");

// View all requests
router.get("/", getAllRequests);

// NGO creates a request
router.post(
    "/",
    authMiddleware,
    roleMiddleware("NGO"),
    createRequest
);

// Donor accepts a request
router.put(
    "/:id/accept",
    authMiddleware,
    roleMiddleware("Donor"),
    acceptRequest
);

module.exports = router;