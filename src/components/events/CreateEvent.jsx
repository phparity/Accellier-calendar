/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import "./CreateEvent.scss";
import { useQuery } from "@tanstack/react-query";
import { getManagers } from "../../services/fackApis";

const CreateEvent = ({ openCreateEventModal, setOpenCreateEventModal }) => {
  const [selectedSection, setSelectedSection] = useState("eventInfo");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["getAllManagers"],
    queryFn: getManagers,
  });
  console.log(data);
  //   const handleSectionChange = (event) => {
  //     setSelectedSection(event.target.value);
  //   };

  return (
    <Modal
      show={openCreateEventModal}
      onClose={() => setOpenCreateEventModal(false)}
    >
      <Modal.Body>
        <div className="space-y-6 z-50 verflow-scroll  ">
          <div className="event-form-container ">
            <div className="event-form-header  ">
              <h1>Create Event</h1>
              <button onClick={() => setOpenCreateEventModal(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.00061 6.58508L12.5926 1.99312C12.9835 1.60223 13.6172 1.60223 14.0081 1.99312C14.399 2.384 14.399 3.01775 14.0081 3.40864L9.41678 7.99995L14.0081 12.5913C14.399 12.9822 14.399 13.6159 14.0081 14.0068C13.6172 14.3977 12.9835 14.3977 12.5926 14.0068L8.00061 9.41482L3.40864 14.0068C3.01775 14.3977 2.384 14.3977 1.99312 14.0068C1.60223 13.6159 1.60223 12.9822 1.99312 12.5913L6.58443 7.99995L1.99312 3.40864C1.60223 3.01775 1.60223 2.384 1.99312 1.99312C2.384 1.60223 3.01775 1.60223 3.40864 1.99312L8.00061 6.58508Z"
                    fill="#5A5C69"
                  />
                </svg>
              </button>
            </div>
            <form className="event-form">
              <div className="dropdown-buttons">
                <div className="event-information">
                  <div className="info-header">
                    <h1>Event Information</h1>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M15.4951 12.4973L10.4951 7.49731L5.49512 12.4973"
                          stroke="black"
                          strokeWidth="1.87496"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="eventInfo">
                    <div className="form-fields">
                      <div className="form-field">
                        <label htmlFor="eventNature">Event Nature:</label>
                        <input
                          type="text"
                          id="eventNature"
                          name="eventNature"
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="eventId">Event ID:</label>
                        <input type="text" id="eventId" name="eventId" />
                      </div>
                    </div>

                    <div className="form-fields">
                      <div className="form-field">
                        <label htmlFor="eventName">Event Name:</label>
                        <input type="text" id="eventName" name="eventName" />
                      </div>
                    </div>

                    <div className="form-fields">
                      <div className="form-field">
                        <label htmlFor="eventType">Event Type:</label>
                        <select id="eventType" name="eventType">
                          <option value="conference">Conference</option>
                          <option value="seminar">Seminar</option>
                          <option value="workshop">Workshop</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div className="form-field">
                        <label htmlFor="eventStatus">Event Status:</label>
                        <select id="eventStatus" name="eventStatus">
                          <option value="scheduled">Scheduled</option>
                          <option value="canceled">Canceled</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                    </div>

                    <div className="form-fields">
                      <div className="form-field">
                        <label htmlFor="account">Account:</label>
                        <input type="text" id="account" name="account" />
                      </div>

                      <div className="form-field">
                        <label htmlFor="grossSalesAmount">
                          Gross Sales Amount:
                        </label>
                        <input
                          type="text"
                          id="grossSalesAmount"
                          name="grossSalesAmount"
                        />
                      </div>
                    </div>

                    <div className="form-fields">
                      <div className="form-field">
                        <label htmlFor="numBars">Number of Bars:</label>
                        <input type="number" id="numBars" name="numBars" />
                      </div>

                      <div className="form-field">
                        <label htmlFor="numGuests">Number of Guests:</label>
                        <input type="number" id="numGuests" name="numGuests" />
                      </div>
                    </div>

                    <div className="form-fields">
                      <div className="form-field">
                        <label htmlFor="relatedCPQ">Related CPQ:</label>
                        <input type="text" id="relatedCPQ" name="relatedCPQ" />
                      </div>

                      <div className="form-field">
                        <label htmlFor="taskType">Task Type:</label>
                        <input type="text" id="taskType" name="taskType" />
                      </div>
                    </div>

                    <div className="form-fields">
                      <div className="form-field">
                        <label htmlFor="informationManager">
                          Information :
                        </label>
                        <textarea
                          type="text"
                          id="informationManager"
                          name="informationManager"
                        />
                      </div>
                    </div>

                    <div className="form-fields">
                      
                        <div className="manager">
                          <img src="/manager.png" alt="" className=" " />
                          <select id="eventType" name="eventType">
                            {data?.map((profile) => (
                              <option key={profile.id} value={profile.name}>
                                {profile.name}
                              </option>
                            ))}
                            {/* Add more options as needed */}
                          </select>
                        </div>
                      
                    </div>

                    <div className="form-field">
                      <label htmlFor="location">Location:</label>
                      <input type="text" id="location" name="location" />
                    </div>
                  </div>
                </div>

                <div onClick={() => setSelectedSection("dateTime")}>
                  <div>
                    <h2>Event Date and Time</h2>
                    <div className="form-field">
                      <label htmlFor="eventDate">Event Date:</label>
                      <input type="date" id="eventDate" name="eventDate" />
                    </div>

                    <div className="form-field">
                      <label htmlFor="eventTime">Event Time:</label>
                      <input type="time" id="eventTime" name="eventTime" />
                    </div>
                  </div>
                </div>
                <div onClick={() => setSelectedSection("financialInfo")}>
                  <div>
                    <h2>Financial Information</h2>
                    <div className="form-field">
                      <label htmlFor="financialDetails">
                        Financial Details:
                      </label>
                      <textarea id="financialDetails" name="financialDetails" />
                    </div>
                  </div>
                </div>
              </div>

              {/* {selectedSection === "eventInfo" && (
         
              )} */}

              {/* {selectedSection === "dateTime" && (
                
              )} */}

              {/* {selectedSection === "financialInfo" && (
                
              )} */}

              <Button onClick={() => setOpenCreateEventModal(false)}>
                I accept
              </Button>
              <Button
                color="gray"
                onClick={() => setOpenCreateEventModal(false)}
              >
                Decline
              </Button>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateEvent;
