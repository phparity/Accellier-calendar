/* eslint-disable react/prop-types */

import { useState } from "react";
import "./Events.scss";
const EventComponent = ({ event }) => {
  const eventDetails = event.event._def.extendedProps;
  const [isExpanded, setIsExpanded] = useState(eventDetails.day <= 1);

  // const eventDetails = {
  //   eventName: event.event._def.title,
  //   day: event.event._def.extendedProps.day,
  //   isOneDayEvent: event.event._def.extendedProps.isOneDayEvent,
  //   totalDays: event.event._def.extendedProps.totalDays,
  //   eventTime: "12:00 PM - 3:00 PM",
  //   eventVenue: "36 Guild Street London, UK",
  //   eventManager: "John Doe",
  //   logos: ["martini1.png", "pound.png", " info.png"],
  // };

  const otherFields = [
    {
      name: "Tasks",
      numbers: ` ${eventDetails.taskRedNum}  ${eventDetails.taskYellowNum}    ${eventDetails.taskGreenNum}`,
    },
    {
      name: "Equipment",
      numbers: ` ${eventDetails.equipmentRedNum}  ${eventDetails.equipmentYellowNum}    ${eventDetails.equipmentGreenNum}`,
    },
    {
      name: "Inventory",
      numbers: ` ${eventDetails.inventoryRedNum}  ${eventDetails.inventoryYellowNum}    ${eventDetails.inventoryGreenNum}`,
    },
    {
      name: "Staffing",
      numbers: ` ${eventDetails.staffingRedNum}  ${eventDetails.staffingYellowNum}    ${eventDetails.staffingGreenNum}`,
    },
  ];

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="  event-container">
      <div onClick={handleClick} className=" event-title">
        <div className=" event-title-main">
          <h2 className=" title-heading">{event.event._def.title}</h2>
          {!eventDetails.isOneDayEvent && (
            <p className=" bg-[#F6A609B2]/70 py-[3px] px-2 rounded-lg">
              Day {eventDetails.day} / {eventDetails.totalDays}
            </p>
          )}
        </div>
        <div className="flex items-center event-time">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.83332 11.6666C9.95041 11.6666 11.6666 9.95041 11.6666 7.83332C11.6666 5.71624 9.95041 4 7.83332 4C5.71624 4 4 5.71624 4 7.83332C4 9.95041 5.71624 11.6666 7.83332 11.6666Z"
              stroke="#000000"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.83331 5.53333V7.83332L9.36664 8.59999"
              stroke="#000000"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className=" text-black">{eventDetails.TimeText}</p>
        </div>
        <div className=" flex justify-start items-center event-location ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.55485 1.22366C4.4652 0.6947 5.58418 0.703946 6.486 1.24788C7.37894 1.80288 7.92166 2.79341 7.9166 3.85894C7.89582 4.91748 7.31388 5.9125 6.58645 6.68171C6.1666 7.12767 5.69693 7.52202 5.18702 7.85669C5.13451 7.88705 5.07698 7.90738 5.01729 7.91667C4.95984 7.91422 4.90389 7.89725 4.85448 7.86727C4.07601 7.36441 3.39306 6.72252 2.83847 5.97249C2.37441 5.3464 2.11077 4.59001 2.08334 3.80601C2.08273 2.73844 2.64449 1.75261 3.55485 1.22366ZM4.0809 4.24781C4.23404 4.62533 4.59549 4.87158 4.9965 4.87159C5.25921 4.87347 5.51175 4.76824 5.69784 4.57935C5.88393 4.39045 5.98812 4.13358 5.98719 3.86597C5.98859 3.4575 5.74811 3.08845 5.37803 2.93114C5.00795 2.77383 4.58127 2.85929 4.29722 3.14763C4.01316 3.43596 3.92777 3.87028 4.0809 4.24781Z"
              fill="#000000"
            />
            <path
              opacity="0.4"
              d="M5.00001 9.16667C6.1506 9.16667 7.08334 8.98012 7.08334 8.75C7.08334 8.51988 6.1506 8.33334 5.00001 8.33334C3.84941 8.33334 2.91667 8.51988 2.91667 8.75C2.91667 8.98012 3.84941 9.16667 5.00001 9.16667Z"
              fill="#000000"
            />
          </svg>
          <p> {eventDetails.LocationText}</p>
        </div>
      </div>
      {isExpanded && (
        <>
          <div className=" event-manager border-b-[2px] items-center flex gap-2 py-3 px-2">
            <div>
              <img
                src={eventDetails.profileImg}
                alt="manager"
                className=" w-8 rounded-full"
              />
            </div>
            <div className="event-manager-info flex flex-col gap-0">
              <strong className=" font-bold">{eventDetails.userName}</strong>
              <p className=" text-slate-500">{eventDetails.userPost}</p>
            </div>
          </div>
          <div className=" event-info border-b-[2px] flex justify-around py-3 px-2">
            <img
              src={eventDetails.infoIcon1}
              alt={eventDetails.tooltipText1}
              title={eventDetails.tooltipText1}
              className="event-info-logo logo w-8 h-8 object-contain"
            />
            <img
              src={eventDetails.infoIcon2}
              alt={eventDetails.tooltipText2}
              title={eventDetails.tooltipText2}
              className="event-info-logo logo w-8 h-8 object-contain"
            />
            <img
              src={eventDetails.infoIcon3}
              alt={eventDetails.tooltipText3}
              title={eventDetails.tooltipText3}
              className="event-info-logo logo w-8 h-8 object-contain"
            />
            {/* ))} */}
          </div>
          <div className=" event-extra-info border-b-[2px] flex flex-col justify-around gap-3 py-3 px-2">
            {otherFields.map((field) => (
              <div
                key={field.name}
                className="extra-info-name flex justify-around items-center  "
              >
                <div className=" w-1/5">
                  <p>{field.name}</p>
                </div>
                <div className="">
                  <pre>{field.numbers}</pre>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="10"
                    viewBox="0 0 88 10"
                    fill="none"
                  >
                    <g filter="url(#filter0_d_1_391)">
                      <path
                        d="M40.3368 0.0497589H38.3866L42.457 3.52724L38.3866 7.00471H40.3368L44.4048 3.52724L40.3368 0.0497589Z"
                        fill="#FFCD1C"
                      />
                      <path
                        d="M35.1855 0.0497589H33.2377L37.3081 3.52724L33.2377 7.00471H35.1855L39.2559 3.52724L35.1855 0.0497589Z"
                        fill="#FFCD1C"
                      />
                      <path
                        d="M30.0373 0.0497437H28.0895L32.1599 3.52722L28.0895 7.0047H30.0373L34.1077 3.52722L30.0373 0.0497437Z"
                        fill="#FFCD1C"
                      />
                      <path
                        d="M14.2536 0.0497437H12.3058L16.3762 3.52722L12.3058 7.0047H14.2536L18.324 3.52722L14.2536 0.0497437Z"
                        fill="#D44949"
                      />
                      <path
                        d="M9.10704 0.0497437H7.1569L11.2273 3.52722L7.1569 7.0047H9.10704L13.1751 3.52722L9.10704 0.0497437Z"
                        fill="#D44949"
                      />
                      <path
                        d="M3.95566 0.0497589H2.00785L6.07821 3.52724L2.00785 7.00471H3.95566L8.02602 3.52724L3.95566 0.0497589Z"
                        fill="#D44949"
                      />
                      <path
                        d="M24.5538 0.0497437H22.6037L26.674 3.52722L22.6037 7.0047H24.5538L28.6218 3.52722L24.5538 0.0497437Z"
                        fill="#D44949"
                      />
                      <path
                        d="M19.4026 0.0497437H17.4547L21.5251 3.52722L17.4547 7.0047H19.4026L23.4729 3.52722L19.4026 0.0497437Z"
                        fill="#D44949"
                      />
                      <path
                        d="M45.1464 0.0497437H43.1986L47.2689 3.52722L43.1986 7.0047H45.1464L49.2167 3.52722L45.1464 0.0497437Z"
                        fill="#1CC88A"
                      />
                      <path
                        d="M71.6317 0.0497589H69.6839L73.7542 3.52724L69.6839 7.00471H71.6317L75.702 3.52724L71.6317 0.0497589Z"
                        fill="#1CC88A"
                      />
                      <path
                        d="M55.444 0.0497589H53.4962L57.5666 3.52724L53.4962 7.00471H55.444L59.5144 3.52724L55.444 0.0497589Z"
                        fill="#1CC88A"
                      />
                      <path
                        d="M81.9295 0.0497589H79.9817L84.0521 3.52724L79.9817 7.00471H81.9295L85.9999 3.52724L81.9295 0.0497589Z"
                        fill="#1CC88A"
                      />
                      <path
                        d="M66.4859 0.0497589H64.5357L68.6061 3.52724L64.5357 7.00471H66.4859L70.5539 3.52724L66.4859 0.0497589Z"
                        fill="#1CC88A"
                      />
                      <path
                        d="M50.2974 0.0497589H48.3473L52.4177 3.52724L48.3473 7.00471H50.2974L54.3655 3.52724L50.2974 0.0497589Z"
                        fill="#1CC88A"
                      />
                      <path
                        d="M76.7829 0.0497589H74.8328L78.9031 3.52724L74.8328 7.00471H76.7829L80.851 3.52724L76.7829 0.0497589Z"
                        fill="#1CC88A"
                      />
                      <path
                        d="M61.3338 0.0497589H59.386L63.4564 3.52724L59.386 7.00471H61.3338L65.4042 3.52724L61.3338 0.0497589Z"
                        fill="#1CC88A"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_1_391"
                        x="0.703797"
                        y="0.0497437"
                        width="86.6001"
                        height="9.56308"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1.30405" />
                        <feGaussianBlur stdDeviation="0.652027" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1_391"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1_391"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            ))}
          </div>
          {(eventDetails.salesMoney || eventDetails.profitMoney) && (
            <div className=" event-sales-profite border-b-[2px] flex border justify-around gap-3 py-3 px-2">
              {eventDetails.salesMoney && (
                <div
                  className={` event-sales pr-3 flex flex-col justify-center items-center  ${
                    eventDetails.salesMoney &&
                    eventDetails.profitMoney &&
                    "border-r-2"
                  } `}
                >
                  <p> Forecast Sales </p>
                  <strong className=" "> {eventDetails.salesMoney}</strong>
                </div>
              )}
              {eventDetails.profitMoney && (
                <div className=" event-profit flex flex-col justify-center items-center  ">
                  <p> Forecast Profit </p>
                  <strong className=" "> {eventDetails.profitMoney}</strong>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventComponent;
