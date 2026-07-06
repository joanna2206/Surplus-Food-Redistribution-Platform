const Food = require("../models/Food");

// ===============================
// Add Food Donation
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
// Get All Food Donations
// ===============================
const getAllFood = async (req, res) => {
    try {

        const foods = await Food.find().populate("donor", "name email");

        res.status(200).json(foods);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ===============================
// Get Single Food Donation
// ===============================
const getFoodById = async (req, res) => {
    try {

        const food = await Food.findById(req.params.id)
            .populate("donor", "name email");

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
// Update Food Donation
// ===============================
const updateFood = async (req, res) => {
    try {

        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedFood) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

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
// Delete Food Donation
// ===============================
const deleteFood = async (req, res) => {
    try {

        const deletedFood = await Food.findByIdAndDelete(req.params.id);

        if (!deletedFood) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

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
    getAllFood,
    getFoodById,
    updateFood,
    deleteFood
};