import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUrls } from '../UrlTable/UrlTableSlice'

import './FooterView.css'


const FooterView = () => {
    const dispatch = useDispatch()

    const page = useSelector(state => state.urls.page)
    const pages = useSelector(state => state.urls.pages)
    const perPage = useSelector(state => state.urls.perPage)
    const urls = useSelector(state => state.urls.urls)

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
            { urls.length > 0 ?
                <div className='footer'>
                    <button className='footer-button' onClick={ () => handlePreviousButton()}>Previous</button>
                        <label className='label'>Page {page} of {pages} </label>
                    <button className='footer-button' onClick={() => handleNextButton()}>Next</button>
                </div>
            : null}
        </div>
    )
}

export default FooterView