import React, { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import CalenderIcon from '../../assets/images/callender-icon.svg'

/**
 * Functional component for a date picker
 * @param {Object} props - The props for the component
 * @param {function} props.setTodaysDate - Function to set today's date
 * @param {string} props.placeholder - Placeholder text for the date picker
 */
function DatePickerComponent(props) {
    const { setTodaysDate } = props; // Destructuring props
    const [startDate, setStartDate] = useState(new Date()); // Initializing state with current date

    // Return the date picker component
    return (
        <div className='date_picker_otr'> {/* Date picker container */}
            <DatePicker
                showIcon // Show the calendar icon
                selected={startDate} // Set the selected date
                onChange={(date) => setTodaysDate(date)} // Handle date change
                isClearable // Allow clearing the date
                placeholderText={props.placeholder} // Set placeholder text
                icon={<img className='callender_icon' src={CalenderIcon} alt='icon' />} // Calendar icon
            />
        </div>
    )
}

export default DatePickerComponent