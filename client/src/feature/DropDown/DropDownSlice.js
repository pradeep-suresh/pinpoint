import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showRecordsPerPage : 5
}

const dropDownSlice = createSlice({
    name:'dropdown',
    initialState,
    reducers: {
        setRecordsPerPage : (state, action) => {
            state.showRecordsPerPage = action.payload
        }
    }
})

export default dropDownSlice.reducer
export const { setRecordsPerPage } = dropDownSlice.actions

