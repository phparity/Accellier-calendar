/* eslint-disable react/prop-types */


import LeftArrowIcon from "../../../public/images/arrow-left.svg";
import RightArrowIcon from "../../../public/images/arrow-right.svg";

import "./DateSlider.scss";

const DateSlider = ({handlePrev,handleNext,currentPage,daysPerPage}) => {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return (
    <div style={{  zIndex: 2 }} className="management_dates ">
      <div className="arrows_otr">
        <div
          className="arrow_otr left_arrow"
            onClick={handlePrev}
            disabled={currentPage === 0}
        >
          <img className="arrow_icon" src={LeftArrowIcon} alt="icon" />
        </div>
        <div
          className="arrow_otr right_arrow"
            onClick={handleNext}
            disabled={
              currentPage === Math.ceil(totalDaysInMonth / daysPerPage) - 1
            }
        >
          <img className="arrow_icon" src={RightArrowIcon} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default DateSlider;
