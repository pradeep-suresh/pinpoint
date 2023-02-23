import React from 'react'
import './AddButtonView.css'

import ShorternUrlModalView from './ShortenUrlModal/ShorternUrlModalView';




const AddButtonView = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='button-frame'>
            <button className ='button' onClick={handleOpen}>Add</button>
            <ShorternUrlModalView open={open} handleClose={handleClose}/>
        </div>
      );
}

export default AddButtonView