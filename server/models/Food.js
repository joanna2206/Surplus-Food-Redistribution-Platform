const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        foodName: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        expiryDate: {
            type: Date,
            required: true
        },

        pickupAddress: {
            type: String,
            required: true
        },

        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["Available", "Reserved", "Completed"],
            default: "Available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Food", foodSchema);