const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    addFood,
    getAllFood,
    getFoodById,
    updateFood,
    deleteFood
} = require("../controllers/foodController");

// Public Routes
router.get("/", getAllFood);
router.get("/:id", getFoodById);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("Donor"),
    addFood
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Donor"),
    updateFood
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Donor"),
    deleteFood
);

module.exports = router;