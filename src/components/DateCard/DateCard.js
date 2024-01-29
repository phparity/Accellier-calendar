import React from 'react'

import './DateCard.scss'

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
    <div className={`date_card_otr ${className}`}>
      <div className='date_card_inr'>
        <h3 className='date_text'>
          {DateText}
        </h3>
        <p className='day_text'>
          {DayText}
        </p>
      </div>
    </div>
  )
}

export default DateCard