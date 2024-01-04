import { useState, useEffect, createRef } from "react";

import PlusIcon from "../../../public/images/plus-icon.svg";

import "./EventManagementPage.scss";

import Calender from "../../components/calender/Calender";
import DatePickerComponent from "../../components/DatePicker/DatePicker";
import DateSlider from "../../components/DateSlider/DateSlider";
import ChooseProfile from "../../components/models/ChooseProfile";
import CreateEvent from "../../components/events/CreateEvent";

function EventManagementPage() {
  const [numColumns, setNumColumns] = useState(7);
  const [currentPage, setCurrentPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateEventModal, setOpenCreateEventModal] = useState(false);

  const calendarRef = createRef();

  useEffect(() => {

      
    
  }, [calendarRef]);

  const handleGoToToday = () => {
    const calendarApi = calendarRef.current.getApi();
    const currentCalendar = calendarRef.current.getApi();
      const currentDate = new Date();

      // Calculate start and end dates for the visible range
      const pastDate = new Date();

      console.log("🚀 ~ file: EventManagementPage.jsx:29 ~ pastDate:", pastDate);

      pastDate.setDate(currentDate.getDate() - 3);

      const futureDate = new Date();

      console.log("🚀 ~ file: EventManagementPage.jsx:35 ~ futureDate:", futureDate);

      futureDate.setDate(currentDate.getDate() + 3);

      // Set valid range to include the past and future dates
      currentCalendar.setOption('validRange', {
        start: pastDate,
        end: futureDate,
      });

      // Set visible range to center on today
      currentCalendar.setOption('visibleRange', {
        start: pastDate,
        end: futureDate,
      });
    calendarApi.today();
  };
  const handleGoToSelectedDate = (date) => {
    const calendarApi = calendarRef.current.getApi();
    const specificDate = date.toLocaleString().split(",")[0];
    const [month, day, year] = specificDate.split("/");
    const targetDate = new Date(year, month - 1, day);
    calendarApi.gotoDate(targetDate);
  };

  const handleGoToNextWeek = () => {
    setCurrentPage(currentPage + 1);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };
  const handleGoToPrevWeek = () => {
    setCurrentPage(currentPage - 1);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1250) {
        setNumColumns(7);
      } else if (screenWidth >= 992) {
        setNumColumns(5);
      } else if (screenWidth >= 770) {
        setNumColumns(4);
      } else if (screenWidth >= 500) {
        setNumColumns(2);
      } else {
        setNumColumns(1);
      }
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);
  return (
    <>
      <div className="EventManagementPage_main relative">
        <div className="heading_create">
          <div className="heading_otr">
            <h3 className="page_heading">Event Management</h3>
            <button
              onClick={handleGoToToday}
              className={`theme_btn tag_button `}
            >
              Today
            </button>
          </div>
          <div className="create_icons">
            <div className=" relative z-53">
              <ChooseProfile
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            </div>

            <DatePickerComponent
              handleGoToSelectedDate={handleGoToSelectedDate}
            />
            <button
              onClick={() => setOpenCreateEventModal(true)}
              className="theme_btn create_btn"
            >
              <img className="plus_icon" src={PlusIcon} alt="icon" />
              <span className="button_text">Create Event</span>
            </button>
          </div>
        </div>
        <div className="">
          <CreateEvent
            openCreateEventModal={openCreateEventModal}
            setOpenCreateEventModal={setOpenCreateEventModal}
          />
        </div>
        <DateSlider
          handlePrev={handleGoToPrevWeek}
          handleNext={handleGoToNextWeek}
          currentPage={currentPage}
          daysPerPage={numColumns}
        />
        <Calender calendarRef={calendarRef} daysPerPage={numColumns} />
      </div>
    </>
  );
}

export default EventManagementPage;
