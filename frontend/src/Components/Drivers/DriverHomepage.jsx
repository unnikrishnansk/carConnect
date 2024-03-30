import React from 'react'
import DriverNavbar from './DriverNavbar'
import DriverSidebar from './DriverSidebar'
import DriverFooter from './DriverFooter'

const DriverHomepage = () => {
  return (
    <>
    <DriverNavbar />
    
                    <img className="w-100" src="https://gloriadriverschool.ro/img/carousel-2.jpg" alt="Image"/>
                    

                <div class="container-fluid facts py-5 pt-lg-0 m-3">
        <div class="container py-5 pt-lg-0">
            <div class="row gx-0">
                <div class="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                    <div class="bg-white shadow d-flex align-items-center h-100 p-4" >
                        <div class="d-flex">
                            <div class="flex-shrink-0 btn-lg-square bg-primary">
                                <i class="fa fa-car text-white"></i>
                            </div>
                            <div class="ps-4">
                                <h5>Easy Rides</h5>
                                <span>Get rides.. You just want to submit documents and start the journey with us</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                    <div class="bg-white shadow d-flex align-items-center h-100 p-4" >
                        <div class="d-flex">
                            <div class="flex-shrink-0 btn-lg-square bg-primary">
                                <i class="fa fa-users text-white"></i>
                            </div>
                            <div class="ps-4">
                                <h5>Make it a Passion</h5>
                                <span>Driving is like a passion.. Follow it.. Earn through it..</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                    <div class="bg-white shadow d-flex align-items-center h-100 p-4" >
                        <div class="d-flex">
                            <div class="flex-shrink-0 btn-lg-square bg-primary">
                                <i class="fa fa-file-alt text-white"></i>
                            </div>
                            <div class="ps-4">
                                <h5>Earnings</h5>
                                <span>High earnings according to your rides.. Take rides.. To Earnings..</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-xxl py-6">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="position-relative overflow-hidden ps-5 pt-5 h-100" >
                        <img class=" w-100 h-100" src="https://driven2drive.com/wp-content/uploads/2023/09/spencer-davis-hi1Iq4x_ldM-unsplash-edited-1024x768.jpg" alt="" />
                    </div>
                </div>
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="h-100">
                        <h6 class="text-primary text-uppercase mb-2">Who we need</h6>
                        <h1 class="display-6 mb-4">We need Dedicated Drivers who put their soul into work and create a passion for it</h1>
                        <p>If you are sure you can put up rides and take people from one place to another with utmost safety, we are with you.. Come join our family. Here we would like to create a riders family with us.</p>
                        <p class="mb-4">We provide safety for women and children throughout the ride. Be polite to them and make them comfortable.We will together buld a service where women and children are never afraid of entering into at any time.</p>
                        {/* <div class="row g-2 mb-4 pb-2"> */}
                            {/* <div class="col-sm-6">
                                <i class="fa fa-check text-primary me-2"></i>Fully Licensed
                            </div> */}
                            {/* <div class="col-sm-6">
                                <i class="fa fa-check text-primary me-2"></i>Online Tracking
                            </div> */}
                            {/* <div class="col-sm-6">
                                <i class="fa fa-check text-primary me-2"></i>Afordable Fee 
                            </div> */}
                            {/* <div class="col-sm-6">
                                <i class="fa fa-check text-primary me-2"></i>Best Trainers
                            </div> */}
                        {/* </div> */}
                        {/* <div class="row g-4"> */}
                            {/* <div class="col-sm-6">
                                <a class="btn btn-primary py-3 px-5" href="">Read More</a>
                            </div> */}
                            {/* <div class="col-sm-6">
                                <a class="d-inline-flex align-items-center btn btn-outline-primary border-2 p-2" href="tel:+0123456789">
                                    <span class="flex-shrink-0 btn-square bg-primary">
                                        <i class="fa fa-phone-alt text-white"></i>
                                    </span>
                                    <span class="px-3">+012 345 6789</span>
                                </a>
                            </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <DriverFooter />
    </>
    
  )
}

export default DriverHomepage