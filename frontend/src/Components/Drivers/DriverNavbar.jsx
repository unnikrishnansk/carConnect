import React from 'react';
import './DriverNavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHome, faInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDriverlogoutMutation } from '../../Slices/driverApiSlice';
import { clearDriverCredentials } from '../../Slices/driverSlice';
import { useDispatch, useSelector } from 'react-redux';

const DriverNavbar = () => {

  const [ logoutApiCall ] = useDriverlogoutMutation();

  const { driverInfo } = useSelector((state)=>state.driver);
  // console.log(driverInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutHandler(e) {
    e.preventDefault();
    try {
        await logoutApiCall().unwrap();
        dispatch(clearDriverCredentials());
        navigate('/driverhome')
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
    <Link to='/driverhome' className='text-decoration-none '><p className="h5 m-2 fst-italic text-dark">CarConnect</p></Link>
    </div>

      {/* <!-- Left links --> */}

      <div className='ml-5 w-50'>
      <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
        <div className='d-flex w-100 justify-content-between '>
        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to='/driverhome' className="nav-link active" aria-current="page" >
            <div>
            <FontAwesomeIcon icon={faHome} className="fa-lg me-3 fa-fw" />
            </div>
            Home
          </Link>
        </li>
        </div>

        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
        <Link to='/driverprofile' className="nav-link active" aria-current="page">
            <div>
            <FontAwesomeIcon icon={faUser} className="fa-lg me-3 fa-fw" />
            </div>
            Profile
            </Link>
        </li>
        </div>

        <div>
        <li className="nav-item text-center mx-2 mx-lg-1">
          <a className="nav-link active" aria-current="page" href="#!">
            <div>
            <FontAwesomeIcon icon={faAddressBook} className="fa-lg me-3 fa-fw" />
            </div>
            Contact
          </a>
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
              {driverInfo ? (
                <a href="#" className='text-black-50 fw-bold' onClick={logoutHandler}>Logout</a>
                 
              ) : (
                <Link to='/driverlogin' className='text-black-50 fw-bold' >Login</Link>
              ) }
           
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

export default DriverNavbar