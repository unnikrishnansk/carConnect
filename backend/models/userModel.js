import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const walletSchema = new mongoose.Schema({
    walletID: {
        type: String,
        required: true
    },
    walletBalance: {
        type: Number,
        required: true
    },
    walletTime: {
        type: Date,
        default: Date.now
    },
    walletDescription: {
        type: String
    },
    walletStatus: {
        type: String
    },
    walletTransactionAmount: {
        type: Number
    }
});

const userSchema = mongoose.Schema(
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
        phonenumber: {
            type: Number,
            required: true,
            default: ""
        },
        password: {
            type: String,
            required: true,
            default: ""
        },
        imageURL: {
            type: String,
            required: false,
            default: ''
        },
        location: {
            type: String,
            required: false,
            default: ''
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        wallet: {
            type: [walletSchema],
            required: true,
            default: []
        },
        walletBalance:{
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;