import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rideInfo: localStorage.getItem('rideInfo') ? JSON.parse(localStorage.getItem("rideInfo")) : null
}

const rideSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        setRideCredentials: (state, action) => {
            state.rideInfo = action.payload;
            localStorage.setItem('rideInfo', JSON.stringify(action.payload));
        },
        clearRideCredentials: (state) => {
            state.rideInfo = null;
            localStorage.removeItem('rideInfo');
        }
    }
});

export const {setRideCredentials, clearRideCredentials} = rideSlice.actions;

export default rideSlice.reducer;