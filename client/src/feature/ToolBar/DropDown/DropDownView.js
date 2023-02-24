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
        { id: 1, label : '5',  value : 5  },
        { id: 2, label : '10', value : 10 },
        { id: 3, label : '15', value : 15 },
        { id: 4, label : '20', value : 20 }
    ]

    return (
        <div className='dropdown'>
            <label>
                Show &nbsp;
                <select value={value} onChange={(event) => handleChange(event)}>
                    {
                        options.map((option) => (
                            <option key={option.id} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
                &nbsp; records per page
            </label>
        </div>
    )
}

export default DropDownView