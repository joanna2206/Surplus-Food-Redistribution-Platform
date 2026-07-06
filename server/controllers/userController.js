const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ===============================
// Register User
// ===============================
const registerUser = async (req, res) => {
    try {

        // Get data from request body
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Save user to MongoDB
        await newUser.save();

        // Send response
        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ===============================
// Login User
// ===============================
const loginUser = async (req, res) => {
    try {

        // Get login credentials
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // Login successful
        res.status(200).json({
            message: "Login successful"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ===============================
// Export Functions
// ===============================
module.exports = {
    registerUser,
    loginUser
};