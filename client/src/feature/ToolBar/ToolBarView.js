import React from 'react'

import AddButtonView from './AddButton/AddButtonView'
import DropDownView from './DropDown/DropDownView'

const ToolBarView = () => {
    return (
        <div>
            <DropDownView />
            <AddButtonView />
        </div>
    )
}

export default ToolBarView