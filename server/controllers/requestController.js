const Request = require("../models/Request");
const Food = require("../models/Food");

// ===============================
// Create Food Request (NGO)
// ===============================
const createRequest = async (req, res) => {
    try {

        const { food } = req.body;

        const foodItem = await Food.findById(food);

        if (!foodItem) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        if (foodItem.status !== "Available") {
            return res.status(400).json({
                message: "Food is no longer available."
            });
        }

        const existingRequest = await Request.findOne({
            food,
            ngo: req.user.id,
            status: "Pending"
        });

        if (existingRequest) {
            return res.status(400).json({
                message: "You have already requested this food."
            });
        }

        const request = await Request.create({
            food,
            ngo: req.user.id
        });

        res.status(201).json({
            message: "Food request sent successfully",
            request
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

        const validRequests = requests.filter(
            request => request.food
        );

        res.status(200).json(validRequests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// NGO - My Requests
// ===============================
const getMyRequests = async (req, res) => {

    try {

        const requests = await Request.find({
            ngo: req.user.id
        })
            .populate("food")
            .populate("ngo", "name email");

        const validRequests = requests.filter(
            request => request.food
        );

        res.status(200).json(validRequests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// Donor - Incoming Requests
// ===============================
const getDonorRequests = async (req, res) => {

    try {

        const requests = await Request.find()
            .populate({
                path: "food",
                match: {
                    donor: req.user.id
                }
            })
            .populate("ngo", "name email");

        const donorRequests = requests.filter(
            request => request.food
        );

        res.status(200).json(donorRequests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// Accept Request
// ===============================
const acceptRequest = async (req, res) => {

    try {

        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        request.status = "Accepted";
        await request.save();

        await Food.findByIdAndUpdate(
            request.food,
            {
                status: "Reserved"
            }
        );

        // Reject all other pending requests
        await Request.updateMany(
            {
                food: request.food,
                _id: { $ne: request._id },
                status: "Pending"
            },
            {
                status: "Rejected"
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
// Reject Request
// ===============================
const rejectRequest = async (req, res) => {

    try {

        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        request.status = "Rejected";

        await request.save();

        res.status(200).json({
            message: "Request rejected successfully",
            request
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createRequest,
    getAllRequests,
    getMyRequests,
    getDonorRequests,
    acceptRequest,
    rejectRequest
};