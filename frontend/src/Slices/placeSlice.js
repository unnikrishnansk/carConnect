import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startplaceInfo: localStorage.getItem('startplaceInfo') ? JSON.parse(localStorage.getItem("startplaceInfo")) : null,
    destplaceInfo: localStorage.getItem('destplaceInfo') ? JSON.parse(localStorage.getItem("destplaceInfo")) : null,
    startplaceCord: localStorage.getItem('startplaceCord') ? JSON.parse(localStorage.getItem("startplaceCord")) : null,
    destplaceCord: localStorage.getItem('destplaceCord') ? JSON.parse(localStorage.getItem("destplaceCord")) : null,
    distance: localStorage.getItem('distance') ? JSON.parse(localStorage.getItem("distance")) : null,
    duration: localStorage.getItem('duration') ? JSON.parse(localStorage.getItem("duration")) : null,
    cartype: localStorage.getItem('cartype') ? JSON.parse(localStorage.getItem("cartype")) : null
}

const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        setStartPlaceCredentials: (state, action) => {
            state.startplaceInfo = action.payload;
            localStorage.setItem('startplaceInfo', JSON.stringify(action.payload));
        },
        setEndPlaceCredentials: (state, action) => {
            state.destplaceInfo = action.payload;
            localStorage.setItem('destplaceInfo', JSON.stringify(action.payload));
        },
        setStartPlaceCords: (state, action) => {
            state.startplaceCord = action.payload;
            localStorage.setItem('startplaceCord', JSON.stringify(action.payload));
        },
        setEndPlaceCords: (state, action) => {
            state.destplaceCord = action.payload;
            localStorage.setItem('destplaceCord', JSON.stringify(action.payload));
        },
        setDistanceCredentials: (state, action) => {
            state.distance = action.payload;
            localStorage.setItem('distance', JSON.stringify(action.payload));
        },
        setDurationCredentials: (state, action) => {
            state.duration = action.payload;
            localStorage.setItem('duration', JSON.stringify(action.payload));
        },
        setCarType: (state, action) => {
            state.cartype = action.payload;
            localStorage.setItem('cartype', JSON.stringify(action.payload));
        },
        clearPlaceCredentials: (state) => {
            state.startplaceInfo = null;
            state.destplaceInfo = null;
            state.startplaceCord = null;
            state.destplaceCord = null;
            state.distance = null;
            state.duration = null;
            state.cartype = null;
            localStorage.removeItem('startplaceInfo');
            localStorage.removeItem('destplaceInfo');
            localStorage.removeItem('startplaceCord');
            localStorage.removeItem('destplaceCord');
            localStorage.removeItem('distance');
            localStorage.removeItem('duration');
            localStorage.removeItem('cartype');
        }
    }
});

export const {setStartPlaceCredentials, setEndPlaceCredentials, setDistanceCredentials, setStartPlaceCords, setEndPlaceCords, setDurationCredentials, setCarType, clearPlaceCredentials} = placeSlice.actions;

export default placeSlice.reducer;