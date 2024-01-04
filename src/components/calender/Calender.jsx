/* eslint-disable react/prop-types */

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventComponent from "./Events";
import { useEffect, useMemo, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../../services/fackApis";
import { Spinner } from "flowbite-react";

import "./Calender.scss";

const Calender = ({ calendarRef, daysPerPage, initialDate }) => {
  // const handleEventClick = (clickInfo) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete the event '${clickInfo.event.title}'`
  //     )
  //   ) {
  //     clickInfo.event.remove();
  //   }
  // };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["getAllEvents"],
    queryFn: getEvent,
  });

  // const INITIAL_EVENTS = [
  //   { title: "Event 1", start: "2024-01-01" },
  //   { title: "Event 2", start: "2024-01-03" },
  //   { title: "Event 2", start: "2024-01-02" },
  //   { title: "Event 2", start: "2024-01-04" },
  //   { title: "Event 3", start: "2024-01-04" },
  //   { title: "Event 3", start: "2024-01-03" },

  //   // Add more events as needed
  // ];
  const INITIAL_EVENTS = useMemo(() => {
    return data ?? [];
  }, [data]);

  if (INITIAL_EVENTS.length > 0) {
    INITIAL_EVENTS.sort((eventA, eventB) => {
      const dateA = new Date(eventA.start);
      const dateB = new Date(eventB.start);
      return dateA - dateB;
    });
  }
  const tempEvents = [];

  INITIAL_EVENTS.forEach((e) => {
    if (tempEvents.some((e1) => e1.title === e.title)) {
      const lastIndex = tempEvents.findLastIndex((e2) => e2.title === e.title);
      e.day = +tempEvents[lastIndex].day + 1;
      tempEvents.push(e);
      return;
    }
    e.day = 1;
    tempEvents.push(e);
  });

  INITIAL_EVENTS.forEach((e) => {
    if (
      tempEvents.findIndex((e1) => e1.title === e.title) ===
      tempEvents.findLastIndex((e1) => e1.title === e.title)
    ) {
      e.isOneDayEvent = true;
      return;
    }
    const lastIndex = tempEvents.findLastIndex((e1) => e1.title === e.title);
    const totalDays = tempEvents[lastIndex].day;

    e.totalDays = totalDays;
    e.isOneDayEvent = false;
  });
  const [events, setEvents] = useState(INITIAL_EVENTS);
  useEffect(() => {
    // Update the state when data changes
    setEvents(INITIAL_EVENTS);
  }, [data, INITIAL_EVENTS]);

  const handleEventDrop = (dropInfo) => {
    const copiedEvent = {
      title: dropInfo.event.title,
      start: dropInfo.event.start,
    };
    setEvents([...events, copiedEvent]);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-wrap justify-center items-center  gap-2">
        <Spinner aria-label="Small spinner example" size="xl" />

        <h1>Loading...</h1>
      </div>
    );
  }
  const dayRender = ({ el }) => {
  
    el.style.background = "#f3f4f9";
  };
  const handleEventMount = (info) => {
    const isInitialDate =
      info.date.getDate() === new Date().getDate() &&
      info.date.getMonth() === new Date().getMonth() &&
      info.date.getFullYear() === new Date().getFullYear();

    if (isInitialDate) {
      info.el.classList.add("initial-date-event");
    }
    if (!isInitialDate) {
      info.el.classList.add("not-initial-date-event");
    }
  };

  const eventRender = ({ el }) => {
    el.style.border = "none";
    el.style.margin = "5px 0px 0px 0px";
  };

  return (
    <div className="demo-app -z-10 ">
      <div className="calender-app-main">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={false}
          dayHeaderContent={(args) => {
            const date = args.text.split(",");
            return (
              <div className=" ">
                <div>
                  {date[1]},{date[2]}
                </div>
                <div className=" text-xs font-light">{date[0]}</div>
              </div>
            );
          }}
          dayHeaderClassNames={"h-20 text-center"}
          dayHeaderFormat={{
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }}
          views={{
            dayGridWeek: {
              duration: { days: daysPerPage },
            },
          }}
          initialView="dayGridWeek"
          initialDate={initialDate}
          dayHeaderDidMount={handleEventMount}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayHeaders={true}
          events={events}
          eventContent={(event) => <EventComponent event={event} />}
          eventClassNames={"bg-[#F3F4F9] w-full"}
          dayCellClassNames={"bg-[#F3F4F9]"}
          slotDuration="12:00:00" // Set the duration of each time slot
          slotEventOverlap={false}
          eventDrop={handleEventDrop}
          eventDidMount={eventRender}
          dayCellDidMount={dayRender}
        />
      </div>
    </div>
  );
};

export default Calender;
