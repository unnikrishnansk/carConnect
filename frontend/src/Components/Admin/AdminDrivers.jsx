import React, { useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import { useGetDriversQuery } from '../../Slices/adminApiSlice';
import { Link } from 'react-router-dom';

const AdminDrivers = () => {

  const { data:drivers, isLoading, refetch, error } = useGetDriversQuery();
  console.log(drivers);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
    <AdminNavbar />
    <div className="d-flex">
        <form action="" className="d-flex mx-2 my-3 justify-content-center " role="search" >
            <input class="form-control mx-2 border border-2 " type="search" placeholder="Search User" id="search" name="search"/>
            <button class="btn btn-primary btn-md" type="submit">Search</button>
        </form> 
      </div>
    <div className="d-flex w-100 ml-2 justify-content-between">
        <h3 className="mb-2 mt-3 mx-2"> All Drivers</h3>
      </div>

      <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th  scope="col">Driverid</th>
              <th  scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Approval</th>
              <th scope="col">Location</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
    
          <tbody>
          
          {drivers && drivers.map((driver) => {
    return (
      <>
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name.toUpperCase()}</td>
              <td>{driver.email}</td>
              <td>{driver.phonenumber}</td>
              <td>{driver.isApproved===false ? "Not Approved" : "Approved"}</td>
              <td>{driver.location === '' ? "Location not updated" : driver.location}</td>
              <td>
                {driver.isDeclined===true ? (<button className='text-dark' disabled>Driver Declined</button>) : (
                  <>
              {driver.isApproved === false ? (
                 <Link to={`/approvedriver/${driver.id}`}><button className="btn btn-primary btn-md">Approve</button></Link>
              ) : driver.isApproved === true && driver.isBlock === true ? (
                <a href={`/admin/block?name=${driver.name}`} className="btn btn-primary btn-md">Unblock</a>
              ) : (
                <a href={`/admin/block?name=${driver.name}`} className="btn btn-primary btn-md">Block</a>
              )}
              </>
              )}
              </td>
            </tr>
            </>
    );
  })}  
          
          </tbody>
        </table>
    </>
    
  )
}

export default AdminDrivers;