import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEditUserMutation } from '../../Slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../Slices/authSlice';

const EditUserProfile = () => {

    const [ name,setName ] = useState('');
    const [ email,setEmail ] = useState('');
    const [ phonenumber,setPhonenumber ] = useState('');
    const [ location,setLocation ] = useState('');
    const [ profileimage,setProfileimage ] = useState('');

    const { userInfo } = useSelector((state)=>state.auth);
    console.log(userInfo);

    const [editUser, { isLoading: isEditing }] = useEditUserMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setProfileimage(file);
    }

    const handleSubmit = async (e) => {
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
        const phoneRegex = /^[0-9]{10}$/;
        if(phonenumber && !phoneRegex.test(phonenumber)){
            toast.error('Enter valid contact number');
            return;
        }

        const formData = new FormData();
        console.log(name,email,phonenumber,location);
        formData.append('id',userInfo?.id);
        formData.append('name',name);
        formData.append('email',email);
        formData.append('phonenumber',phonenumber);
        formData.append('location',location);
        if(profileimage){
            formData.append('profileimage', profileimage);  
        }
        try {
            const res = await editUser(formData).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Details edited successfully");
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-12 col-lg-9 col-xl-7">
        <div className="card shadow-2-strong card-registration" style={{borderRadius: '15px'}}>
          <div className="card-body p-3 p-md-3">
            <h3 className="mb-2 pb-2 pb-md-0 mb-md-2">Edit Profile</h3>
            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

              <div className="row">
                <div className="col-md-6 mb-4">
{/* 
                <div className="form-outline p-2 mt-2">
                    <input 
                    type="text" 
                    id="id" 
                    defaultValue={userInfo?.id} 
                    hidden/>
                  </div> */}

                  <div className="form-outline p-2 mt-2">
                    <input 
                    type="text" 
                    id="name" 
                    className=" " 
                    placeholder='Name'
                    defaultValue={userInfo?.name} 
                    onChange={(e)=>setName(e.target.value)}
                    required/>
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline p-2 mt-2">
                    <input 
                    type="text" 
                    id="email" 
                    className="" 
                    placeholder='Email' 
                    defaultValue={userInfo?.email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required/>
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline p-2 mt-2">
                    <input 
                    type="text" 
                    id="phonenumber" 
                    className="" 
                    placeholder='Phone Number' 
                    defaultValue={userInfo?.phonenumber}
                    onChange={(e)=>setPhonenumber(e.target.value)}
                    required/>
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline p-2 mt-2">
                    <input 
                    type="text" 
                    id="type" 
                    className="" 
                    placeholder='Location' 
                    defaultValue={userInfo?.location}
                    onChange={(e)=>setLocation(e.target.value)}
                    required/>
                  </div>

                </div>
              </div>

              <div className="row align-items-center p-2 mt-2">
              <div className="col-md-4 p-2 mt-2 ml-2">

                <h6 className="mb-2">Upload Profile Image :-</h6>

              </div>
              <div className="col-md-7 pe-5 ml-2">

                <input 
                className="" 
                accept="image/*" 
                onChange={handleFileChange} 
                name="profileimage" 
                id="profileimage" 
                type="file" 
                />
              </div>
            </div>

              <div className="d-flex justify-content-center mx-4 my-3 mb-lg-4">
                <input className="btn btn-primary btn-md" type="submit" value="Submit" />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default EditUserProfile;