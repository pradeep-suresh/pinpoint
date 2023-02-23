import { configureStore } from '@reduxjs/toolkit'
import showRecordsPerPageReducer from './../feature/ToolBar/DropDown/DropDownSlice'
import urlsReducer from './../feature/UrlTable/UrlTableSlice'

const store = configureStore({
    reducer : {
        urls : urlsReducer,
        showRecordsPerPage : showRecordsPerPageReducer
    }
})

export default store