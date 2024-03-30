import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../Slices/authSlice';
import { useGoogleLoginMutation, useLoginMutation } from '../../Slices/userApiSlice';
import { toast } from 'react-toastify';
// import { GoogleLogin } from '@react-oauth/google';
import { auth, provider } from "../../Services/config";
import { signInWithPopup } from 'firebase/auth';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [googlelogin, {isError }] = useGoogleLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      if(res.isBlocked === true){
        navigate('/login');
        toast.error("User is blocked");
        return;
      }
      dispatch(setCredentials({...res}));
      navigate('/')
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
      setError(err?.data?.message  || err.message);
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo])

  const handleGoogleSignup = () => {
    signInWithPopup(auth,provider).then((data)=>{
      console.log(data);
      const { displayName, email } = data.user;
      if (displayName && email) {
        submitSignUpWithGoogle(displayName, email);
      }
    }).catch((error) => {
      setError(error.message);
    });
  }

  const submitSignUpWithGoogle = async (displayName, email) => {
    try {
      const value = { displayName, email };
      console.log(value);
      const res = await googlelogin({ displayName, email }).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/')
      toast.success("Signed in successfully");
    } catch (error) {
      setError(error);
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
                <p className='text-center mb-3 mx-1 mx-md-4 fw-bold text-secondary '>Login to continue!</p>

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

                <p className="mb-3 mx-3 text-secondary fw-bold">Don't have an account? <Link to="/register">Signup</Link>.</p>

                <button onClick={handleGoogleSignup} className="btn btn-primary btn-md" >Signup with Google</button>

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

export default Login;