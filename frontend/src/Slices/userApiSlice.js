import { apiSlice } from "./apiSlice.js";

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        profile: builder.query({
            query: () => ({
              url: `${USERS_URL}/profile`,
              method: 'GET',
            })
        }),
        editUser: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/edituser`,
              method: 'PUT',
              body: data,
            })
        }),
        vehicleList: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/vehiclelist`,
              method: 'POST',
              body: data,
            })
        }),
        sendOtp: builder.mutation({
            query: (id) => ({
              url: `${USERS_URL}/userotp/${id}`,
              method: 'GET',
            }),
        }),
          payment: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/payment`,
              method: 'POST',
              body: data
            }),
        }),
        getRideDetail: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/rideshistory`,
              method: 'POST',
              body: data
            }),
        }),
        addWallet: builder.mutation({
          query: (data) => ({
            url: `${USERS_URL}/addwallet`,
            method: 'POST',
            body: data
          }),
      }),
      getBalance: builder.query({
        query: (id) => ({
          url: `${USERS_URL}/getbalance/${id}`,
          method: 'GET',
        }),
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addreview`,
        method: 'POST',
        body: data
      }),
  }),
  getReview: builder.query({
    query: () => ({
      url: `${USERS_URL}/getreview`,
      method: 'GET',
    }),
  }),
  googleLogin: builder.mutation({
    query: (data) => ({
      url: `${USERS_URL}/googlelogin`,
      method: 'POST',
      body: data
    }),
  }),
    })
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileQuery, useEditUserMutation, useVehicleListMutation, useSendOtpMutation, usePaymentMutation, useGetRideDetailMutation, useAddWalletMutation, useGetBalanceQuery, useAddReviewMutation, useGetReviewQuery, useGoogleLoginMutation } = usersApiSlice;