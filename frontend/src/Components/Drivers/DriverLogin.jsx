import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDriverloginMutation } from '../../Slices/driverApiSlice';
import { setDriverCredentials } from '../../Slices/driverSlice';
import { toast } from 'react-toastify';

const DriverLogin = () => {

  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [driverlogin, { isLoading }] = useDriverloginMutation();

  const { driverInfo } = useSelector((state)=>state.driver);

  useEffect(() => {
    if (driverInfo) {
      navigate('/driverhome');
    }
  }, [navigate, driverInfo])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await driverlogin({ email, password }).unwrap();
      dispatch(setDriverCredentials({...res}));
      toast.success("Logged In successfully")
      navigate('/driverhome')
    } catch (err) {
      toast.error(err?.data?.message || err.message);
      setError(err?.data?.message  || err.message);
    }
  }

  return (
    <section className="vh-100" style={{backgroundColor: '#eee'}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: '25px'}}>
          <div className="card-body p-md-3">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 mb-2 mx-1 mx-md-4 mt-4 fst-italic ">CarConnect</p>
                <p className='text-center mb-3 mx-1 mx-md-4 fw-bold text-secondary '>Driver to Login!</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="email" name='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faLock} className="fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="password" name='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
                  </div>

                </form>

                <p className="mb-3 mx-3 text-secondary fw-bold">First to Drive? <Link to="/driversignup">Driver Signup</Link>.</p>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default DriverLogin;