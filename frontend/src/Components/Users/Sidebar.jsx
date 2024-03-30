import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCab, faUser, faWallet, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
			<nav id="sidebar" className="img" style={{height:'100%'}}>
				<div className="p-4">
		  		<h1><a  class="logo">Hey User <span>Travel with us for safe and Comfort Rides!!!</span></a></h1>
	        <ul class="list-unstyled components mb-5">
            <li >
	            <Link><FontAwesomeIcon icon={faBars} className="fa-lg me-3 fa-fw" /></Link>
	          </li>
	          <li >
	            <Link to='/profile'><FontAwesomeIcon icon={faUser} className="fa-lg me-3 fa-fw" /> Info</Link>
	          </li>
	          <li>
              <Link to='/ridedetails'><FontAwesomeIcon icon={faCab} className="fa-lg me-3 fa-fw" /> Rides</Link>
	          </li>
	          <li>
              <Link to='/wallet'><FontAwesomeIcon icon={faWallet} className="fa-lg me-3 fa-fw" /> Wallet</Link>
	          </li>
			  <li>
              <Link to='/review'><FontAwesomeIcon icon={faEye} className="fa-lg me-3 fa-fw" /> Reviews</Link>
	          </li>
	        </ul>

	      </div>
    	</nav>
  )
}

export default Sidebar