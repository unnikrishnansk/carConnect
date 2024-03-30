import React, { useState } from 'react';
import "./RideSuccess.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const RideSuccess = () => {

  const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { rideInfo } = useSelector((state)=>state.ride);
    console.log(rideInfo);

    const handleRideDetails = () => {
        navigate('/ridedetails');
    }

     // Simulate data loading
   setTimeout(() => {
    setLoading(false);
  }, 5000); // 5000 milliseconds = 5 seconds

  return (
    <>
     {loading ? (<Loader/>) : (
    <div className='container'>
     <div class="card">
      <div style={{bordeRadius:"200px", height:"200px", width:"200px", background: "#F8FAF5", margin:"0 auto"}}>
        <i className="checkmark">✓</i>
      </div>
        <h1 className='heading'>Success</h1> 
        <p className='parag'>Your Ride has been successfully booked<br/> Confirm OTP :- <b className='text-dark'>{rideInfo.rideOtp}</b></p>
        <p className='parag'>Your Driver <b className='text-dark'>{rideInfo.rideDriver}</b> is on the way<br/> </p>
        <p className='parag'>Confirm the OTP with the Driver for Safety and Scurity!... Wishing you safe journey!..</p>

        <p className='parag'>For more details about the ride <b className='text-dark
         link' onClick={handleRideDetails}>Ride Details</b></p>
      </div>
      </div>
      )}
    </>
  )
}

export default RideSuccess;