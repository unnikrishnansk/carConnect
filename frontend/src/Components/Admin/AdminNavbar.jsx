import React from 'react';
import './AdminNavbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faIdCard, faCarSide, faRectangleAd, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAdminlogoutMutation } from '../../Slices/adminApiSlice';
import { useDispatch } from 'react-redux';
import { clearAdminCredentials } from '../../Slices/adminSlice';

const AdminNavbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApiCall ] = useAdminlogoutMutation();

  async function logoutHandler(e) {
    e.preventDefault();
    try {
        await logoutApiCall().unwrap();
        dispatch(clearAdminCredentials());
        navigate('/adminlogin')
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
    <Link to='/adminhome' className='text-decoration-none '><p className="h5 m-2 fst-italic text-dark">CarConnect</p></Link>
    </div>

      {/* <!-- Left links --> */}

      <div className='ml-5 w-50'>
      <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
        <div className='d-flex w-100 justify-content-between '>
        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to='/adminusers' className="nav-link active" aria-current="page">
            <div>
            <FontAwesomeIcon icon={faUser} className="fa-lg me-3 fa-fw" />
            </div>
            Users
            </Link>
        </li>
        </div>

        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to='/admindrivers' className="nav-link active" aria-current="page">
            <div>
            <FontAwesomeIcon icon={faIdCard} className="fa-lg me-3 fa-fw" />
            </div>
            Drivers
            </Link>
        </li>
        </div>

        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to='/adminvehicles' className="nav-link active" aria-current="page">
            <div>
            <FontAwesomeIcon icon={faCar} className="fa-lg me-3 fa-fw" />
            </div>
            Vehicles
            </Link>
        </li>
        </div>

        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to='/adminrides' className="nav-link active" aria-current="page" href="#!">
            <div>
            <FontAwesomeIcon icon={faCarSide} className="fa-lg me-3 fa-fw" />
            </div>
            Rides
          </Link>
        </li>
        </div>

        {/* <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <a className="nav-link active" aria-current="page" href="#!">
            <div>
            <FontAwesomeIcon icon={faRectangleAd} className="fa-lg me-3 fa-fw" />
            </div>
            Banners
          </a>
        </li>
        </div> */}

        </div>
      </ul>
      </div>
      {/* <!-- Left links --> */}

      {/* <!-- Right links --> */}
      <div>
      <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
        <li className="nav-item text-center mx-2 mx-lg-1">
            <div>
              <i className="fas fa-bell fa-lg mb-1"></i>
            </div>
            <a href="#" className='text-dark' onClick={logoutHandler}>Logout</a>
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

export default AdminNavbar