import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateTokens.js";
import generateIds from "../utils/generateId.js";
import Vehicle from "../models/vehicleModel.js";
import User from "../models/userModel.js";
import Driver from "../models/driverModel.js";
import path from 'path';
import Ride from '../models/rideModel.js';

// @desc    Auth admin/set token
// route    POST /api/admin/login
// @access  Public

const authAdmin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const admin = await Admin.findOne({email});
    console.log(admin);
    if (admin && (await admin.password===password)) {
        generateToken(res, admin._id);
        res.status(201).json({
            id: admin.id,
            name: admin.name,
            email: admin.email,
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }

})

// @desc    Logs out admin
// route    POST /api/admin/logout
// @access  Public
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: "Admin logged out." })
})

// @desc    get users
// route    GET /api/admin/adminusers
// @access  Private

const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
       res.status(401).json("Users not found");
    }
})

// @desc    post block users
// route    POST /api/admin/blockusers
// @access  Private

const blockUser = asyncHandler(async (req, res) => {
    const userid = req.params.id;
    try {
        const user = await User.findOne({ id: userid });
    
        if (user) {
          user.isBlocked = !user.isBlocked;
          const updatedUser = await user.save();
          console.log(updatedUser);
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error('Error Blocking user', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
})


// @desc    get drivers
// route    GET /api/admin/admindrivers
// @access  Private

const getDrivers = asyncHandler(async (req, res) => {
    const drivers = await Driver.find({});
    res.status(200).json(drivers);
})


// @desc    Add a vehicle
// route    POST /api/admin/vehicle
// @access  Private

const addVehicle = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const { model, type, registration, location, noPassenger } = req.body;

        const vehicleExists = await User.findOne({registration});
        if (vehicleExists) {
            res.status(400);
            throw new Error("Vehicle already exists.");
        }

        let vehicleImages = "";
        if (req.files) {
            vehicleImages = req.files.map(file => file.filename);
        }

        const id = "VEHICLE"+generateIds();

        const vehicle = await Vehicle.create({id,model, type, registration, location, vehicleURL: vehicleImages, passengers: noPassenger});

        if (vehicle) {
            generateToken(res, vehicle._id);
            res.status(201).json({
                id: vehicle.id,
                model: vehicle.model,
                type: vehicle.type,
                registration: vehicle.registration,
                location: vehicle.location,
                passengers: vehicle.passengers
            })
        } else {
            res.status(400);
            throw new Error("Invalid user data.");
        }
    // console.log(req.files);
    // console.log(req.body);
    } catch (error) {
        console.log(error);
        throw new Error(error)
        
    }
    
})
    
// @desc    Edit a vehicle
// route    PUT /api/admin/vehicles
// @access  Private

const editVehicle = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { model, type, registration, location, passengers } = req.body;
        console.log(model,type,registration,location,passengers);
        // console.log(id);
        const vehicle = await Vehicle.findOne({id});
        console.log(vehicle);

        if (vehicle) {
            vehicle.model = model || vehicle.model;
            vehicle.type = type || vehicle.type;
            vehicle.registration = registration || vehicle.registration;
            vehicle.passengers = passengers || vehicle.passengers;
            vehicle.location = location || vehicle.location;
    
            const updatedVehicle = await vehicle.save();
            res.status(200).json({
                id: updatedVehicle.id,
                model: updatedVehicle.model,
                type: updatedVehicle.type,
                registration: updatedVehicle.registration,
                passengers: updatedVehicle.passengers,
                location: updatedVehicle.location
            });
    
        } else {
            res.status(404);
            throw new Error("Vehicle not found.");
        }
    } catch (error) {
        console.log(error);
        throw new Error(error)
        
    }
    
})


// @desc    Retrieve vehicle data
// route    GET /api/admin/vehicle
// @access  Private
const getVehicle = asyncHandler(async (req, res) => {
    try {
        const allVehicles = await Vehicle.find({isDeleted: false});
        res.status(200).json(allVehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// @desc    Delete vehicle data
// route    DELETE /api/admin/vehicle
// @access  Private
const deleteVehicle = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        await Vehicle.updateOne({id},{$set:{isDeleted: true}});
        const vehicle = await Vehicle.findOne({id});
        console.log(vehicle);
        
    if (vehicle) {
        // vehicle.isDeleted = true;
        // await vehicle.save();

        res.status(200).json({
            id: vehicle.id,
            model: vehicle.model,
            type: vehicle.type,
            registration: vehicle.registration,
            location: vehicle.location,
            passengers: vehicle.passengers
        });
    } else {
        res.status(404);
        throw new Error("Vehicle not found.");
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// @desc    Retrieve vehicle images
// route    GET /api/admin/vehicleimages
// @access  Private
const getVehicleImages = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const vehicle = await Vehicle.findOne({id});
        console.log(vehicle);

        if(vehicle){
            const imagePaths = vehicle.vehicleURL.map(imageName => `/${imageName}`);
            res.status(200).json(imagePaths);
            return;
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error',error });
    }
})

// @desc    Retrieve driver approval data
// route    GET /api/admin/driverapproval
// @access  Private
const driverApproval = asyncHandler(async (req, res) => {
    try {
        const  id  = req.params.id;
        // console.log(id);
        const driver = await Driver.findOne({id});
        // console.log(driver);

        if(driver){
            res.status(200).json({
                id: driver.id,
                name: driver.name,
                email: driver.email,
                phonenumber: driver.phonenumber,
                imageURL: driver.imageURL,
                licenceURL: driver.licenceURL,
                location: driver.location
            });
        }else{
            res.status(401).json("Driver not found");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error',error });
    }
})

// @desc     driver approve
// route    POST /api/admin/approve
// @access  Private
const driverApprove = asyncHandler(async (req, res) => {
    try {
        
        const { id, selectedVehicleId } = req.body
        console.log(id,selectedVehicleId);
    
        await Driver.updateOne({id},{$set:{isApproved: true,drivervehicle: selectedVehicleId}});
        const driver = await Driver.findOne({id});

        const driverData = {
            id: driver.id,
            name: driver.name,
            email: driver.email,
            phonenumber: driver.phonenumber,
            location: driver.location
        }

        await Vehicle.updateOne({id:selectedVehicleId},{
            $push: {
              driver: {
                $each: [driverData],
              },
            },
          });
        const vehicle = await Vehicle.findOne({id:selectedVehicleId});
        console.log(driver);
        console.log(vehicle);

        if(driver){
            res.status(200).json({
                id: driver.id,
                name: driver.name,
                email: driver.email,
                phonenumber: driver.phonenumber,
                imageURL: driver.imageURL,
                licenceURL: driver.licenceURL,
                location: driver.location,
                isApproved: driver.isApproved
            });
        }else{
            res.status(401).json("Driver not found");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error',error });
    }
})


// @desc     driver decline 
// route    PUT /api/admin/decline
// @access  Private
const driverDecline = asyncHandler(async (req, res) => {
    try {
        const  id  = req.params.id;
        console.log(id);
        await Driver.updateOne({id},{$set:{isDeclined: true}});
        const driver = await Driver.findOne({id});
        console.log(driver);

        if(driver){
            res.status(200).json({
                id: driver.id,
                name: driver.name,
                email: driver.email,
                phonenumber: driver.phonenumber,
                imageURL: driver.imageURL,
                licenceURL: driver.licenceURL,
                location: driver.location,
                isApproved: driver.isApproved
            });
        }else{
            res.status(401).json("Driver not found");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error',error });
    }
})



// @desc    Retrieve one vehicle data
// route    GET /api/admin/vehicle/:id
// @access  Private
const getSingleVehicle = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id);
        const  vehid  = req.params.id;
        console.log(vehid);
        const vehicle = await Vehicle.findOne({id:vehid});
        res.status(200).json(vehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// @desc    Block a user
// route    POST /api/admin/block
// @access  Private
const createUser = asyncHandler(async (req, res) => {
    // const { name, email, password } = req.body;

    // const userExists = await User.findOne({email});
    // if (userExists) {
    //     res.status(400);
    //     throw new Error("User already exists.");
    // }

    // const user = await User.create({name, email, password});
    // if (user) {
    //     res.status(201).json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email
    //     })
    // } else {
    //     res.status(400);
    //     throw new Error("Invalid user data.");
    // }
})

// @desc    Edit a user by ID
// route    PUT /api/admin/users/:id
// @access  Private
const editUser = asyncHandler(async (req, res) => {
    // const { id } = req.params;
    // const { name, email } = req.body;

    // const user = await User.findById(id);
    // // todo: verify/validate user credentials 
    // if (user) {
    //     user.name = name || user.name;
    //     user.email = email || user.email;

    //     const updatedUser = await user.save();
    //     res.status(200).json({
    //         _id: updatedUser._id,
    //         name: updatedUser.name,
    //         email: updatedUser.email
    //     });

    // } else {
    //     res.status(404);
    //     throw new Error("User not found.");
    // }
})

// @desc    Get all rides
// route    GET /api/admin/adminridedetails
// @access  Private
const getAllrides = asyncHandler(async (req, res) => {
    try {
        const allRides = await Ride.find().sort({createdAt:-1});
        console.log(allRides);
        if(allRides){
            res.status(200).json(allRides);
        }else{
            res.status(404).json("Rides not found");
        }
    } catch (error) {
        res.status(404);
        throw new Error("Some error occured.");
    }
});


const getAdminhome = asyncHandler(async(req,res) => {

    try {
        const rides = await Ride.find();
        const Numusers = await User.countDocuments();
        const Numdrivers = await Driver.countDocuments();
        const activeDrivers = await Driver.countDocuments({ isBlocked: false });
        const Numvehicles = await Vehicle.countDocuments();
        res.status(200).json({rides,Numusers,Numdrivers,activeDrivers,Numvehicles});
    } catch (error) {
        res.status(404);
        throw new Error("Some error occured.");
    }
});

export {authAdmin, logoutAdmin, addVehicle, getVehicle, createUser, editUser, getAllrides, getUsers, getDrivers, blockUser, getSingleVehicle, editVehicle, deleteVehicle, getVehicleImages, driverApproval, driverApprove, driverDecline, getAdminhome};