import React, { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

import { addUrl, resetError } from '../../../UrlTable/UrlTableSlice';
import { useDispatch, useSelector } from 'react-redux';

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
    const error = useSelector(state => state.urls.error)

    const [url, setUrl] = useState('')
    const [openErrorModal, setOpenErrorModal] = useState(false);
    
    const handleErrorModalClose = () => {
        setOpenErrorModal(false);
        dispatch(resetError())
    }
    const handleErrorModalOpen = () => setOpenErrorModal(true)

    const handleAddUrl = () => {
        if ((url.includes('https://')) || (url.includes('http://'))) {
            dispatch(addUrl(url), dispatch)
            console.log('Here')
        } else {
            dispatch(addUrl('https://' + url), dispatch)
        }
        props.handleClose()
    }

    useEffect(() => {
        if (error === true) {
            handleErrorModalOpen()
        } else {
            handleErrorModalClose()
        }
    },[error])

    return (
        <div>
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
                onChange={ event => setUrl(event.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                }} />
                <div className='modal-buttons-frame'>
                    <span className='modal-button-frame'>
                        <button className='cancel-button' onClick={props.handleClose}>Cancel</button>
                    </span>
                    <span className='modal-button-frame'>
                        <button className='add-button' onClick={() => handleAddUrl()}>Add </button>
                    </span>
                </div>
            </Box>
      </Modal>
      <Modal
        open={openErrorModal}
        onClose={handleErrorModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 , padding: 1}}>
                Shortcode for this URL has already been created
            </Typography>
            <div className='modal-buttons-frame'>
                <span className='modal-button-frame'>
                    <button className='ok-button' onClick={ () => handleErrorModalClose()}>Ok</button>
                </span>
            </div>
            </Box>
        </Modal>
      </div>
    )
}

export default ShorternUrlModalView