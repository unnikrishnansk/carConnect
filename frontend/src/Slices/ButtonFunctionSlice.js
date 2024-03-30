import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    buttonVisible: localStorage.getItem('buttonVisible') ? JSON.parse(localStorage.getItem("buttonVisible")) : null
}

const buttonVisibleSlice = createSlice({
    name: 'button',
    initialState,
    reducers: {
        setUnvisible: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('buttonVisible', JSON.stringify(action.payload));
        },
    }
});

export const {setUnvisible } = authSlice.actions;

export default buttonVisibleSlice.reducer;