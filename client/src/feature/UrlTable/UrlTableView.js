import React, { useState } from 'react'
import './UrlTableView.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchUrls } from './UrlTableSlice'

const UrlTableView = () => {
    const dispatch = useDispatch()

    const recordsPerPage = useSelector(state => state.showRecordsPerPage.showRecordsPerPage)
    const urls = useSelector(state => state.urls.urls)

    useEffect(() => {
        dispatch(fetchUrls({page: 1, perPage: recordsPerPage}))
    }, [recordsPerPage])

    return (
        <div>
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
                            <tr>
                                <td>{url.url}</td>
                                <td>{url.short_code}</td>
                                <td>{url.created_at}</td>
                                <td>delete</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UrlTableView