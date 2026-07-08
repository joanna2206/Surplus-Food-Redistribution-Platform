const Food = require("../models/Food");

// ===============================
// Add Food
// ===============================
const addFood = async (req, res) => {
    try {

        const {
            foodName,
            quantity,
            category,
            expiryDate,
            pickupAddress
        } = req.body;

        const newFood = new Food({
            foodName,
            quantity,
            category,
            expiryDate,
            pickupAddress,
            donor: req.user.id
        });

        await newFood.save();

        res.status(201).json({
            message: "Food added successfully",
            food: newFood
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ===============================
// Get All Foods
// ===============================
const getAllFoods = async (req, res) => {

    try {

        let foods = [];

        // Donor → Only his available foods
        if (req.user.role === "Donor") {

            foods = await Food.find({
                donor: req.user.id,
                status: "Available"
            });

        }

        // NGO → Only available foods
        else if (req.user.role === "NGO") {

            foods = await Food.find({
                status: "Available"
            }).populate("donor", "name email");

        }

        res.status(200).json(foods);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// Get Food By ID
// ===============================
const getFoodById = async (req, res) => {

    try {

        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        res.status(200).json(food);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// Update Food
// ===============================
const updateFood = async (req, res) => {

    try {

        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        if (food.donor.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.status(200).json({
            message: "Food updated successfully",
            food: updatedFood
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// Delete Food
// ===============================
const deleteFood = async (req, res) => {

    try {

        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        if (food.donor.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await Food.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Food deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addFood,
    getAllFoods,
    getFoodById,
    updateFood,
    deleteFood
};