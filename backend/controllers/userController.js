import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import generateToken from "../utils/generateTokens.js";
import generateIds from "../utils/generateId.js";
import generateOTP from "../utils/generateOtp.js";
import nodemailer from 'nodemailer';
import Vehicle from "../models/vehicleModel.js";
import Driver from "../models/driverModel.js";
import Razorpay from "razorpay";
import Ride from '../models/rideModel.js';
import Review from "../models/ReviewModel.js";


// @desc    Auth user/set token
// route    POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            isBlocked: user.isBlocked
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }

})

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, phonenumber, password } = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const id = "USER"+generateIds();

    const user = await User.create({id,name, email,phonenumber, password});

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
          to: user.email, // list of receivers
          subject: "Verification Code for carConnect Users", // Subject line
          text: "Hello Driver, ", // plain text body
          html: `<b>Your verification code is : ${otp}</b>`, // html body
      }
  
      sendMail(transporter,mailOptions)

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            phonenumber:user.phonenumber,
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data.");
    }
})

// @desc    user otp
// route    GET /api/users/otp
// @access  Public
const UserOtp = asyncHandler(async (req, res) => {
    try {
        console.log(res);
        const id  = req.params.id;
        console.log(id);
        const otp = generateOTP(4);
        console.log(otp);
    } catch (error) {
        
    }
})

// @desc    Logs out user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: "User logged out." })
})

// @desc    Retrieve user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        id: req.user.id,
        name: req.user.name,
        phonenumber: req.user.phonenumber,
        email: req.user.email,
        imageURL: req.user.imageURL,
        location: req.user.location,
    }

    res.status(200).json(user);
})

// @desc    Edit user
// route    PUT /api/users/editprofile
// @access  Private
const editUser = asyncHandler(async (req, res) => {

    try {
        // console.log(req);
    const { id, name, email, phonenumber, location } = req.body;
        // console.log(id, name, email, phonenumber, location);

        const user = await User.findOne({id});
        // console.log(req.file);

        let profileImage = "";
        if (req.file) {
            profileImage = req.file.filename;
        }

        if(user){
            user.name = name || user.name;
            user.email = email || user.email;
            user.phonenumber = phonenumber || user.phonenumber;
            user.location = location || user.location;
            user.imageURL = profileImage || user.imageURL;

            const updatedUser = await user.save();
            res.status(200).json({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phonenumber: updatedUser.phonenumber,
                location: updatedUser.location,
                imageURL: updatedUser.imageURL
            });
        } 
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
   
})


// @desc    List Vehicle 
// route    POST /api/users/vehiclelist
// @access  Private
const vehicleList = asyncHandler(async (req, res) => {
    try {
        
        const startplace = req.body.startplaceInfo;
        const destination = req.body.destplaceInfo;

        console.log(startplace);
        const startplaceWords = startplace.split(/\s+/);
        // const allWords = [...startplaceWords ];
        const allWords = startplaceWords.map(word => word.replace(/,/g, ''));

        console.log(allWords);

        const regexPattern = new RegExp(allWords.join('|'), 'i');

        const matchingVehicles = await Vehicle.find({
            location: { $regex: regexPattern },
            isDeleted: false,
          });

        console.log(matchingVehicles);
        res.status(201).json({vehicles: matchingVehicles});
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
})


// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {

    // const user = await User.findById(req.user._id);

    // if (user) {
    //     user.name = req.body.name || user.name;
    //     user.email = req.body.email || user.email;
    //     if (req.body.password) {
    //         user.password = req.body.password;
    //     }

    //     if (req.file) {
    //         user.imageURL = req.file.path;
    //     }

    //     const updatedUser = await user.save();
    //     res.status(200).json({
    //         _id: updatedUser._id,
    //         name: updatedUser.name,
    //         email: updatedUser.email,
    //         imageURL: updatedUser.imageURL
    //     });

    // } else {
    //     res.status(404);
    //     throw new Error("User not found.");
    // }
})

const userPayment = asyncHandler( async(req, res) => {
    
        if(req.body.paymentMethod === "COD"){
            try {

                const {rideUser,rideFrom,rideTo,rideAmount,paymentMethod,rideApproximateTime} = req.body;

                const id = "RIDE" + generateIds();
                const rideOtp = generateOTP(4);

                const startplaceWords = rideFrom.split(/\s+/);
                // const allWords = [...startplaceWords ];
                const allWords = startplaceWords.map(word => word.replace(/,/g, ''));

                console.log(allWords);

               const regexPattern = new RegExp(allWords.join('|'), 'i');

                const matchingDriver = await Driver.find({
                location: { $regex: regexPattern },
               });

                const data = {
                    id: id,
                    rideUser: rideUser,
                    rideDriver: matchingDriver[0]?.name,
                    rideFrom: rideFrom,
                    rideTo: rideTo,
                    rideAmount: rideAmount,
                    paymentMethod: paymentMethod,
                    rideApproximateTime: rideApproximateTime,
                    rideOtp: rideOtp,
                    isPaymentReceived:false
                }

                console.log(data);

                const ride = await Ride.create(data);
                if(ride){
                    res.status(201).json(ride);
                }else {
                    res.status(400);
                    throw new Error("invalid Ride");
                }

            } catch (error) {
                console.log(error);
            res.status(500).send("An error occurred while creating the order.");
            }
            
        }else if(req.body.paymentMethod === "Wallet"){

            const {rideUser,rideFrom,rideTo,rideAmount,paymentMethod,rideApproximateTime} = req.body;

                const id = "RIDE" + generateIds();
                const rideOtp = generateOTP(4);

                const startplaceWords = rideFrom.split(/\s+/);
                // const allWords = [...startplaceWords ];
                const allWords = startplaceWords.map(word => word.replace(/,/g, ''));

                console.log(allWords);

               const regexPattern = new RegExp(allWords.join('|'), 'i');

                const matchingDriver = await Driver.find({
                location: { $regex: regexPattern },
               });

                const data = {
                    id: id,
                    rideUser: rideUser,
                    rideDriver: matchingDriver[0]?.name,
                    rideFrom: rideFrom,
                    rideTo: rideTo,
                    rideAmount: rideAmount,
                    paymentMethod: paymentMethod,
                    rideApproximateTime: rideApproximateTime,
                    rideOtp: rideOtp,
                    isPaymentReceived:true
                }
            console.log(data);

            const user = await User.findOne({ name: rideUser });
            if (user) {
                
                const currentBalance = user.walletBalance;
                const newBalance = currentBalance - rideAmount;
                console.log(newBalance);

                const walletdata = {
                    walletID: generateIds(),
                    walletTransactionAmount: rideAmount,
                    walletDescription: "Fund used",
                    walletStatus: "success",
                }

                console.log(walletdata);
                await User.updateOne({name:rideUser},{
                    $push: {
                      wallet: {
                        $each: [walletdata],
                      },
                    },
                    walletBalance: newBalance
                  });
        
            }  
            const ride = await Ride.create(data);

            if(ride){
                res.status(201).json(ride);
            }else {
                res.status(400);
                throw new Error("invalid Ride");
            }
              
        }else{
            try{
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_SECRET,
            });
        
            const options = {
                amount: 100, // amount in smallest currency unit
                currency: "INR",
                receipt: "receipt_order_74394",
            };
        
            const order = await instance.orders.create(options);
        
            if (!order) {
                return res.status(500).send("Some error occurred while creating the order.");
            }
        
            res.json(order);
            
        } catch (error) {
            console.log(error);
            res.status(500).send("An error occurred while creating the order.");
        }
        }
        
})


const successPayment = async(req,res) => {
try {
    const {rideUser,rideFrom,rideTo,rideAmount,paymentMethod,rideApproximateTime,razorpayPaymentId} = req.body;

    const id = "RIDE" + generateIds();
    const rideOtp = generateOTP(4);

    const startplaceWords = rideFrom.split(/\s+/);
                // const allWords = [...startplaceWords ];
                const allWords = startplaceWords.map(word => word.replace(/,/g, ''));

                console.log(allWords);

               const regexPattern = new RegExp(allWords.join('|'), 'i');

                const matchingDriver = await Driver.find({
                location: { $regex: regexPattern },
               });

    const data = {
        id: id,
        rideUser: rideUser,
        rideDriver: matchingDriver[0]?.name,
        rideFrom: rideFrom,
        rideTo: rideTo,
        rideAmount: rideAmount,
        paymentMethod: paymentMethod,
        rideApproximateTime: rideApproximateTime,
        rideOtp: rideOtp,
        paymentID: razorpayPaymentId,
        isPaymentReceived: true
    }

    const ride = await Ride.create(data);

        if(ride){
            res.status(201).json(ride);
        }else {
            res.status(400);
            throw new Error("invalid Ride");
        }

    // console.log(req.body);
    // console.log(req.body);
} catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching payment");
}
}

const getRideHistory = async (req,res) => {
    try {
        const {rideUser} = req.body;
        console.log(rideUser);
        // Query the database for ride history of the given user
        const rideHistory = await Ride.find({ rideUser }).sort({createdAt:-1});
        console.log(rideHistory);
        // Send the ride history data as response
        res.status(200).json( rideHistory);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching ride history");
    }
}

const addWallet = async(req,res) => {
    try {
        const {amountAdded,userName} = req.body;
        console.log(amountAdded,userName);

        const walletbal = await User.findOne({name:userName});
        if (walletbal) {
            const updatedWalletBalance  = parseInt(walletbal.walletBalance) + parseInt(amountAdded);
            console.log(updatedWalletBalance );
            const updatedUser = await User.findOneAndUpdate(
                { name: userName },
                { $set: { walletBalance: updatedWalletBalance } },
                { new: true } // To return the updated document
            );
            console.log(updatedUser); 
        }

        const data = {
            walletID: generateIds(),
            walletTransactionAmount: amountAdded,
            walletDescription: "Fund added",
            walletStatus: "success",
        }

        await User.updateOne({name:userName},{
            $push: {
              wallet: {
                $each: [data],
              },
            },
          });

        const user = await User.findOne({name:userName});
        console.log(user);
        if(user){
            res.status(200).json({message: "Amount added"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while adding wallet");
    }
}

const getBalance = async (req,res) => {
    try {
        // console.log(req);
        const { id } = req.params;
        console.log(id);

        // Find the user by id
        const user = await User.findOne({ id });
        console.log(user.walletBalance);
        console.log(user.wallet);
        const reverseWallet = user.wallet.reverse();
        if(user){
            res.status(200).json({BalanceAmount : user.walletBalance, wallet: reverseWallet});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred fetching balance");
    }
}

const addReview = async (req,res) => {
    try {
        const { review, name, rating } = req.body;
        const id = "REV" + generateIds();

        const data = {
            id:id,
            reviewUser: name,
            reviewText: review,
            reviewRating: rating
        }
        console.log(review,name);

        const saveReview = await Review.create(data);

        if(saveReview){
            res.status(200).json(saveReview);
        }else{
            res.status(404).json("Invalid Review");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred adding review");
    }
}

const getReview = async (req,res) => {
    try {
        const reviews = await Review.find(); // Retrieve all reviews from the database
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred getting review");
    }
}

const googleLogin = async (req,res) => {
    try {
        const {email, displayName} = req.body;
        console.log(email,displayName);
        const userExists = await User.findOne({email});
        if (userExists) {
            generateToken(res, userExists._id);
            res.status(201).json({
                id: userExists.id,
                name: userExists.name,
                email: userExists.email,
            })
        }else{
            const id = "USER"+generateIds();
            const newData = {
                id:id,
                name: displayName,
                email: email,
                password: null,
                phonenumber: null
            }

            console.log(newData);

            const user = await User.create(newData);
            if (user) {
                generateToken(res, user._id);
                res.status(201).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                })
            } else {
                res.status(400);
                throw new Error("Invalid user data.");
            }
        }
    
        
    
        
    
        
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
}


export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, editUser, vehicleList, UserOtp, userPayment, successPayment, getRideHistory, addWallet, getBalance, addReview, getReview, googleLogin};