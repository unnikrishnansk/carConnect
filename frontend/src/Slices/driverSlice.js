import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    driverInfo: localStorage.getItem('driverInfo') ? JSON.parse(localStorage.getItem("driverInfo")) : null
}

const driverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        setDriverCredentials: (state, action) => {
            state.driverInfo = action.payload;
            localStorage.setItem('driverInfo', JSON.stringify(action.payload));
        },
        clearDriverCredentials: (state) => {
            state.driverInfo = null;
            localStorage.removeItem('driverInfo');
        }
    }
});

export const {setDriverCredentials, clearDriverCredentials} = driverSlice.actions;

export default driverSlice.reducer;