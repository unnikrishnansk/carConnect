import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    availableVehicles: localStorage.getItem('availableVehicles') ? JSON.parse(localStorage.getItem('availableVehicles')) : null
}

const availableVehiclesSlice = createSlice({
    name: 'availableVehicles', 
    initialState,
    reducers: {
        setAvailableVehicleCredentials: (state, action) => {
            state.availableVehicles = action.payload;
            localStorage.setItem('availableVehicles', JSON.stringify(action.payload));
        },
        clearVehicleCredentials: (state) => {
            state.availableVehicles = null;
            localStorage.removeItem('availableVehicles');
        }
    }
});

export const {setAvailableVehicleCredentials, clearVehicleCredentials} = availableVehiclesSlice.actions;

export default availableVehiclesSlice.reducer;