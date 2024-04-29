import express from 'express';
import { authDriver, registerDriver, logoutDriver, getDriverProfile, editDriver, driverRides, acceptRides, reachedRide, paymentReceived, driverVehicle} from '../controllers/driverController.js';
import { isDriverAuthenticated, isDriverBlocked } from '../middlewares/authMiddleware.js';
import upload from '../config/files.js';

const router = express.Router();

router.post('/driversignup', registerDriver);
router.post('/driverlogin', authDriver);
router.post('/logout', logoutDriver);
router.route('/driverprofile')
    .get(isDriverAuthenticated, isDriverBlocked, getDriverProfile)
    // .put(isDriverAuthenticated, upload.single('profilePicture'), updateDriverProfile);
// router.get('/profile/avatar', isDriverAuthenticated, fetchProfilePic);
router.put('/editdriver', upload.fields([{ name: 'driverimage', maxCount: 1 }, { name: 'licenseimage', maxCount: 1 }]), isDriverAuthenticated, editDriver);
router.post('/driverridehistory', driverRides);
router.get('/acceptride/:id', acceptRides);
router.get('/reachedride/:id', reachedRide);
router.get('/paymentreceived/:id', paymentReceived);
router.get('/drivervehicle/:id', driverVehicle);


export default router;