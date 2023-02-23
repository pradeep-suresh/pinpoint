import React, { useState } from 'react'

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

import { addUrl } from '../../../UrlTable/UrlTableSlice';
import { useDispatch } from 'react-redux';

import './ShorternUrlModal.css'

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
                <Typography id="modal-modal-description" sx={{ mt: 2 , padding: 1}}>
                    Enter the URL:
                </Typography>
                <TextField fullWidth 
                variant="outlined"
                onChange={ event => setUrl('https://' + event.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                }} />
                <div className='buttons-frame'>
                    <span className='button-frame'>
                        <button className='cancel-button' onClick={props.handleClose}>Cancel</button>
                    </span>
                    <span className='button-frame'>
                        <button className='add-button' onClick={() => handleAddUrl()}>Add </button>
                    </span>
                </div>
            </Box>
      </Modal>
    )
}

export default ShorternUrlModalView