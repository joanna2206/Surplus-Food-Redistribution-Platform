const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createRequest,
    getAllRequests,
    getMyRequests,
    getDonorRequests,
    acceptRequest,
    rejectRequest
} = require("../controllers/requestController");

// ======================================
// Get All Requests (Testing)
// ======================================
router.get(
    "/",
    authMiddleware,
    getAllRequests
);

// ======================================
// NGO - View My Requests
// ======================================
router.get(
    "/my",
    authMiddleware,
    roleMiddleware("NGO"),
    getMyRequests
);

// ======================================
// Donor - View Requests For My Food
// ======================================
router.get(
    "/donor",
    authMiddleware,
    roleMiddleware("Donor"),
    getDonorRequests
);

// ======================================
// NGO - Create Food Request
// ======================================
router.post(
    "/",
    authMiddleware,
    roleMiddleware("NGO"),
    createRequest
);

// ======================================
// Donor - Accept Request
// ======================================
router.put(
    "/:id/accept",
    authMiddleware,
    roleMiddleware("Donor"),
    acceptRequest
);

// ======================================
// Donor - Reject Request
// ======================================
router.put(
    "/:id/reject",
    authMiddleware,
    roleMiddleware("Donor"),
    rejectRequest
);

module.exports = router;