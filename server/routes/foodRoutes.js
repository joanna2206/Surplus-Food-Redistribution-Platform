const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    addFood,
    getAllFoods,
    getFoodById,
    updateFood,
    deleteFood
} = require("../controllers/foodController");

// ===============================
// Get All Foods
// Accessible by both Donor and NGO
// ===============================
router.get(
    "/",
    authMiddleware,
    getAllFoods
);

// ===============================
// Get Food By ID
// ===============================
router.get(
    "/:id",
    authMiddleware,
    getFoodById
);

// ===============================
// Add Food (Donor Only)
// ===============================
router.post(
    "/",
    authMiddleware,
    roleMiddleware("Donor"),
    addFood
);

// ===============================
// Update Food (Donor Only)
// ===============================
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Donor"),
    updateFood
);

// ===============================
// Delete Food (Donor Only)
// ===============================
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Donor"),
    deleteFood
);

module.exports = router;