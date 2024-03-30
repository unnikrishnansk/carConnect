import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        registration: {
            type: String,
            required: true,
        },
        passengers: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: false,
            default: ''
        },
        vehicleURL: {
            type: Array,
            required: false,
            default: []
        },
        isDeleted: {
            type: Boolean,
            required: false,
            default: false
        },
        driver: {
            type: Array,
            required: false,
            default: []
        }
    },
    {
        timestamps: true,
    }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;