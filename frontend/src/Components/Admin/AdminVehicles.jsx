import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import { useDeleteVehicleMutation, useEditVehicleMutation, useGetVehiclesQuery } from '../../Slices/adminApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminVehicles = () => {

  const [editedVehicleId, setEditedVehicleId] = useState(null);
  const [editedVehicleData, setEditedVehicleData] = useState({});

  const { data:vehicles, isLoading, refetch, error } = useGetVehiclesQuery();
  // console.log(vehicles);

  const vehicleInfo = useSelector((state)=>state.vehicle);
  // console.log(vehicleInfo);

  const [editVehicle, { isLoading: isEditing }] = useEditVehicleMutation();
  const [deleteVehicle, { isLoading: isDeleting }] = useDeleteVehicleMutation();

  const navigate = useNavigate();
  

  const handleEditVehicle = async (vehicleId, updatedVehicleData) => {
    const data = await editVehicle({ id: vehicleId, data: updatedVehicleData }).unwrap();
    console.log(data);
    setEditedVehicleId(null);
    setEditedVehicleData({});
    refetch();
  };

  const handleDeleteUser = (vehicleId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteVehicle(vehicleId).unwrap();
      refetch()
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
    <AdminNavbar />
    <div className="d-flex">
        <form action="" className="d-flex mx-2 my-3 justify-content-center " role="search" >
            <input className="form-control mx-2 border border-2 " type="search" placeholder="Search User" id="search" name="search"/>
            <button className="btn btn-primary btn-md" type="submit">Search</button>
        </form> 
      </div>
      <div>
        <Link to='/addvehicle'>
       <button 
         className="btn btn-primary btn-md ml-2"
       >
         Add
        </button>
        </Link>
      </div>
    <div className="d-flex w-100 ml-2 justify-content-between">
        <h3 className="mb-5 mt-3 mx-2"> All Vehicles</h3>
      </div>

      <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th  scope="col">Vehicleid</th>
              <th  scope="col">Model</th>
              <th scope="col">Type</th>
              <th scope="col">Registration</th>
              <th scope="col">No. of Passgr</th>
              <th scope="col">Location</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
    
          <tbody>
            {vehicles && vehicles.map((vehicle) => {
              return(
              <tr key={vehicle.id}>
              <td> {vehicle?.id} </td>
              <td>  
              {editedVehicleId === vehicle.id ? (
                    <input
                      type="text"
                      value={editedVehicleData?.model || vehicle?.model}
                      onChange={(e) => setEditedVehicleData({ ...editedVehicleData, model: e.target.value })}
                    />
                  ) : (
                    vehicle?.model.toUpperCase()
                  )}
                </td>
              <td>  
              {editedVehicleId === vehicle.id ? (
                    <input
                      type="text"
                      value={editedVehicleData?.type || vehicle?.type}
                      onChange={(e) => setEditedVehicleData({ ...editedVehicleData, type: e.target.value })}
                    />
                  ) : (
                    vehicle?.type.toUpperCase()
                  )}
               
                </td>
              <td>  
              {editedVehicleId === vehicle.id ? (
                    <input
                      type="text"
                      value={editedVehicleData?.registration || vehicle?.registration}
                      onChange={(e) => setEditedVehicleData({ ...editedVehicleData, registration: e.target.value })}
                    />
                  ) : (
                    vehicle?.registration.toUpperCase()
                  )}
                </td>
              <td>  
              {editedVehicleId === vehicle.id ? (
                    <input
                      type="text"
                      value={editedVehicleData?.passengers || vehicle?.passengers}
                      onChange={(e) => setEditedVehicleData({ ...editedVehicleData, passengers: e.target.value })}
                    />
                  ) : (
                    vehicle?.passengers.toUpperCase()
                  )}
                </td>
              <td>  
              {editedVehicleId === vehicle.id ? (
                    <input
                      type="text"
                      value={editedVehicleData?.location || vehicle?.location}
                      onChange={(e) => setEditedVehicleData({ ...editedVehicleData, location: e.target.value })}
                    />
                  ) : (
                    vehicle?.location==='' ? "Location not updated" : vehicle?.location
                  )}
                </td>
              <td>
                      {editedVehicleId === vehicle.id ? (
                    <button
                      className="btn btn-primary btn-md ml-2"
                      onClick={() => handleEditVehicle(vehicle.id, editedVehicleData)}
                      disabled={isEditing}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button 
                      className="btn btn-primary btn-md ml-2"
                      onClick={() => 
                        setEditedVehicleId(vehicle.id)} 
                        disabled={vehicleInfo.id === vehicle.id 
                      
                        }>Edit</button>
                      <button 
                      className="btn btn-primary btn-md ml-2"
                      onClick={() => handleDeleteUser(vehicle.id)} disabled={isDeleting || vehicleInfo.id === vehicle.id}
                      >
                        Delete
                      </button>
                      <Link to={`/vehicleimages/${vehicle.id}`}>
                      <button 
                      className="btn btn-primary btn-md ml-2"
                      >
                        Images
                      </button>
                      </Link>
                      
                    </>
                  )}
                </td>

            </tr>
              )
             })}  
          
          </tbody>
        </table>

    </>
    
  )
}

export default AdminVehicles;