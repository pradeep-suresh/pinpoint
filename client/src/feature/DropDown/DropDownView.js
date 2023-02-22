import React from 'react'
import './DropDownView.css'

const DropDownView = () => {
    const [value, setValue] = React.useState('fruit');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return (
        <div className='dropdown'>
            <label>
                Show &nbsp;
                <select value={value} onChange={handleChange}>
                </select>
                &nbsp; records per page
            </label>
        </div>
    )
}

export default DropDownView