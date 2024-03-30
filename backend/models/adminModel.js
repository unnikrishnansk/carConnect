import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: false,
            default: ''
        }
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;