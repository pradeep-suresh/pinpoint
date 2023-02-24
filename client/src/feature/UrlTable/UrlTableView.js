import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import './UrlTableView.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchUrls, deleteUrl } from './UrlTableSlice'

const API_URL = process.env.REACT_APP_API_SERVICE_URL

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

const clickToCopy = (code) => {
    navigator.clipboard.writeText(`${API_URL}/${code}`)
}

const UrlTableView = () => {
    const dispatch = useDispatch()
    
    const recordsPerPage = useSelector(state => state.showRecordsPerPage.showRecordsPerPage)
    const page = useSelector(state => state.urls.page)
    const urls = useSelector(state => state.urls.urls)
    const total = useSelector(state => state.urls.total)

    useEffect(() => {
        dispatch(fetchUrls({page: 1, perPage: recordsPerPage}))
    },[dispatch])
    
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
                        <th colSpan="2">URL</th>
                        <th>Code</th>
                        <th>Created At</th>
                        <th>Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        urls.map(url => (
                            <tr key={url.id}>
                                <LightTooltip title={url.url}>
                                    <td className='ellipsis'>{url.url}</td>
                                </LightTooltip>
                                <td className='link'>
                                    <a href={API_URL + '/' + url.short_code} target='_blank'>Link</a>
                                </td>
                                <td>{url.short_code} &nbsp;&nbsp; 
                                    <LightTooltip title='Click to copy'>
                                        <ContentCopyIcon className='icon' 
                                        fontSize='small'
                                        onClick={() =>{clickToCopy(url.short_code)} }/>
                                    </LightTooltip>
                                </td>
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