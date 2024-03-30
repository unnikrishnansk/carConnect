import React, { useState, useEffect } from 'react'
import DriverNavbar from './DriverNavbar';
import DriverSidebar from './DriverSidebar';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAcceptRideMutation, useGetDriverRideDetailMutation, usePaymentReceivedMutation, useReachedRideMutation } from '../../Slices/driverApiSlice';
import { Link } from 'react-router-dom';

const DriverRides = () => {

    const [rideHistory,setRideHistory] = useState([]);
    const [showReachedButton, setShowReachedButton] = useState(false);
    const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false);
    const [isButtonVisible, setButtonVisible] = useState(true);

    const { driverInfo } = useSelector((state)=>state.driver);
    const rideDriver = driverInfo.name;
    console.log(rideDriver);

    const [getDriverRideDetails, {isError}] = useGetDriverRideDetailMutation();
    const [acceptRide, {isLoading:isAccepting, refetch}] = useAcceptRideMutation();
    const [reachedRide,{isLoading:isReaching}] = useReachedRideMutation();
    const [paymentReceived,{isLoading:isReceived}] = usePaymentReceivedMutation();

    useEffect(() => {
        const getRides = async () => {
            const rides = await getDriverRideDetails({rideDriver}).unwrap();
            console.log(rides);
            setRideHistory(rides);
        }
        getRides();
        
    }, [rideDriver])

    console.log(rideHistory);

    const handleConfirm = async (id) => {
      try {
        console.log(id);
        const res = await acceptRide(id).unwrap();
        console.log(res);
        toast.success(res.message);
        refetchRides();
      } catch (error) {
        console.log(error);
        toast.error(res.error);
      }
    }

    const handleReached = async (id) => {
      try {
        console.log(id);
        const res = await reachedRide(id).unwrap();
      //   console.log(res);
        toast.success(res.message);
        refetchRides();
      } catch (error) {
        console.log(error);
        toast.error(res.error);
      }
    }

    const refetchRides = () => {
      getDriverRideDetails({ rideDriver }).unwrap().then(setRideHistory).catch(console.error);
  };

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

const confirmOtp = (e,id) => {
  const checkotp = e.target.previousElementSibling.value;
  const foundRide = rideHistory.find(ride => ride.id === id);
  if(foundRide.rideOtp !== checkotp){
    toast.error("Otp doesnot match");
    return;
  }else{
    setShowReachedButton(true);
    setConfirmButtonDisabled(true);
    toast.success("Otp Matches!.. Wishing safe journey!..")
  }
  console.log(foundRide.rideOtp);
  console.log(checkotp);
}

const handleCashReceived = async (id) => {
  console.log(id);
  const res = await paymentReceived(id).unwrap();
  console.log(res);
  toast.success("Cash Received");
  refetchRides();
}


  return (
    <>
    <DriverNavbar />
    <div className='d-flex align-items-stretch'>
    <DriverSidebar />
    <div class="container">
      <div className="box border border-3 border-dark rounded m-3 text-dark" >
      {rideHistory && rideHistory.map(ride => (
                <div key={ride.id} className='ride-details border-dark'>
                     {ride.isAccepted===false && ride.isRejected===false && ride.isCompleted===false && <p className='fw-bold text-warning'>You have a ride waiting!..</p>}
                     {ride.isAccepted===false && ride.isRejected===true && ride.isCompleted===false && <p className='fw-bold text-danger'>You have Rejected this ride!..</p>}
                     {ride.isAccepted===true && ride.isRejected===false && ride.isCompleted===false && <p className='fw-bold text-primary '>Customer safety is in your hand!.. Confirm OTP :- <input type="number" required /> {!confirmButtonDisabled  && <button onClick={(e)=>confirmOtp(e,ride.id)} className='btn btn-primary btn-md'>Confirm</button>}</p>}
                     {ride.isAccepted===true && ride.isRejected===false && ride.isCompleted===true && 
                     <><p className='fw-bold text-success '>Great job!.. You did it..</p>
                     {ride.isPaymentReceived===false  && (<button className='btn btn-primary btn-md' onClick={()=>handleCashReceived(ride.id)}>Cash Received</button>) }
                     </>}
                    
                    <p>Ride ID: {ride.id}</p>
                    <p>From: {ride.rideFrom}</p>
                    <p>To: {ride.rideTo}</p>
                    <p>Booking Time : {formatTime(ride.createdAt)}</p>
                    
                    {/* <p>Driver: {ride.rideDriver}</p> */}
                    {/* Add more details as needed */}

                    <div className="btns p-2">
                 {ride.isAccepted===false && ride.isRejected===false && ride.isCompleted===false &&  (
                   <>
                    <button className='btn btn-primary btn-md' onClick={()=>handleConfirm(ride.id)}>Accept</button>
                    
                  <button className='btn btn-primary btn-md ml-2' >Reject</button>
                  <Link to='/drivermap'><button className='btn btn-primary btn-md ml-2' >Map</button></Link>
                  </>
                 )}

                {ride.isAccepted===true && ride.isRejected===false && ride.isCompleted===false &&  (
                   <>
                   {showReachedButton && <button className='btn btn-primary btn-md' onClick={()=>handleReached(ride.id)}>Reached</button> }
                   <Link to='/drivermap'><button className='btn btn-primary btn-md ml-2' >Map</button></Link>
                  </>
                 )}
                 </div>
                </div>
                 
            ))}
       
       
      </div>
    </div>
    </div>
    </>
  )
}

export default DriverRides;