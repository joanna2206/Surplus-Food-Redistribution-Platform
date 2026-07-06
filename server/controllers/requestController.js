const Request = require("../models/Request");
const Food = require("../models/Food");

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

// ===============================
// Get All Requests
// ===============================
const getAllRequests = async (req, res) => {
    try {

        const requests = await Request.find()
            .populate("food")
            .populate("ngo", "name email");

        res.status(200).json(requests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ===============================
// Accept Food Request
// ===============================
const acceptRequest = async (req, res) => {
    try {

        // Find the request
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        // Update request status
        request.status = "Accepted";
        await request.save();

        // Update food status
        await Food.findByIdAndUpdate(
            request.food,
            {
                status: "Reserved"
            },
            {
                new: true
            }
        );

        res.status(200).json({
            message: "Request accepted successfully",
            request
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
    createRequest,
    getAllRequests,
    acceptRequest
};