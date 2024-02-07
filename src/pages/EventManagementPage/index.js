import React, { useState, useEffect, useCallback } from 'react'
import ThemeButton from '../../components/ThemeButton/ThemeButton'
import DatePickerComponent from '../../components/DatePickerComponent/DatePickerComponent'
import PostCardList from '../../components/PostCard/PostCardList'
import PostCard from '../../components/PostCard/PostCard'
import DateSlider from '../../components/DateSlider/DateSlider'
import { RiAddCircleLine } from "react-icons/ri";

import ProfileIcon from '../../assets/images/profile-icon.svg'
import PlusIcon from '../../assets/images/plus-icon.svg'

import './EventManagementPage.scss'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import { Dropdown } from 'react-bootstrap'
import CreateEventSlider from '../../components/CreateEventSlider'
import FilterUserEvent from '../../components/FilterUserEvent'

/**
 * Creates an Event Management Module component with state variables and functions for managing events.
 */
function EventManagementModule() {
    const [numColumns, setNumColumns] = useState(7);
    const [todaysDate, setTodaysDate] = useState("");
    const [show, setShow] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [eventListData, setEventListData] = useState(PostCardList);
    const [filterValue, setFilterValue] = useState([]);

/**
 * Function to handle the closing action
 * 
 * @returns {void}
 */
const handleClose = () => {
  setShow(false);
};
/**
 * Function to handle showing
 */
const handleShow = () => {
  // Set show to true
  setShow(true);
};

    /**
     * Saves the filtered values from the PostCardList
     */
    const saveFilterValue = () => {
        // Initialize an empty array to store the filtered data
        let eventFilterData = [];

        // Use filter and map to create a new array with the filtered data
        PostCardList?.filter((item, index, self) => {
            return index === self.findIndex((t) => t.userName === item.userName);
        }).map((data) => {
                // Create a new object with selected fields and add it to eventFilterData
                let newData = { 'id': data?.id, 'userName': data?.userName, 'userPost': data?.userPost, 'profileImg': data?.profileImg, 'isFilter': false };
                eventFilterData.push(newData);
            })

        // Set the filtered data as the new filter value
        setFilterValue(eventFilterData);
    }

    // This effect is triggered when the component mounts, and it calls the saveFilterValue function
    useEffect(() => {
        saveFilterValue()
    }, [])

    // useEffect(() => {
    //     console.log(filterValue, 'filterValue', eventListData);
    // }, [filterValue, eventListData])

    /**
     * Toggles the visibility of the filter dropdown.
     * 
     * @param {boolean} isFilterOpen - Whether the filter dropdown is open or closed.
     */
    const handleFilterDropdownToggle = (isFilterOpen) => {
        // Set the state to control the visibility of the filter dropdown
        setIsFilterOpen(isFilterOpen);
    }

    /**
     * Handles the close button for the filter
     */
    const handleFilterCloseButton = () => {
        // Close the filter
        setIsFilterOpen(false);

        // Save the filter value
        saveFilterValue();

        // Set the event list data to the default post card list
        setEventListData(PostCardList);
    }

    // useCallback is used to memoize the function handleFilterSelection
    // It takes an array data and an index as parameters
    const handleFilterSelection = useCallback((data, index) => {
        // Update the isFilter property of the element at the specified index
        setFilterValue((prevData) => {
            prevData[index].isFilter = !prevData[index].isFilter;
            return [...prevData]; // Return a new array with the updated data
        });
    }, []); // Empty dependency array means this callback will never change

    /**
     * Handles the event filtered data
     * @param {Event} e - The event object
     */
    const handleEventFilteredData = useCallback((e) => {
        e.preventDefault();
        // Filter the event list data based on the filter value
        const filteredValue = eventListData?.filter((item) => {
            return filterValue?.some((data) => data?.isFilter && data?.userName === item?.userName)
        });
        // Check if filteredValue has a length greater than 0
        if (filteredValue?.length > 0) {
            // If true, set the event list data to the filtered value
            setEventListData(filteredValue);
        } else {
            // If false, set the event list data to PostCardList
            setEventListData(PostCardList);
        }
        // Close the filter
        setIsFilterOpen(false);
    }, [filterValue]);

    useEffect(() => {
        /**
         * Update the number of columns based on the screen width
         */
        const updateColumns = () => {
          /*   const screenWidth = window.innerWidth;
            if (screenWidth >= 1250) {
                setNumColumns(7); // Set number of columns to 7 for large screens
            } else if (screenWidth >= 1024) {
                setNumColumns(5); // Set number of columns to 5 for medium screens
            } else if (screenWidth >= 667) {
                setNumColumns(3); // Set number of columns to 3 for small screens
            } else {
                setNumColumns(1); // Set number of columns to 1 for extra small screens
            } */
            
        };
        // Call updateColumns function
        updateColumns();
        
        // Add event listener for window resize event
        window.addEventListener('resize', updateColumns);
        
        // Remove event listener when component is unmounted
        return () => {
            window.removeEventListener('resize', updateColumns);
        };
    }, []);

    return (
        <>
            <Header />
            <div className='EventManagementPage_main parent_padding evPage'>

                <div className="evHeading_top">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className="col-12">
                                <div className='heading_create'>
                                <h3 className='page_heading'>
                                            Event Management
                                        </h3>
                                    <div className='heading_otr'> 
                                        <ThemeButton
                                            buttonClass="tag_button"
                                            buttonText="Today"
                                            onClick={() => {
                                                setTodaysDate(new Date());
                                            }}
                                        />
                                    </div>
                                    <div className='create_icons'>
                                        <Dropdown show={isFilterOpen} onToggle={handleFilterDropdownToggle} className="btn_actions" autoClose="outside">
                                            <Dropdown.Toggle className="btn-more icon_otr" id="dropdown-autoclose-outside">
                                                <img className='user_icon' src={ProfileIcon} alt='icon' />
                                            </Dropdown.Toggle>
                                            {
                                                <FilterUserEvent handleFilterCloseButton={handleFilterCloseButton} filterValue={filterValue?.length > 0 ? filterValue : null} handleFilterSelection={handleFilterSelection} handleEventFilteredData={handleEventFilteredData} />
                                            }
                                        </Dropdown>
                                        <DatePickerComponent setTodaysDate={setTodaysDate} />
                                        <button onClick={handleShow} className=' create_btn'>
                                            {/* <img className='plus_icon' src={PlusIcon} alt='icon' /> */}
                                            <i className="crt_btn_i"><RiAddCircleLine /></i>
                                            <span className='button_text'>
                                                Create Event
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="event-box container-fluid">

                    <div className="row">
                        <div className="col-12 p-0">
                            <DateSlider selectedDate={todaysDate} eventListData={eventListData} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <CreateEventSlider
                show={show}
                handleClose={handleClose}
            />
        </>
    )
}

export default EventManagementModule
