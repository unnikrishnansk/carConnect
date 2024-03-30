import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice.js';
import { apiSlice } from './Slices/apiSlice.js'; 
import driverReducer from './Slices/driverSlice.js';
import adminReducer from './Slices/adminSlice.js';
import vehicleReducer from './Slices/vehicleSlice.js';
import placeReducer from './Slices/placeSlice.js';
import availablevehiclesReducer from './Slices/SelectedVehicle.js';
import rideReducer from './Slices/rideSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    driver: driverReducer,
    admin: adminReducer,
    vehicle: vehicleReducer,
    place: placeReducer,
    availablevehicles: availablevehiclesReducer,
    ride: rideReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;