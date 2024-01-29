import React, { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import CalenderIcon from '../../assets/images/callender-icon.svg'

function DatePickerComponent(props) {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className='date_picker_otr'>
            <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                isClearable
                placeholderText={props.placeholder}
                icon={
                    <img className='callender_icon' src={CalenderIcon} alt='icon'/>
                }
            />
        </div>
    )
}

export default DatePickerComponent