import React, { useState, useEffect } from 'react';
import './DriverOtp.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const DriverOtp = () => {

    const [otpDigits, setOtpDigits] = useState("");
    const [minutes,setMinutes] = useState(1);
    const [seconds,setSeconds] = useState(29);

    useEffect(() => {

        const interval = setInterval(()=>{
            if(seconds>0){
                setSeconds(seconds-1)
            }
            if(seconds===0){
                if(minutes===0){
                    clearInterval(interval);
                }else{
                    setSeconds(59);
                    setMinutes(minutes-1)
                }
            }
        },1000)

        return()=>{
            clearInterval(interval);
        }

    }, [seconds])
   

    const { driverInfo } = useSelector((state)=>state.driver);
    console.log(driverInfo);

    const navigate = useNavigate();

    const resendOtp = () => {
        setMinutes(1);
        setSeconds(59);
    }

    const handleVerify = async () => {
        
        console.log(otpDigits);
        if(otpDigits === driverInfo.otp){
            toast.success("OTP verified")
            navigate('/driverhome')
        }else{
            toast.error("OTP doesnot match");
            return;
        }
        
    };

  return (
    <>
    <div className="container p-5">
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-5 mt-5">
                <div className="bg-white p-5 rounded-3 shadow-sm border">
                    <div>
                        <p className="text-center text-success" style={{fontSize: '5.5rem'}}><i className="fa-solid fa-envelope-circle-check"></i></p>
                        <p className="text-center text-center h5 ">Please check your email</p>
                        <p className="text-muted text-center">We've sent a code to {driverInfo.email}</p>
                        <div className="row pt-4 pb-2">
                      
                            <div  className="col-3">
                                <input
                                    className="otp-letter-input "
                                    type="text"
                                    value={otpDigits}
                                    onChange={(e) => setOtpDigits(e.target.value)}
                                />
                            </div>
         
                        </div>
                        <p className="text-muted text-center">Didn't get the code? 
                        <button
                        onClick={resendOtp}
                        disabled={seconds>0 || minutes>0}
                        className="text-success border-0 "
                        >
                            Click to resend.
                        </button></p>

                           <div className='countdown-text'>
                                Time Remaining : {""}
                                <span style={{fontWeight:600}}>
                                    {minutes < 10 ? `0${minutes}` : minutes }:
                                    {seconds < 10 ? `0${seconds}` : seconds }
                                </span>
                            </div> 

                        <div className="row pt-5">
                
                            <div className="col-6">
                                <button className="btn btn-success w-100" onClick={handleVerify}>Verify</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}


export default DriverOtp;