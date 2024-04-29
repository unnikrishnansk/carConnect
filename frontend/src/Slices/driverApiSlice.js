import { apiSlice } from "./apiSlice.js";

const DRIVERS_URL = '/api/drivers';

export const driversApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        driverlogin: builder.mutation({
            query: (data) => ({
                url: `${DRIVERS_URL}/driverlogin`,
                method: 'POST',
                body: data
            })
        }),
        driverregister: builder.mutation({
            query: (data) => ({
                url: `${DRIVERS_URL}/driversignup`,
                method: 'POST',
                body: data
            })
        }),
        driverlogout: builder.mutation({
            query: () => ({
                url: `${DRIVERS_URL}/logout`,
                method: 'POST'
            })
        }),
        driverprofile: builder.query({
            query: () => ({
              url: `${DRIVERS_URL}/driverprofile`,
              method: 'GET',
            })
        }),
        editDriver: builder.mutation({
            query: (data) => ({
              url: `${DRIVERS_URL}/editdriver`,
              method: 'PUT',
              body: data,
            })
        }),
        getDriverRideDetail: builder.mutation({
            query: (data) => ({
              url: `${DRIVERS_URL}/driverridehistory`,
              method: 'POST',
              body: data
            }),
        }),
        acceptRide: builder.mutation({
            query: (id) => ({
              url: `${DRIVERS_URL}/acceptride/${id}`,
              method: 'GET',
            }),
        }),
        reachedRide: builder.mutation({
            query: (id) => ({
              url: `${DRIVERS_URL}/reachedride/${id}`,
              method: 'GET',
            }),
        }),
        paymentReceived: builder.mutation({
            query: (id) => ({
              url: `${DRIVERS_URL}/paymentreceived/${id}`,
              method: 'GET',
            }),
        }),
        driverVehicle: builder.mutation({
            query: (id) => ({
              url: `${DRIVERS_URL}/drivervehicle/${id}`,
              method: 'GET',
            }),
        }),
    })
})

export const {useDriverloginMutation, useDriverregisterMutation, useDriverlogoutMutation, useDriverprofileQuery, useEditDriverMutation, useGetDriverRideDetailMutation, useAcceptRideMutation, useReachedRideMutation, usePaymentReceivedMutation, useDriverVehicleMutation } = driversApiSlice;