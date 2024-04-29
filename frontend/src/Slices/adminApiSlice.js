import { apiSlice } from "./apiSlice.js";

const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminlogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/adminlogin`,
                method: 'POST',
                body: data
            })
        }),
        adminlogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST'
            })
        }),
        getUsers: builder.query({
            query: () => ({
              url: `${ADMIN_URL}/adminusers`,
              method: 'GET',
            })
          }),
          getVehicles: builder.query({
            query: () => ({
              url: `${ADMIN_URL}/vehicles`,
              method: 'GET',
            })
          }),
          getDrivers: builder.query({
            query: () => ({
              url: `${ADMIN_URL}/admindrivers`,
              method: 'GET',
            })
          }),
          blockUsers: builder.mutation({
            query: (id) => ({
              url: `${ADMIN_URL}/blockuser/${id}`,
              method: 'POST',
            })
          }),
          addVehicle: builder.mutation({
            query: (data) => ({
              url: `${ADMIN_URL}/vehicles`,
              method: 'POST',
              body: data,
            })
        }),
        getVehicle: builder.query({
          query: (id) => ({
            url: `${ADMIN_URL}/vehicle/${id}`,
            method: 'GET',
          })
      }),
      editVehicle: builder.mutation({
        query: ({id, data}) => ({
          url: `${ADMIN_URL}/vehicle/${id}`,
          method: 'PUT',
          body: data,
        })
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/vehicle/${id}`,
        method: 'DELETE',
      }),
    }),

    getVehicleImage: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/vehicleimages/${id}`,
        method: 'GET',
      }),
    }),
    getDriverApproval: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/driverapproval/${id}`,
        method: 'GET',
      }),
    }),
    approveDriver: builder.mutation({
      query: ({data}) => ({
        url: `${ADMIN_URL}/approve`,
        method: 'POST',
        body: data,
      }),
    }),
    declineDriver: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/decline/${id}`,
        method: 'PUT',
      }),
    }),
    getAllRideDetail: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/adminridedetails`,
        method: 'GET',
      }),
     }),
     getAdminhome: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/adminhome`,
        method: 'GET',
      }),
  }),
    })
})

export const {useAdminloginMutation, useAdminlogoutMutation, useGetUsersQuery, useGetDriversQuery, useBlockUsersMutation, useGetVehiclesQuery, useAddVehicleMutation, useGetVehicleQuery, useEditVehicleMutation, useDeleteVehicleMutation, useGetVehicleImageMutation, useGetDriverApprovalMutation, useApproveDriverMutation, useDeclineDriverMutation, useGetAllRideDetailQuery, useGetAdminhomeQuery } = adminApiSlice;