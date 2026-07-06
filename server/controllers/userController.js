const User = require("../models/User");

const registerUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            role
        });

        await newUser.save();

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

module.exports = {
    registerUser
};