/* eslint-disable no-unused-vars */
// import { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import Events from "./Events";

// const Calendar = () => {
//   const [events, setEvents] = useState([
//     { title: "Event 1", start: "2023-12-29" },
//     { title: "Event 2", start: "2023-01-02" },
//     // Add more events as needed
//   ]);

//   const handleEventDrop = (info) => {
//     const updatedEvents = events.map((event) =>
//       event.id === info.event.id
//         ? { ...event, start: info.event.startStr }
//         : event
//     );

//     setEvents(updatedEvents);
//   };

//   return (
// //     <FullCalendar
// //     plugins={[dayGridPlugin
// //         // , timeGridPlugin, interactionPlugin
// //     ]}
// //     headerToolbar={{
// //       left: 'prev,next today',
// //       center: 'title',
// //       right: 'timeGridWeek'
// //     }}
// //     initialView='dayGridMonth'
// //     editable={true}
// //     selectable={true}
// //     selectMirror={true}
// //     // dayMaxEvents={true}
// //     // weekends={this.state.weekendsVisible}
// //     // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
// //     // select={this.handleDateSelect}
// //     // eventContent={Events} // custom render function
// //     // eventClick={this.handleEventClick}
// //     // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
// //     /* you can update a remote database when these fire:
// //     eventAdd={function(){}}
// //     eventChange={function(){}}
// //     eventRemove={function(){}}
// //     */
// //   />
//     <FullCalendar
//       plugins={[dayGridPlugin]}
//       initialView="dayGridWeek"
//       events={events}
//       editable={true}
//       eventDrop={handleEventDrop}
//     />
//   );
// };

// export default Calendar;
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventComponent from "./Events";
const INITIAL_EVENTS = [
  { title: "Event 1", start: "2024-01-01" },
  { title: "Event 2", start: "2024-01-03" },
  { title: "Event 2", start: "2024-01-02" },
  { title: "Event 2", start: "2024-01-04" },
  { title: "Event 3", start: "2024-01-04" },
  { title: "Event 3", start: "2024-01-03" },

  // Add more events as needed
];
INITIAL_EVENTS.sort((eventA, eventB) => {
  const dateA = new Date(eventA.start);
  const dateB = new Date(eventB.start);
  return dateA - dateB;
});

const events = [];

INITIAL_EVENTS.forEach((e) => {
  if (events.some((e1) => e1.title === e.title)) {
    const lastIndex = events.findLastIndex((e2) => e2.title === e.title);
    e.day = +events[lastIndex].day + 1;
    events.push(e);
    return;
  }
  e.day = 1;
  events.push(e);
});

INITIAL_EVENTS.forEach((e) => {
  if (
    events.findIndex((e1) => e1.title === e.title) ===
    events.findLastIndex((e1) => e1.title === e.title)
  ) {
    e.isOneDayEvent = true;
    return;
  }
  e.isOneDayEvent = false;
});



const DemoApp = () => {
  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    console.log(events);
  };

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          customButtons={{
            testButton: {
              text: "test!",
            },
          }}
          headerToolbar={{
            left: "testButton, prev ,today, next",

            center: "",
            right: "timeGridWeek",
          }}
          initialView="dayGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          dayHeaders={true}
          events={INITIAL_EVENTS}
          eventContent={(event) => <EventComponent event={event} />}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>
    </div>
  );
};

export default DemoApp;
