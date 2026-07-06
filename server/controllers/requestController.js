const Request = require("../models/Request");

// ===============================
// Create Food Request
// ===============================
const createRequest = async (req, res) => {
    try {

        const { food } = req.body;

        const newRequest = new Request({
            food,
            ngo: req.user.id
        });

        await newRequest.save();

        res.status(201).json({
            message: "Food request sent successfully",
            request: newRequest
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createRequest
};