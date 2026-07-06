
const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    registerUser,
    loginUser
} = require("../controllers/userController");


router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Welcome to your profile!",
        user: req.user
    });
});

module.exports = router;