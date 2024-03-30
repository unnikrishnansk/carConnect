import React, { useEffect } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProfileQuery } from '../../Slices/userApiSlice';

const Profile = () => {

  const { userInfo } = useSelector((state)=>state.auth);

  const { data: profiledata, refetch, error, isLoading } = useProfileQuery();
  console.log(profiledata);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
    <Navbar />
    <div className='d-flex align-items-stretch'>
    <Sidebar />
    
    
    <section style={{backgroundColor: '#eee', width:'100%'}}>
  <div className="container py-3">

    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4 border" >
          <div className="card-body text-center">
            <img src={profiledata?.imageURL==='' ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" : `http://localhost:5000/${profiledata?.imageURL}`} alt="avatar"
              className="rounded-circle img-fluid" style={{width: '150px'}} />
            <h5 className="my-3">{profiledata?.name}</h5>
            <p className="text-muted mb-4">{profiledata?.location==='' ? "Please update the Location" : profiledata?.location}</p>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-5">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-7">
                <p className="text-muted mb-0">{profiledata?.name}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-7">
                <p className="text-muted mb-0">{profiledata?.email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <p className="mb-0">Mobile</p>
              </div>
              <div className="col-sm-7">
                <p className="text-muted mb-0">{profiledata?.phonenumber}</p>
              </div>
            </div>
            <hr />
          </div>
          <Link to='/edituserprofile'>
        <button className="btn btn-primary btn-lg">Edit</button>
        </Link>
        </div>
        
      </div>
    </div>
  </div>
</section>

    </div>
    </>
    
  )
}

export default Profile;