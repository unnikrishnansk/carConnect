import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, editUser,vehicleList, UserOtp, userPayment, successPayment, getRideHistory, addWallet, getBalance, addReview, getReview, googleLogin } from '../controllers/userController.js';
import { isUserAuthenticated, isUserBlocked } from '../middlewares/authMiddleware.js';
import upload from '../config/files.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/logout',  logoutUser);
router.route('/profile')
    .get(isUserAuthenticated, isUserBlocked, getUserProfile)
    // .put(isUserAuthenticated, upload.single('profilePicture'), updateUserProfile);
router.put('/edituser',upload.single('profileimage'), isUserAuthenticated, editUser);
// router.get('/profile/avatar', isUserAuthenticated, fetchProfilePic);
router.get('/userotp/:id', UserOtp);
router.post('/vehiclelist', vehicleList);
router.post('/payment', userPayment);
router.post('/payment/success', successPayment);
router.post('/rideshistory', getRideHistory);
router.post('/addwallet', addWallet);
router.get('/getbalance/:id', getBalance);
router.post('/addreview', addReview);
router.get('/getreview', getReview);
router.post('/googlelogin', googleLogin);

export default router;