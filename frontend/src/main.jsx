import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './store.js';
import Homepage from './Components/Users/Homepage.jsx';
import Login from './Components/Users/Login.jsx';
import Signup from './Components/Users/Signup.jsx';
import AdminLogin from './Components/Admin/AdminLogin.jsx';
import DriverLogin from './Components/Drivers/DriverLogin.jsx';
import DriverSignup from './Components/Drivers/DriverSignup.jsx';
import AdminHomepage from './Components/Admin/AdminHomepage.jsx';
import AdminUsers from './Components/Admin/AdminUsers.jsx';
import AdminDrivers from './Components/Admin/AdminDrivers.jsx';
import AdminVehicles from './Components/Admin/AdminVehicles.jsx';
import DriverHomepage from './Components/Drivers/DriverHomepage.jsx';
import Profile from './Components/Users/Profile.jsx';
import PrivateRoute from './Components/Users/PrivateRoute.jsx';
import DriverProfile from './Components/Drivers/DriverProfile.jsx';
import DriverPrivateroute from './Components/Drivers/DriverPrivateroute.jsx';
import Careers from './Components/Users/Careers.jsx';
import AdminAddvehicle from './Components/Admin/AdminAddvehicle.jsx';
import AdminVehicleimages from './Components/Admin/AdminVehicleimages.jsx';
import EditUserProfile from './Components/Users/EditUserProfile.jsx';
import EditDriverProfile from './Components/Drivers/EditDriverProfile.jsx';
import AdminApproveDriver from './Components/Admin/AdminApproveDriver.jsx';
import { DriverOtp } from './Components/Drivers/DriverOtp.jsx';
import UserOtp from './Components/Users/UserOtp.jsx';
import MapRender from './Components/Users/MapContainer.jsx';
import VehicleList from './Components/Users/VehicleList.jsx';
import Payment from './Components/Users/Payment.jsx';
import RideSuccess from './Components/Users/RideSuccess.jsx';
import RideDetails from './Components/Users/RideDetails.jsx';
import DriverRides from './Components/Drivers/DriverRides.jsx';
import AdminRides from './Components/Admin/AdminRides.jsx';
import DriverMap from './Components/Drivers/DriverMap.jsx';
import Wallet from './Components/Users/Wallet.jsx';
import Review from './Components/Users/Review.jsx';
import About from './Components/Users/About.jsx';
import Chat from './Components/Users/Chat.jsx';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:5000');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* User Routes */}
      <Route index={true} path='/' element={<Homepage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/userotp/:id' element={<UserOtp />} />
      <Route path='/careers' element={<Careers />} />
      <Route path='/aboutus' element={<About />} />

      {/* User Private Routes */}

      <Route path='' element={<PrivateRoute />} >
      <Route path='/profile' element={<Profile />} />
      <Route path='/map' element={<MapRender />} />
      <Route path='/edituserprofile' element={<EditUserProfile />} />
      <Route path='/vehiclelist' element={<VehicleList />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/paymentsuccess' element={<RideSuccess />} />
      <Route path='/ridedetails' element={<RideDetails />} />
      <Route path='/wallet' element={<Wallet />} />
      <Route path='/review' element={<Review />} />
      <Route path='/chat' element={<Chat />} />
      </Route>

      {/* Admin Routes */}
      <Route path='/adminlogin' element={<AdminLogin />} />
      <Route path='/adminhome' element={<AdminHomepage />} />
      <Route path='/adminusers' element={<AdminUsers />} />
      <Route path='/admindrivers' element={<AdminDrivers />} />
      <Route path='/adminvehicles' element={<AdminVehicles />} />
      <Route path='/addvehicle' element={<AdminAddvehicle />} />
      <Route path='/vehicleimages/:id' element={<AdminVehicleimages />} />
      <Route path='/approvedriver/:id' element={<AdminApproveDriver />} />
      <Route path='/adminrides' element={<AdminRides />} />


      {/* Driver Routes */}
      <Route path='/driverlogin' element={<DriverLogin />} />
      <Route path='/driversignup' element={<DriverSignup />} />
      <Route path='/driverotp' element={<DriverOtp />} />
      <Route path='/driverhome' element={< DriverHomepage/>} />
      <Route path='/drivermap' element={< DriverMap/>} />

      {/* Driver Private Routes */}
      <Route path='' element={<DriverPrivateroute />}>
      <Route path='/driverprofile' element={<DriverProfile />} />
      <Route path='/drivereditprofile' element={<EditDriverProfile />} />
      <Route path='/driverrides' element={<DriverRides />} />
      </Route>
    </Route>

    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="166178450391-755v0st5s6232gpcd7smpjvu9qt2gabd.apps.googleusercontent.com">
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  </Provider>
  </GoogleOAuthProvider>
)
