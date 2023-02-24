import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import moment from 'moment'


const initialState = {
    loading : false,
    urls : [],
    page : 1,
    pages : 1,
    perPage : 5,
    total : 0,
    error: ''
}

const API_URL = process.env.REACT_APP_API_SERVICE_URL

export const fetchUrls = createAsyncThunk('urls/fetchUrls', (data) => {
    const {page, perPage } = data
        return axios.get(`${API_URL}/shortener?page=${page}&per_page=${perPage}`)
})

export const deleteUrl = createAsyncThunk('urls/deleteUrl', (id) => {
    return axios.delete(`${API_URL}/shortener/${id}`)
})

export const addUrl = createAsyncThunk('urls/addUrl', (url) => {
    return axios.post(`${API_URL}/shortener`, {
        url
    })
})

const urlsSlice = createSlice({
    name: 'urls',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUrls.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchUrls.fulfilled, (state, action) => {
            state.loading = false
            state.urls = action.payload.data.items
            state.page = action.payload.data.page
            state.pages = action.payload.data.pages
            state.perPage = action.payload.data.per_page
            state.total = action.payload.data.total
        })
        builder.addCase(fetchUrls.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteUrl.fulfilled, (state, action) => {
            state.urls = state.urls.filter(url => url.id !== parseInt(action.meta.arg))
            state.total -= 1
        })
        builder.addCase(addUrl.fulfilled, (state, action) => {
            state.urls.unshift({
                id: action.payload.data.id, 
                url: action.payload.data.url, 
                short_code: action.payload.data.short_code, 
                created_at: moment().format("MMM DD, YYYY")})
            state.total += 1
            state.page = 1
        })
        builder.addCase(addUrl.rejected, (state, action) => {
            state.error = "The URL has already been added"
        })
    }
})

export default urlsSlice.reducer