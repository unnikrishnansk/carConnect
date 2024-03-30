import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faKey, faMobile } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../Slices/userApiSlice';
import { setCredentials } from '../../Slices/authSlice';
// import { auth, provider } from "../../Services/config";
// import { signInWithPopup } from 'firebase/auth';

const Signup = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phonenumber,setPhonenumber] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmpassword] = useState('');
    const [error, setError] = useState('');
    // const [ value,setValue ] = useState(''); 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    // useEffect(() => {
    //   if (userInfo) {
    //     navigate(`/userotp/${userInfo.id}`);
    //   }
    // }, [navigate, userInfo])

  async function handleSubmit(e) {
    e.preventDefault();

    if( name && name.length<3){
      toast.error("Name should have minimum 3 characters");
      return;
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(email && !emailRegex.test(email)){
      toast.error('Enter correct Email')
      return;
    }
    if(password !== confirmpassword){
      toast.error('Password does not match')
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if(phonenumber && !phoneRegex.test(phonenumber)){
      toast.error('Enter valid contact number');
      return;
    }

    
    try {
      const res = await register({ name, email, phonenumber, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.log(res);
      navigate(`/userotp/${res.id}`)
    } catch (err) {
      setError(err?.data?.message || err.message);
    }
  }

  // const handleGoogleSignup = () => {
  //   signInWithPopup(auth,provider).then((data)=>{
  //   setValue(data.user.email);
  //   localStorage.setItem("email" , data.user.email);
  //   })
  // }

  // useEffect(() => {
  //   setValue(localStorage.getItem('email'));
  // }, [])

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
                <p className='text-center mb-3 mx-1 mx-md-4 fw-bold text-secondary '>SignUp and experience Safe and Comfort Ride!</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faUser} className="fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="name" name='name' placeholder='Name'  onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} className="fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="email" name='email' placeholder='Email'  onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faMobile} className="fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="number" id="phonenumber" name='phonenumber' placeholder='Mobile'  onChange={(e)=>setPhonenumber(e.target.value)} required/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faLock} className="fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="password" name='password' placeholder='Password'  onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faKey} className="fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="confirmpassword" name='confirmpassword' onChange={(e)=>setConfirmpassword(e.target.value)} placeholder='Re-Enter Password' required/>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>{isLoading ? 'Loading...' : 'SignUp'}</button>
                  </div>

                </form>

                {/* <button onClick={handleGoogleSignup} className="btn btn-primary btn-md" >Signup with Google</button> */}

                <p className="mb-3 mx-3 text-secondary fw-bold">Already registered? <Link to="/login">Login</Link>.</p>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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

export default Signup;