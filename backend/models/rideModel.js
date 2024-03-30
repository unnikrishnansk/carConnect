import mongoose from "mongoose";

const RideSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        rideUser: {
            type: String,
            required: true,
        },
        rideDriver: {
            type: String,
            required: true,
        },
        rideFrom: {
            type: String,
            required: true,
        },
        rideTo: {
            type: String,
            required: true,
        },
        rideAmount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        rideApproximateTime: {
            type: String,
            required: true,
        },
        rideOtp: {
            type: String,
            required: true,
        },
        isAccepted: {
            type: Boolean,
            required: true,
            default: false
        },
        isCompleted: {
            type: Boolean,
            required: true,
            default: false
        },
        isRejected: {
            type: Boolean,
            required: true,
            default: false
        },
        isPaymentReceived: {
            type: Boolean,
            required: false,
            default: false
        },
        paymentId: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

const Ride = mongoose.model('Ride', RideSchema);

export default Ride;