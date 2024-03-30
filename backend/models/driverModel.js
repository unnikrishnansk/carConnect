import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const driverSchema = mongoose.Schema(
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
        },
        password: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: false,
            default: ''
        },
        licenceURL: {
            type: String,
            required: false,
            default: ''
        },
        location: {
            type: String,
            required: false,
            default: ''
        },
        isApproved: {
            type: Boolean,
            default: false
        },
        isDeclined: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        drivervehicle: {
            type: String,
            required: false,
            default: ""
        }
    },
    {
        timestamps: true,
    }
);

driverSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

driverSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;