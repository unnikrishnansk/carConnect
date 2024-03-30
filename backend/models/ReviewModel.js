import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        reviewUser: {
            type: String,
            required: true,
        },
       reviewText: {
        type: String,
        required: true
       },
       reviewRating: {
        type: Number,
        required: true
       },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', ReviewSchema);

export default Review;