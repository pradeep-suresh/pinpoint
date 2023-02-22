import React from 'react'
import './DropDownView.css'

import { setRecordsPerPage } from './DropDownSlice'
import { useDispatch } from 'react-redux'


const DropDownView = () => {
    const dispatch = useDispatch()

    const [value, setValue] = React.useState(5);

    const handleChange = (event) => {
      setValue(event.target.value);
      dispatch(setRecordsPerPage(event.target.value))
    };

    const options = [
        { label : '5',  value : 5  },
        { label : '10', value : 10 },
        { label : '15', value : 15 },
        { label : '20', value : 20 }
    ]

    return (
        <div className='dropdown'>
            <label>
                Show &nbsp;
                <select value={value} onChange={handleChange}>
                    {
                        options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
                &nbsp; records per page
            </label>
        </div>
    )
}

export default DropDownView