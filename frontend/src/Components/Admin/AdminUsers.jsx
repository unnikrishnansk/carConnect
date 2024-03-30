import React, { useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import { useBlockUsersMutation, useGetUsersQuery } from '../../Slices/adminApiSlice';

const AdminUsers = () => {

  const { data:users, isLoading, refetch, error } = useGetUsersQuery();
  console.log(users);

  const [ blockUsers, {isLoading: blockUserLoading, error: blockUserError, refetch: refetchBlockUser} ] = useBlockUsersMutation();

  const handleBlockUser = async (id) => {
    try {
      console.log(id);
      const data = await blockUsers(id).unwrap();
      refetch();
      console.log(data);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
    <AdminNavbar />
    <div class="d-flex">
        <form action="" className="d-flex mx-2 my-3 justify-content-center " role="search" >
            <input class="form-control mx-2 border border-2 " type="search" placeholder="Search User" id="search" name="search"/>
            <button class="btn btn-primary btn-md" type="submit">Search</button>
        </form> 
      </div>
    <div className="d-flex w-100 ml-2 justify-content-between">
        <h3 className="mb-5 mt-3 mx-2"> All users</h3>
      </div>

      <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th  scope="col">Userid</th>
              <th  scope="col">Userame</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Location</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
    
          <tbody>
            {users && users.map((user) => {
              return(
              <tr key={user.id}>
              <td>  {user.id} </td>
              <td>  {user.name.toUpperCase()} </td>
              <td>  {user.email} </td>
              <td>  {user.phonenumber} </td>
              <td>  {user.location==='' ? "Location not updated" : user.location} </td>
              <td>
                    {user.isBlocked===true ? (
                      <button
                      onClick={()=>handleBlockUser(user.id)}
                      className="btn btn-primary btn-md"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button 
                      onClick={()=>handleBlockUser(user.id)}
                       className="btn btn-primary btn-md"
                       >
                        Block
                      </button>
                    )
                    }
                </td>

            </tr>
              )
             })}  
          
          </tbody>
        </table>

    </>
    
  )
}

export default AdminUsers;