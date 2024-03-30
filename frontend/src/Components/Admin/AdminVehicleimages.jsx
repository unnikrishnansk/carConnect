import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useGetVehicleImageMutation } from '../../Slices/adminApiSlice';

const AdminVehicleimages = () => {

    const [vehicleimages, setVehicleimages] = useState([]);

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        // Fetch vehicle data based on the id
        // You may want to use your API or state management library here
        // For now, let's assume you have a function to fetch the data
        const fetchVehicleImages = async () => {
            try {
                const response = await fetch(`/api/admin/vehicleimages/${id}`);
                const data = await response.json();
                console.log(data);
                setVehicleimages(data);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchVehicleImages();
    }, [id]);
    
    console.log(vehicleimages);
  return (
    <>
    <div className='h-75 w-100 m-4  '>
        {vehicleimages.map((imageUrl, index) => {
            // console.log(`Image URL ${index + 1}: http://localhost:5000${imageUrl}`);
           return  <img className='m-3' key={index} src={`http://localhost:5000${imageUrl}`} alt={`Vehicle Image ${index + 1}`} />;
        })}
    </div>
    {/* {avatar?.length > 1 && <img src={avatar} alt='vehicleimage'/>} */}
    </>
    
  )
}

export default AdminVehicleimages;