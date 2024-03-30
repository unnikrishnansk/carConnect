import React, { useEffect } from 'react'
import DriverNavbar from './DriverNavbar';
import DriverSidebar from './DriverSidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDriverprofileQuery } from '../../Slices/driverApiSlice';

const DriverProfile = () => {

  const { DriverInfo } = useSelector((state)=>state.driver);

  const { data: driverdata, refetch, error, isLoading } = useDriverprofileQuery();
  console.log(driverdata);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
    <DriverNavbar />
    <div className='d-flex align-items-stretch'>
    <DriverSidebar />
    
    
    <section style={{backgroundColor: '#eee', width:'100%'}}>
  <div className="container py-3">

    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4 border" >
          <div className="card-body text-center">
            <img src={driverdata?.imageURL==='' ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" :  `http://localhost:5000/${driverdata?.imageURL}`} alt="avatar"
              className="rounded-circle img-fluid" style={{width: '150px'}} />
               {driverdata?.licenseURL==='' ? (<p>License Image not uploaded</p>) :  (<img src={`http://localhost:5000/${driverdata?.licenseURL}`} alt="avatar"
              className=" img-fluid ml-2 mt-2" style={{width: '150px'}} />)}
            <h5 className="my-3">{driverdata?.name}</h5>
            <p className="text-muted mb-4">{driverdata?.location==='' ? "Please update the Location" : driverdata?.location}</p>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card mb-6">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-5">
                <p className="mb-0" style={{fontSize:'14px'}}>Full Name</p>
              </div>
              <div className="col-sm-7">
                <p className="text-muted mb-0" style={{fontSize:'14px'}}>{driverdata?.name}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <p className="mb-0" style={{fontSize:'14px'}}>Email</p>
              </div>
              <div className="col-sm-7">
                <p className="text-muted mb-0" style={{fontSize:'14px'}}>{driverdata?.email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <p className="mb-0">Mobile</p>
              </div>
              <div className="col-sm-7">
                <p className="text-muted mb-0">{driverdata?.phonenumber}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <p className="mb-0">Approval</p>
              </div>
              <div className="col-sm-7">
                {driverdata?.isDeclined===true ? (<p className='text-danger fw-bold '>Your application was declined , Better luck next time</p>) : (<p className="text-muted mb-0">{driverdata?.isApproved===false? 'Not yet approved' : 'Approved'}</p>)}
                
              </div>
            </div>
          </div>
          {
          driverdata?.isDeclined===true ? (
            <Link >
            <button disabled className="btn btn-danger btn-md">Edit</button>
            </Link>
          ):(
            <Link to='/drivereditprofile'>
            <button className="btn btn-primary btn-md">Edit</button>
            </Link>
          )
        }
        </div>
       
        
      </div>
    </div>
  </div>
</section>


    </div>
    </>
    
  )
}

export default DriverProfile;