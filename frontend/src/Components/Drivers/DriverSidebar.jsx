import React, { useState, useEffect } from 'react';
import './DriverSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCab, faCar, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const DriverSidebar = () => {

	const [ chat,setChat] = useState(false);
	const { driverInfo } = useSelector((state)=>state.driver);
	// console.log(driverInfo);

	const socket = io('http://localhost:5000');

	useEffect(() => {
        socket.on('chat-message', (payload) => {
            console.log("payload", payload)
            setChat(true);
        });
    });

  return (
			<nav id="sidebar" className="img" style={{height:'100%'}}>
				<div className="p-4">
		  		<h1><a  class="logo">Hey Driver <span>Drive safe as Safety of passengers is in your hands !!!</span></a></h1>
	        <ul class="list-unstyled components mb-5">
            <li >
	            <Link><FontAwesomeIcon icon={faBars} className="fa-lg me-3 fa-fw" /></Link>
	          </li>
	          <li >
	            <Link to='/driverprofile'><FontAwesomeIcon icon={faUser} className="fa-lg me-3 fa-fw" /> Info</Link>
	          </li>
			  {driverInfo && driverInfo.isApproved===true ? (
				<>
			  <li>
              <Link to='/drivervehicle'><FontAwesomeIcon icon={faCab} className="fa-lg me-3 fa-fw" /> Vehicle Info</Link>
	          </li>
	          <li>
              <Link to='/driverrides'><FontAwesomeIcon icon={faCar} className="fa-lg me-3 fa-fw" /> Rides</Link>
	          </li>
			  <li>
              <Link to='/driverchat'><FontAwesomeIcon icon={faPen} className="fa-lg me-3 fa-fw" /> Chats
			  {chat && <span className="notification-dot m-2 text-danger">1</span>}
			  </Link>
	          </li>
			  </>
			  ) : (
				<li></li>
			  )}
	          
	        </ul>

	      </div>
    	</nav>
  )
}

export default DriverSidebar;