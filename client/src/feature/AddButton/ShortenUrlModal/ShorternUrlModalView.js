import React, { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { addUrl, fetchUrls } from '../../UrlTable/UrlTableSlice';
import { useDispatch, useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ShorternUrlModalView = (props) => {
    const dispatch = useDispatch()
    const [url, setUrl] = useState('')

    const total = useSelector(state => state.urls.total)
    const recordsPerPage = useSelector(state => state.showRecordsPerPage.showRecordsPerPage)

    const handleAddUrl = () => {
        dispatch(addUrl(url), dispatch)
        props.handleClose()
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Shortern URL
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Enter the URL:
                </Typography>
                <TextField fullWidth 
                variant="outlined"
                onChange={ event => setUrl('https://' + event.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                }} />
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={() => handleAddUrl()}>Add </Button>
            </Box>
      </Modal>
    )
}

export default ShorternUrlModalView