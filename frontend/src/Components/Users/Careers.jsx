import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Careers = () => {
  return (
    <>
    <Navbar />

<div className="container w-100">
            <div className="row w-100">
                 <div className="col-lg-12  mb-4 p-4  d-flex">
                 <div>
                <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_558/v1656511866/assets/67/3b671f-4ccd-484a-ad97-cded31823ed0/original/illustration-safety-01-1.png" alt="driver" />
                </div>
                    <div className="section-title text-center p-5">
                        <h3 className="top-c-sep fw-bold ">Grow your career with us</h3>
                        <p className='text-dark'>As a valued member of our team, you'll play a crucial role in ensuring the seamless transportation of goods and materials, contributing to the heartbeat of our economy.</p>
                    </div>
                </div>
            </div>

            <div className="row w-100">
                 <div className="col-lg-12 mx-auto mb-4 p-4">
                    <div className="section-title text-center ">
                        <h3 className="top-c-sep fw-bold p-4">Why drive with us</h3>
                    </div>
                    <div className='d-flex p-4'>
                        <div>
                        <h3 className="top-c-sep fw-medium p-3">Set your own time</h3>
                        <p className='text-dark p-3'>You decide when and how often you drive.</p>   
                        </div>
                        <div>
                        <h3 className="top-c-sep fw-medium p-3">Get paid fast</h3>
                        <p className='text-dark p-3'>Weekly payments in to your bank account.</p>
                        </div>
                        <div>
                        <h3 className="top-c-sep fw-medium p-3">Get support at every turn</h3>
                        <p className='text-dark p-3'>If there's anything you can reach to us at anytime.</p>
                        </div>
                </div>
                </div>
            </div>

            <div className="row w-100 border border-2 ">
                 <div className="col-lg-12 mx-auto mb-4 p-4">
                    <div className="section-title text-center ">
                        <h3 className="top-c-sep fw-bold p-4">What you need to do</h3>
                    </div>
                    <div className='d-flex justify-content-center  p-4'>
                        <div className='border border-2 m-3'>
                        <h3 className="top-c-sep fw-medium p-3">Requirements</h3>
                        <ul>
                            <li className='text-dark p-3'>Be atleast 18 years of age.</li>
                        </ul>
                        </div>
                        <div className='border border-2 m-3'>
                        <h3 className="top-c-sep fw-medium p-3">Documents</h3>
                        <ul>
                            <li className='text-dark p-3'>Valid driver's license.</li>
                        </ul>
                        </div>
                        <div className='border border-2 m-3'>
                        <h3 className="top-c-sep fw-medium p-3">Signup Process</h3>
                        <ul>
                            <li className='text-dark pt-3'>Click the below button.</li>
                            <li className='text-dark'>Signup using basic details.</li>
                            <li className='text-dark'>Add license details in profile section.</li>
                            
                              <Link to='/driversignup'><button className='btn btn-primary btn-md m-2'>Apply now</button></Link>  
                            
                        </ul>
                        </div>
                </div>
                </div>
            </div>

        </div>

        <Footer />
        </>
  )
}

export default Careers