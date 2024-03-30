import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vehicleInfo: localStorage.getItem('vehicleInfo') ? JSON.parse(localStorage.getItem("vehicleInfo")) : null
}

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        setVehicleCredentials: (state, action) => {
            state.vehicleInfo = action.payload;
            localStorage.setItem('vehicleInfo', JSON.stringify(action.payload));
        },
        clearVehicleCredentials: (state) => {
            state.vehicleInfo = null;
            localStorage.removeItem('vehicleInfo');
        }
    }
});

export const {setVehicleCredentials, clearVehicleCredentials} = vehicleSlice.actions;

export default vehicleSlice.reducer;