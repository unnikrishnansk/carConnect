// import { apiSlice } from "./apiSlice.js";

// const DRIVERS_URL = '/api/drivers';

// export const driversApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         driverlogin: builder.mutation({
//             query: (data) => ({
//                 url: `${DRIVERS_URL}/driverlogin`,
//                 method: 'POST',
//                 body: data
//             })
//         }),
//         driverregister: builder.mutation({
//             query: (data) => ({
//                 url: `${DRIVERS_URL}/driversignup`,
//                 method: 'POST',
//                 body: data
//             })
//         }),
//         driverlogout: builder.mutation({
//             query: () => ({
//                 url: `${DRIVERS_URL}/logout`,
//                 method: 'POST'
//             })
//         }),
//         driverprofile: builder.query({
//             query: () => ({
//               url: `${DRIVERS_URL}/driverprofile`,
//               method: 'GET',
//             })
//         })
//     })
// })

// export const {useDriverloginMutation, useDriverregisterMutation, useDriverlogoutMutation, useDriverprofileQuery } = driversApiSlice;