import express from 'express';
import { getUsers, authAdmin, logoutAdmin, addVehicle, getVehicle, getDrivers, blockUser, getSingleVehicle, editVehicle, deleteVehicle, getVehicleImages, driverApproval, driverApprove, driverDecline, getAllrides } from '../controllers/adminController.js';
import { isAdminAuthenticated } from '../middlewares/authMiddleware.js';
import upload from '../config/files.js';

const router = express.Router();

router.post('/adminlogin', authAdmin);
router.post('/logout', logoutAdmin);
router.route('/vehicles')
    .post( upload.array('vehicleImages'), addVehicle)
    .get(isAdminAuthenticated, getVehicle);
router.put('/vehicle/:id', editVehicle);
router.delete('/vehicle/:id', deleteVehicle);
router.get('/vehicleimages/:id', getVehicleImages);
router.get('/adminusers', getUsers);
router.get('/admindrivers', getDrivers);
router.post('/blockuser/:id', blockUser);
router.get('/vehicle/:id', getSingleVehicle)
router.get('/driverapproval/:id', isAdminAuthenticated, driverApproval)
router.post('/approve', isAdminAuthenticated, driverApprove)
router.put('/decline/:id', isAdminAuthenticated, driverDecline)
router.get('/adminridedetails', getAllrides);
// router.put('/users/:id', isAuthenticated, editUser);
// router.delete('/users/:id', isAuthenticated, deleteUser);


export default router;