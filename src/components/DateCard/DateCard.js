import React from "react";
import PropTypes from 'prop-types';
import "./DateCard.scss";

/**
 * Renders a date card component with the given DateText and DayText.
 *
 * @param {string} DateText - The date to be displayed.
 * @param {string} DayText - The day of the week to be displayed.
 * @param {string} className - Additional CSS class for styling.
 * @returns {JSX.Element} The rendered date card component.
 */
function DateCard({ DateText, DayText, className }) {
  return (
    <div data-testid="date-card-outer" className={`date_card_otr ${className}`}>
      <div className="date_card_inr">
        <h3 className="date_text">{DateText}</h3>
        <p className="day_text">{DayText}</p>
      </div>
    </div>
  );
}

// Define prop types for the component
DateCard.propTypes = {
  DateText: PropTypes.string,
  DayText: PropTypes.string,
  className: PropTypes.string
};

export default DateCard;
