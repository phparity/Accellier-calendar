import { useState, useEffect, createRef } from "react";

import PlusIcon from "../../../public/images/plus-icon.svg";

import "./EventManagementPage.scss";

import Calender from "../../components/calender/Calender";
import DatePickerComponent from "../../components/DatePicker/DatePicker";
import DateSlider from "../../components/DateSlider/DateSlider";
import ChooseProfile from "../../components/models/ChooseProfile";
import CreateEvent from "../../components/events/CreateEvent";  
import { RiAddCircleLine } from "react-icons/ri";
import { centerDate } from "../../../utils/helper";

function EventManagementPage() {
  const [numColumns, setNumColumns] = useState(7);
  const [currentPage, setCurrentPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateEventModal, setOpenCreateEventModal] = useState(false);

  const startDate = new Date();
  centerDate(startDate);
  // const [initialDate, setInitialDate] = useState(startDate);
  const initialDate = startDate;
  const calendarRef = createRef();

  const handleGoToToday = () => {
    calendarRef.current.getApi().gotoDate(startDate);
  };
  const handleGoToSelectedDate = (date) => {
    const calendarApi = calendarRef.current.getApi();
    const startDate = new Date(date);
    centerDate(startDate);
    const specificDate = startDate.toLocaleString().split(",")[0];
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

      if (screenWidth >= 1440) { 
        setNumColumns(7);
      } else if (screenWidth >= 1360) {
        setNumColumns(7); 
      } else if (screenWidth >= 770) {
        setNumColumns(3); 
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
        <h3 className="page_heading">Event Management</h3>  
          <div className="heading_otr"> 
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
              className="create_btn"
            >
              {/* <img className="plus_icon" src={PlusIcon} alt="icon" /> */}
              <i className="crt_btn_i"><RiAddCircleLine /></i>
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
        <Calender
          calendarRef={calendarRef}
          daysPerPage={numColumns}
          initialDate={initialDate}
        />
      </div>
    </>
  );
}

export default EventManagementPage;
