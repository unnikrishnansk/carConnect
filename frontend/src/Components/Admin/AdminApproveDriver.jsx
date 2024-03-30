import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useApproveDriverMutation, useDeclineDriverMutation, useGetDriverApprovalMutation, useGetVehiclesQuery } from '../../Slices/adminApiSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setDriverCredentials } from '../../Slices/driverSlice';

const AdminApproveDriver = () => {

    const [ driverdata, setDriverdata] = useState({});
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [isInterviewConducted,setIsInterviewConducted] = useState(false);
    const { data:vehicles, isLoading:gettingVehicles } = useGetVehiclesQuery();
  console.log(vehicles);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(id);

    const [ driverapproval, {isLoading, refetch, error }] = useGetDriverApprovalMutation();
    const [ approved, {isLoading:isApproving }] = useApproveDriverMutation();
    const [ decline, {isLoading:isDeclining}] = useDeclineDriverMutation();
    
    useEffect(() => {
        driverData(id);
    }, [])

    const driverData = async (id) => {
        const res = await driverapproval(id).unwrap();
        setDriverdata(res);
    }

    const handleCheckboxChange = () => {
        setIsInterviewConducted((prevValue) => !prevValue);
      };

    const handleApproveDriver = async (id) => {
        if(!isInterviewConducted){
            toast.error("Specify the Offline Interview result");
            return;
        }
        if (window.confirm('Are you sure you want to approve this driver?')){
          console.log(selectedVehicleId);
          const data = {
            id: id,
            selectedVehicleId: selectedVehicleId,
          };
        const res = await approved({data}).unwrap();
        console.log(res);
        toast.success("Driver Approved");
        dispatch(setDriverCredentials({ ...res }));
        navigate('/admindrivers');
        }else{
            toast.error("Error approving Driver");
        }
    }

    const handleSelectChange = (event) => {
      const selectedId = event.target.value;
      setSelectedVehicleId(selectedId);
    };

    const handleDeclineDriver = async (id) => {
        if(!isInterviewConducted){
            toast.error("Specify the Offline Interview result");
            return;
        }
        if (window.confirm('Are you sure you want to decline this driver?')){
        const res = await decline(id).unwrap();
        console.log(res);
        toast.error("Driver Declined");
        dispatch(setDriverCredentials({ ...res }));
        navigate('/admindrivers');
        }else{
            toast.error("Error approving Driver");
        }
    }

  return (
    <>
    <AdminNavbar />
    <div className="container">
    <div className="main-body">
          
    
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    {driverdata.imageURL==='' ? ( <p>Driver Image not uploaded</p>): (<img src={`http://localhost:5000/${driverdata.imageURL}`} alt="Driver profile" className="rounded-circle" width="150" />)}

                    {driverdata.licenceURL==='' ? ( <p className='m-3'>License Image not uploaded</p>): (<img src={`http://localhost:5000/${driverdata.licenceURL}`} alt="Driver license" className="m-3" width="150" />)}
                  </div>
                </div>
              </div>
              
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Driver ID</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {driverdata?.id}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {driverdata?.name}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {driverdata?.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {driverdata?.phonenumber}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Location</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {driverdata?.location==='' ? ("Location not updated") : (driverdata?.location)}
                    </div>
                  </div>
                  <hr/>
                  <div className='row'>
                    <form>
                  <label>Assign car to Driver : </label>
                    <select 
                    name="cars" 
                    id="cars"
                    onChange={handleSelectChange}
                    value={selectedVehicleId}
                    >
                      {vehicles && vehicles.map((vehicle)=>(
                        <option key={vehicle.id} value={vehicle.id}>{vehicle.id},{vehicle.model.toUpperCase()},{vehicle.registration.toUpperCase()},{vehicle.location.toUpperCase()}</option>
                      ))}
                    </select>
                    </form>
                  </div>
                    <hr />
                  <div className="row">
                    {/* <form onSubmit={handleSubmit}> */}
                    <div className="col-sm-12">
                        <p className='fw-bold '>Verify all the documents with the originals before approving.</p>
                        <input type="checkbox" id='inetview' name='interview' value='interview' checked={isInterviewConducted} onChange={handleCheckboxChange}/><label className='ml-2'>Whether Offline Interview conducted</label>
                        <hr />
                      <button onClick={()=>handleApproveDriver(driverdata.id)} className="btn btn-primary btn-md">Approve</button>
                      <button onClick={()=>handleDeclineDriver(driverdata.id)} className="btn btn-primary btn-md ml-3">Decline</button>
                    </div>
                    {/* </form> */}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
    </div>
    </>
  )
}

export default AdminApproveDriver;