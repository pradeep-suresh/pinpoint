import React from 'react'
import './AddButtonView.css'

import ShorternUrlModalView from './ShortenUrlModal/ShorternUrlModalView';
import Button from '@mui/material/Button';




const AddButtonView = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='button'>
            <button onClick={handleOpen}>Add</button>
            <ShorternUrlModalView open={open} handleClose={handleClose}/>
        </div>
      );
}

export default AddButtonView