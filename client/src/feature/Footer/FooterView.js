import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUrls } from '../UrlTable/UrlTableSlice'

const FooterView = () => {
    const dispatch = useDispatch()

    const page = useSelector(state => state.urls.page)
    const pages = useSelector(state => state.urls.pages)
    const perPage = useSelector(state => state.urls.perPage)

    const handlePreviousButton = () => {
        if (page-1 > 0) {
            dispatch(fetchUrls({page:page-1, perPage:perPage})) 
        }
    }

    const handleNextButton = () => {
        if (page+1 <= pages) {
            dispatch(fetchUrls({page:page+1, perPage:perPage}))
        }
    }

    return (
        <div>
            <button onClick={ () => handlePreviousButton()}>Previous</button>
            <label>Page {page} of {pages} </label>
            <button onClick={() => handleNextButton()}>Next</button>
        </div>
    )
}

export default FooterView