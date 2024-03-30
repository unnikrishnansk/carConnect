import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCar, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../Slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../../Slices/authSlice.js';
import { clearPlaceCredentials } from '../../Slices/placeSlice.js';
import { clearVehicleCredentials } from '../../Slices/SelectedVehicle.js';
import { clearRideCredentials } from '../../Slices/rideSlice.js';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state)=>state.auth);

    const [logoutApiCall, {refetch}] = useLogoutMutation();

  async function logoutHandler(e) {
    e.preventDefault();
    try {
        await logoutApiCall().unwrap();
        dispatch(clearCredentials());
        dispatch(clearPlaceCredentials());
        dispatch(clearVehicleCredentials());
        dispatch(clearRideCredentials());
        
        refetch();
        navigate('/')
    } catch (errror) {
        console.error(errror);
    }
}

  return (
    <div>
        {/* <!-- Navbar --> */}
<nav className="navbar navbar-expand-lg navbar-dark gradient-custom">
  {/* <!-- Container wrapper --> */}
  <div className="container-fluid justify-content-between">
    {/* <!-- Navbar brand --> */}
    <div className=''>
    <Link to='/' className='text-decoration-none '><p className="h5 m-2 fst-italic text-dark fw-bold ">CarConnect</p></Link>
    </div>

      {/* <!-- Left links --> */}

      <div className='ml-5 w-50'>
      <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
        <div className='d-flex w-100 justify-content-between '>
        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link  to='/' className="nav-link active" aria-current="page">
            <div>
            <FontAwesomeIcon icon={faHome} className="fa-lg me-3 fa-fw" />
            </div>
            Home
            </Link>
        </li>
        </div>

        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to='/profile' className="nav-link active" aria-current="page">
            <div>
            <FontAwesomeIcon icon={faUser} className="fa-lg me-3 fa-fw" />
            </div>
            Profile
            </Link>
        </li>
        </div>

        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to='/careers' className="nav-link active" aria-current="page">
            <div>
            <FontAwesomeIcon icon={faCar} className="fa-lg me-3 fa-fw" />
            </div>
            Careers
          </Link>
        </li>
        </div>

        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
           <Link to='/aboutus' className="nav-link active" aria-current="page"> 
            <div>
            <FontAwesomeIcon icon={faAddressBook} className="fa-lg me-3 fa-fw" />
            </div>
            About
            </Link>
        </li>
        </div>
        </div>
      </ul>
      </div>
      {/* <!-- Left links --> */}

      {/* <!-- Right links --> */}
      <div>
      <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
        <li className="nav-item text-center mx-2 mx-lg-1">
      
            <div>
              {userInfo ? (
                <a href="#" className='text-black-50 fw-bold' onClick={logoutHandler}>Logout</a>
              ) : (
                <Link to='/login' className='text-black-50 fw-bold'>Login</Link>
              )}
            </div>
            
         
        </li>
        {/* <li className="nav-item text-center mx-2 mx-lg-1">
          <a className="nav-link" href="#!">
            <div>
              <i className="fas fa-globe-americas fa-lg mb-1"></i>
            </div>
            News
          </a>
        </li> */}
      </ul>
      </div>
      {/* <!-- Right links --> */}
  </div>
  {/* <!-- Container wrapper --> */}
</nav>
{/* <!-- Navbar --> */}
    </div>
  )
}

export default Navbar;