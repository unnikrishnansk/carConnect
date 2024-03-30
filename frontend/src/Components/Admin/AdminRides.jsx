import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import { useGetAllRideDetailQuery } from '../../Slices/adminApiSlice';

const AdminRides = () => {

    const [rideHistory,setRideHistory] = useState([]);

    const {data:getAllRideDetails, isError, refetch} = useGetAllRideDetailQuery();

  const formatTime = (createdAt) => {
    const formattedTime = (new Date(createdAt)).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    return formattedTime;
};

  return (
    <>
    <AdminNavbar />

    <div class="container">
      <div className="box border border-3 border-dark rounded mt-3" >
      {getAllRideDetails && getAllRideDetails.map(ride => (
                <div key={ride.id} className='ride-details border-1 border-dark text-dark'>
                     {ride.isAccepted===false && ride.isRejected===false && ride.isCompleted===false && <p className='fw-bold text-warning '>Ride yet to be confirmed by the driver</p>}
                     {ride.isAccepted===false && ride.isRejected===true && ride.isCompleted===false && <p className='fw-bold text-danger '>Ride rejected by the driver</p>}
                     {ride.isAccepted===true && ride.isRejected===false && ride.isCompleted===false && <p className='fw-bold text-primary '>Ride accepted, driver reaching to customer</p>}
                     {ride.isAccepted===true && ride.isRejected===false && ride.isCompleted===true && <p className='fw-bold text-success '>Ride completed</p>}
                    <p>Ride ID: {ride.id}</p>
                    <p>From: {ride.rideFrom}</p>
                    <p>To: {ride.rideTo}</p>
                    <p>Driver: {ride.rideDriver}</p>
                    <p>Booking Time: {formatTime(ride.createdAt)}</p>
                    {/* Add more details as needed */}
                </div>
            ))}
       
        <div className="btns p-2">
          {/* <button className='btn btn-primary btn-md'>Details</button> */}
          {/* <button className='btn btn-primary btn-md ml-2'>Subscribe</button> */}
        </div>
      </div>
    </div>

    </>
  )
}

export default AdminRides;