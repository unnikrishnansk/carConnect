import asyncHandler from "express-async-handler";
import Driver from '../models/driverModel.js';
import generateToken from "../utils/generateTokens.js";
import generateIds from "../utils/generateId.js";
import generateOTP from "../utils/generateOtp.js";
import nodemailer from 'nodemailer';
import Ride from '../models/rideModel.js';
import Vehicle from '../models/vehicleModel.js';
// import { sendMail,transporter } from "../config/mail.js";

// @desc    Auth driver/set token
// route    POST /api/drivers/login
// @access  Public
const authDriver = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const driver = await Driver.findOne({email});
    if (driver && (await driver.matchPassword(password))) {
        generateToken(res, driver._id);
        res.status(201).json({
            id: driver.id,
            name: driver.name,
            email: driver.email,
            phonenumber: driver.phonenumber,
            isBlocked: driver.isBlocked,
            isApproved: driver.isApproved
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }

})

// @desc    Register a new driver
// route    POST /api/drivers
// @access  Public
const registerDriver = asyncHandler(async (req, res) => {
    try {
    const { name, email, phonenumber, password } = req.body;
    console.log(req.body);

    const driverExists = await Driver.findOne({email});
    if (driverExists) {
        res.status(400);
        throw new Error("A Driver already exists in the same email.");
    }

    const id = "DRIVER"+generateIds();

    const driver = await Driver.create({id,name, email,phonenumber, password});

    const otp = generateOTP(4);
    console.log(otp);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.OFFICIAL_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
        debug: true,
      });
    
      
    
     // sending mail function for nodemailer
     const sendMail = async (transporter,mailOptions) =>{
        try{
            await transporter.sendMail(mailOptions);
        }
        catch(err){
            console.error("error sending mail",err);
        }
    }

    const mailOptions = {
        from: {
          name: "carConnect",
          sender: process.env.OFFICIAL_EMAIL
        }, // sender address
          to: driver.email, // list of receivers
          subject: "Verification Code for carConnect Drivers", // Subject line
          text: "Hello Driver, ", // plain text body
          html: `<b>Your verification code is : ${otp}</b>`, // html body
      }
  
      sendMail(transporter,mailOptions)

    if (driver) {
        generateToken(res, driver._id);
        res.status(201).json({
            id: driver.id,
            name: driver.name,
            email: driver.email,
            phonenumber:driver.phonenumber,
            otp:otp
        })
    } else {
        res.status(400);
        throw new Error("Invalid driver data.");
    }
} catch (error) {
        console.log(error);
}
})

// @desc    Logs out driver
// route    POST /api/drivers/logout
// @access  Public
const logoutDriver = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: "Driver logged out." })
})

// @desc    Retrieve driver profile
// route    GET /api/drivers/profile
// @access  Private
const getDriverProfile = asyncHandler(async (req, res) => {
    const driver = {
        id: req.driver.id,
        name: req.driver.name,
        phonenumber: req.driver.phonenumber,
        email: req.driver.email,
        imageURL: req.driver.imageURL,
        location: req.driver.location,
        licenseURL: req.driver.licenceURL,
        isApproved: req.driver.isApproved,
        isDeclined: req.driver.isDeclined
    }
    console.log(driver);
    res.status(200).json(driver);
})

// @desc    Update driver profile
// route    PUT /api/drivers/editdriver
// @access  Private
const editDriver = asyncHandler(async (req, res) => {
    console.log(req.body);
    console.log(req.files['driverimage'][0].filename);
    console.log(req.files['licenseimage'][0].filename);

    try {
        console.log(req);
    const { id, name, email, phonenumber, location } = req.body;
        // console.log(id, name, email, phonenumber, location);

        const driver = await Driver.findOne({id});
        // console.log(req.file);

        let driverimage = "";
        let licenseimage = "";
        if (req.files) {
            driverimage = req.files['driverimage'][0].filename;
            licenseimage = req.files['licenseimage'][0].filename;
        }

        if(driver){
            driver.name = name || driver.name;
            driver.email = email || driver.email;
            driver.phonenumber = phonenumber || driver.phonenumber;
            driver.location = location || driver.location;
            driver.imageURL = driverimage || driver.imageURL;
            driver.licenceURL = licenseimage || driver.licenseimage;

            const updatedDriver = await driver.save();
            res.status(200).json({
                id: updatedDriver.id,
                name: updatedDriver.name,
                email: updatedDriver.email,
                phonenumber: updatedDriver.phonenumber,
                location: updatedDriver.location,
                imageURL: updatedDriver.imageURL,
                licenseURL: updatedDriver.licenceURL
            });
        } 
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
})


const driverRides = asyncHandler(async(req, res) => {
    try {
        console.log(req.body);
        const {rideDriver} = req.body;
        // console.log(rideDriver);
        // Query the database for ride history of the given user
        const rideHistory = await Ride.find({ rideDriver }).sort({createdAt:-1});
        // console.log(rideHistory);
        // Send the ride history data as response
        res.status(200).json( rideHistory);
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
})

const acceptRides = asyncHandler(async(req,res) =>{
    try {
        console.log(req);
        const { id } = req.params;
        console.log(id);
        const ride = await Ride.findOne({id});
        const updatedRide = await Ride.findOneAndUpdate(
            { id },
            { isAccepted: true },
            { new: true } // This option ensures that the updated document is returned
        );
        res.status(200).json({ message: 'Ride accepted successfully', ride: updatedRide });
        console.log(ride);
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
})

const reachedRide = asyncHandler(async(req,res) =>{
    try {
        console.log(req);
        const { id } = req.params;
        console.log(id);
        const ride = await Ride.findOne({id});
        const updatedRide = await Ride.findOneAndUpdate(
            { id },
            { isCompleted: true },
            { new: true } // This option ensures that the updated document is returned
        );
        res.status(200).json({ message: 'Ride completed successfully', ride: updatedRide });
        console.log(ride);
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
})

const paymentReceived = async (req,res) => {

    try {
        console.log(req);
        const { id } = req.params;
        console.log(id);
        const ride = await Ride.findOne({id});
        const updatedRide = await Ride.findOneAndUpdate(
            { id },
            { isPaymentReceived: true },
            { new: true } // This option ensures that the updated document is returned
        );
        res.status(200).json({ message: 'Payment Received', ride: updatedRide });
        console.log(ride);
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}


const driverVehicle = async ( req,res) => {
    try {
        // console.log(req);
        const {id} = req.params;
        const driver = await Driver.findOne({id}, {drivervehicle:1});
        const vehicleid = driver.drivervehicle;
        const vehicle = await Vehicle.findOne({id:vehicleid});
        console.log(vehicle);
        res.status(200).json(vehicle);
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export { authDriver, registerDriver, logoutDriver, getDriverProfile, editDriver, driverRides, acceptRides, reachedRide, paymentReceived, driverVehicle };