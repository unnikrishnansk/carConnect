import React, { useState, useEffect } from 'react'
import DriverNavbar from './DriverNavbar';
import DriverSidebar from './DriverSidebar';
import { useSelector } from 'react-redux';
import { useDriverVehicleMutation } from '../../Slices/driverApiSlice';

const DriverVehicle = () => {

    const [vehicle,setVehicle] = useState(null);
    // const [updateFlag, setUpdateFlag] = useState(false);

    const { driverInfo } = useSelector((state)=>state.driver);
	console.log(vehicle);

    const [ drivervehicledata, { refetch, error, isLoading }] = useDriverVehicleMutation();
//   console.log(drivervehicledata);


    useEffect(() => {
    const getData = async (id) => {
        const res = await drivervehicledata(id).unwrap();
        setVehicle(res);
        // refetch();
        // setUpdateFlag(prev => !prev);
        console.log(res);
    }

    if(driverInfo?.id){
        getData(driverInfo?.id);
    }
   
    }, [driverInfo?.id]);

    const handleRefetch = () => {
        // Call the refetch function to fetch the data again
        refetch();
    };
    
  return (
    <>
    <DriverNavbar />
    <div className='d-flex align-items-stretch'>
    <DriverSidebar />

    <div class="card" >
    {isLoading && <p>Loading vehicle data...</p>}
    {error && <p>Error fetching vehicle data: {error}</p>}
    { vehicle && vehicle!==null && <><img class="card-img-top" src={`http://localhost:5000/${vehicle?.vehicleURL[0]}`} alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">{vehicle?.model}</h5>
    <p class="card-text">vehicle type: {vehicle?.type}</p>
    <p class="card-text">registration: {vehicle?.registration}</p>
    <p class="card-text">passengers: {vehicle?.passengers}</p>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
    
  </div>
  </>

    }
  
</div>
    </div>
    </>
  )
}

export default DriverVehicle;