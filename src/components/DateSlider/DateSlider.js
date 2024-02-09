import React, { useState, useEffect, Fragment } from "react";
import { useSwipeable } from "react-swipeable";
import DateCard from "../DateCard/DateCard";
import LeftArrowIcon from "../../assets/images/arrow-left.svg";
import RightArrowIcon from "../../assets/images/arrow-right.svg";
import "./DateSlider.scss";
import PostCard from "../PostCard/PostCard";
import PostCardList from "../PostCard/PostCardList";

/**
 * Generates a date slider component with the ability to navigate through dates and display events for each date.
 *
 * @param {object} selectedDate - The selected date for the date slider.
 * @param {array} eventListData - The list of events to display on the date slider.
 * @return {JSX.Element} The date slider component.
 */
const DateSlider = ({ selectedDate, eventListData }) => {
  // Initialize currentDate state with selectedDate if it exists, otherwise use current date
  const [currentDate, setCurrentDate] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );
  // This hook initializes the state variable daysPerPage with a default value of 7
  const [daysPerPage, setDaysPerPage] = useState(7);

  // useEffect hook to update current date when selectedDate changes
  useEffect(() => {
    if (selectedDate) setCurrentDate(selectedDate);
  }, [selectedDate]);

  /**
   * Returns the day of the week based on the day index.
   * @param {number} dayIndex - The index of the day in the week.
   * @returns {string} - The name of the day.
   */
  const getDayOfWeek = (dayIndex) => {
    // Array of days in a week
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    // Return the day based on the index
    return daysOfWeek[dayIndex % daysOfWeek.length];
  };

  /**
   * Returns the name of the month based on the given month index.
   * @param {number} monthIndex - The index of the month (0-11).
   * @returns {string} - The name of the month.
   */
  const getMonthName = (monthIndex) => {
    // Array of month names
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    // Return the month name based on the index
    return months[monthIndex % months.length];
  };
  /**
   * Renders the days and corresponding post cards for the current date and surrounding dates.
   * @returns {Object} An object containing arrays of days and post cards.
   */
  const renderDays = () => {
    // Initialize arrays to store days and post cards
    const days = [];
    const postCards = [];
    // Calculate the offset based on the number of days per page
    const offset = Math.floor(daysPerPage / 2);
    // Iterate through the surrounding dates
    for (let i = -offset; i <= offset; i++) {
      // Create a new date object for the current date and offset
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      // Check if the current date is active
      const isActive =
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();
      // Create a DateCard component and add it to the days array
      days.push(
        <DateCard
          key={i + offset}
          DateText={`${getMonthName(
            date.getMonth()
          )} ${date.getDate()}, ${date.getFullYear()}`}
          DayText={getDayOfWeek(date.getDay())}
          className={isActive ? "current_date" : ""}
        />
      );
      // Filter the event list data for the current date
      const postCardData = eventListData.filter(
        (post) =>
          post.date ===
          `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      );
      // Create post card components and add them to the post cards array
      if (postCardData.length > 0) {
        postCards[i + offset] = postCardData.map((postCard, index) => (
          <Fragment key={`${postCard.id}_${index}`}>
            <PostCard PostListData={postCard} />
          </Fragment>
        ));
      } else {
        postCards[i + offset] = (
          <Fragment key={`empty_${i + offset}`}>
            <PostCard PostListData={""} />
          </Fragment>
        );
      }
    }
    // Return the arrays of days and post cards
    return { days, postCards };
  };

  /**
   * Update the current date by adding a specified number of days.
   * @param {number} days - The number of days to add to the current date.
   */
  const handleSwipe = (days) => {
    // Calculate the new date by adding the specified number of days to the current date
    setCurrentDate(new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000));
  };
  // Set up swipe handlers
  // const handlers = useSwipeable({
  //   onSwipedLeft: () => handleSwipe(1), // Call handleSwipe with 1 when swiped left
  //   onSwipedRight: () => handleSwipe(-1), // Call handleSwipe with -1 when swiped right
  //   preventDefaultTouchmoveEvent: true, // Prevent default touchmove event
  //   trackMouse: true, // Enable tracking of mouse events
  //   delta: 30,                             // min distance(px) before a swipe starts. *See Notes*
  //   trackTouch: true,                      // track touch input
  //   swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
  //   touchEventOptions: { passive: true },
  // });
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1), // Call handleSwipe with 1 when swiped left
    onSwipedRight: () => handleSwipe(-1), // Call handleSwipe with -1 when swiped right
    preventDefaultTouchmoveEvent: true, // Prevent default touchmove event
    trackMouse: true, // Enable tracking of mouse events
    delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
    swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    /*
    * updateColumns - updates the number of days per page based on the screen width
    */
    const updateColumns = () => {
      const screenWidth = window.innerWidth;
      // if (screenWidth >= 1800) {     
      //   setDaysPerPage(7); // set 7 days per page for large screens
      // } else if (screenWidth >= 1700) { 
      //   setDaysPerPage(5); // set 5 days per page for medium screens
      // } else if (screenWidth >= 1340) {
      //   setDaysPerPage(4); // set 4 days per page for medium screens 
      // }else if (screenWidth >= 992) {
      //   setDaysPerPage(3); // set 3 days per page for small screens
      // } else if (screenWidth >= 767) {
      //   setDaysPerPage(2); // set 2 days per page for small screens
      // } else {
      //   setDaysPerPage(1); // set 1 day per page for extra small screens
      // } 
      if (screenWidth >= 1250) {
        setDaysPerPage(7); // set 7 days per page for large screens
      } else if (screenWidth >= 1024) {
        setDaysPerPage(5); // set 5 days per page for medium screens
      } else if (screenWidth >= 667) {
        setDaysPerPage(3); // set 3 days per page for small screens
      } else {
        setDaysPerPage(1); // set 1 day per page for extra small screens
      }
    };
    // Call updateColumns function
    updateColumns();
    // Add event listener to update columns on window resize
    window.addEventListener("resize", updateColumns);
    // Remove event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  return (
    <div className="management_dates" {...handlers}>
      <div className="date_cards_otr">{renderDays().days}</div>
      <div className="arrows_otr">
        <div
          className="arrow_otr left_arrow"
          onClick={() => handleSwipe(-1)}
        >
          <img className="arrow_icon" src={LeftArrowIcon} alt="icon" />
        </div>
        <div
          className="arrow_otr right_arrow"
          onClick={() => handleSwipe(1)}
        >
          <img className="arrow_icon" src={RightArrowIcon} alt="icon" />
        </div>
      </div>

      <div className="post_row_custom">
        {Object.keys(renderDays().postCards).map((dayIndex) => (
          <div key={dayIndex} className="post_cards_otr">
            {renderDays().postCards[dayIndex]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateSlider;
