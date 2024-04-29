import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    SuggestionInfo: localStorage.getItem('SuggestionInfo') ? JSON.parse(localStorage.getItem("SuggestionInfo")) : null
}

const suggestionSlice = createSlice({
    name: 'suggestion',
    initialState,
    reducers: {
        setSuggestionCredentials: (state, action) => {
            state.SuggestionInfo = action.payload;
            localStorage.setItem('SuggestionInfo', JSON.stringify(action.payload));
        },
        clearSuggestionCredentials: (state) => {
            state.SuggestionInfo = null;
            localStorage.removeItem('SuggestionInfo');
        }
    }
});

export const {setSuggestionCredentials, clearSuggestionCredentials} = suggestionSlice.actions;

export default suggestionSlice.reducer;