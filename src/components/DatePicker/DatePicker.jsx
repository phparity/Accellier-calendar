/* eslint-disable react/prop-types */

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import CalenderIcon from "../../../public/images/callender-icon.svg";

import "./DatePicker.scss";

function DatePickerComponent({ handleGoToSelectedDate }) {

  return (
    <div className="date_picker_otr">
      <DatePicker
        showIcon
        onChange={(date)=>handleGoToSelectedDate(date)}
        isClearable
        className="custom-datepicker"
        calendarClassName="custom-calendar"
        dateFormat="MMMM d, yyyy"
        icon={<img className="callender_icon" src={CalenderIcon} alt="icon" />}
      />
      
    </div>
  );
}

export default DatePickerComponent;
