import React, { useState } from 'react'
import './UrlTableView.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchUrls, deleteUrl } from './UrlTableSlice'

const UrlTableView = () => {
    const dispatch = useDispatch()
    
    const recordsPerPage = useSelector(state => state.showRecordsPerPage.showRecordsPerPage)
    const page = useSelector(state => state.urls.page)
    const urls = useSelector(state => state.urls.urls)
    const total = useSelector(state => state.urls.total)
    
    useEffect(() => {
        dispatch(fetchUrls({page: 1, perPage: recordsPerPage}))
    }, [recordsPerPage])

    useEffect(() => {
        dispatch(fetchUrls({page: page, perPage: recordsPerPage}))
    }, [page])

    useEffect(() => {
        if (total % recordsPerPage === 0) {
            if (page -1 > 0) {
                dispatch(fetchUrls({page: page - 1, perPage: recordsPerPage}))  
            }
            else {
                dispatch(fetchUrls({page: page, perPage: recordsPerPage})) 
            }
        } else {
            dispatch(fetchUrls({page: page, perPage: recordsPerPage}))
        }  
    }, [total])

    const handleDelete = (url) => {
        dispatch(deleteUrl(url.id))
    }

    return (
        <div className='table-border'>
            <table>
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Code</th>
                        <th>Created At</th>
                        <th>Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        urls.map(url => (
                            <tr key={url.id}>
                                <td>{url.url}</td>
                                <td>{url.short_code}</td>
                                <td>{url.created_at}</td>
                                <td className='delete' onClick={() => handleDelete(url)}>Delete</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UrlTableView