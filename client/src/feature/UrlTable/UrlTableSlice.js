import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { useSelector } from "react-redux";

const initialState = {
    loading : false,
    urls : [],
    page : 0,
    pages : 0,
    perPage : 0,
    total : 0,
    error: ''
}

export const fetchUrls = createAsyncThunk('urls/fetchUrls', (data) => {
    const {page, perPage } = data
    return axios.get(`http://localhost:5004/shortener?page=${page}&per_page=${perPage}`)
})


const urlsSlice = createSlice({
    name: 'urls',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUrls.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchUrls.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.urls = action.payload.data.items
            state.page = action.payload.data.page
            state.pages = action.payload.data.pages
            state.perPage = action.payload.data.per_page
            state.total = action.payload.data.total
        })
        builder.addCase(fetchUrls.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export default urlsSlice.reducer