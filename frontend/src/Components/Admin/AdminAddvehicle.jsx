import React, { useState, useEffect } from 'react';
import './AdminAddvehicle.css';
import { useAddVehicleMutation } from '../../Slices/adminApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setVehicleCredentials } from '../../Slices/vehicleSlice';

const AdminAddvehicle = () => {

    const [model,setModel] = useState('');
    const [type,setType] = useState('');
    const [registration,setRegistration] = useState('');
    const [passengers,setPassengers] = useState('');
    const [location,setLocation] = useState('');
    const [vehicleImage,setVehicleImage] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [addVehicle, {isLoading}] = useAddVehicleMutation();

    const handleFileChange = (e) => {
        const files = e.target.files
        setVehicleImage(files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(model,type,registration,location,passengers,vehicleImage);
        formData.append('model',model);
        formData.append('type',type);
        formData.append('registration',registration);
        formData.append('location',location);
        formData.append('noPassenger',passengers);
        if(vehicleImage){
            for (let i = 0; i < vehicleImage.length; i++) {
                formData.append('vehicleImages', vehicleImage[i]);
              }
        }
        try {
            const res = await addVehicle(formData).unwrap();
            dispatch(setVehicleCredentials({ ...res }));
            toast.success("Vehicle added successfully");
            navigate('/adminvehicles');
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
            <h3 className="mb-2 pb-2 pb-md-0 mb-md-2">Add Vehicle</h3>
            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

              <div className="row">
                <div className="col-md-6 mb-4">

                  <div className="form-outline p-2 mt-2">
                    <input 
                    type="text" 
                    id="model" 
                    className=" " 
                    placeholder='Vehicle Model' 
                    onChange={(e)=>setModel(e.target.value)}
                    required/>
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline p-2 mt-2">
                    <input 
                    type="text" 
                    id="type" 
                    className="" 
                    placeholder='Vehicle Type' 
                    onChange={(e)=>setType(e.target.value)}
                    required/>
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline p-2 mt-2">
                    <input 
                    type="text" 
                    id="type" 
                    className="" 
                    placeholder='Registration Number' 
                    onChange={(e)=>setRegistration(e.target.value)}
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
                    onChange={(e)=>setLocation(e.target.value)}
                    required/>
                  </div>

                </div>
              </div>

              <div className="row align-items-center p-2 mt-2">
              <div className="col-md-4 p-2 mt-2 ml-2">

                <h6 className="mb-2">Vehicle Images :-</h6>

              </div>
              <div className="col-md-7 pe-5 ml-2">

                <input 
                className="" 
                accept="image/*" 
                onChange={handleFileChange} 
                name="vehiclemages" 
                id="vehiclemages" 
                type="file" 
                multiple/>
              </div>
            </div>


              <div className="row">
                <div className="col-12 ml-2">

                <label>Number of Passengers :-   </label>
                  <select 
                  className="" 
                  onChange={(e)=>setPassengers(e.target.value)}
                  required> 
                  <option value="1" disabled >Number of Passengers</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>

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

export default AdminAddvehicle;