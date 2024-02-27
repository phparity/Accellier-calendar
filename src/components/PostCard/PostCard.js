import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import LocationIcon from '../../assets/images/blue-location-icon.svg'
import TimeIcon from '../../assets/images/blue-time-icon.svg'
import RedArrow from '../../assets/images/red-arrow.svg'
import YellowArrow from '../../assets/images/yellow-arrow.svg'
import GreenArrow from '../../assets/images/green-arrow.svg'
import infoFilterIcon from '../../assets/images/filter-icon.svg'
import informationIcon from '../../assets/images/information.svg'
import cashRegister from '../../assets/images/cash-register-icon.svg'

import './PostCard.scss'

function PostCard({ PostListData }) {
    /**
     * Destructuring PostListData object for easier access to its properties
     */
    const {
        date, // Date of the post
        cardClass, // CSS class for the card
        isOpenArray, // Array indicating if the card is open or not
        cardHeading, // Heading text for the card
        dayTagText, // Text for the day tag
        TimeText, // Text for the time
        LocationText, // Text for the location
        profileImg, // URL for the profile image
        userLinkk, // Link to the user's profile
        userName, // Name of the user
        userPost, // User's post content
        infoIcon1, // Icon for additional information
        tooltipText1, // Tooltip text for additional information
        infoIcon2, // Icon for additional information
        tooltipText2, // Tooltip text for additional information
        percentageText, // Text for the percentage
        infoIcon3, // Icon for additional information
        tooltipText3, // Tooltip text for additional information
        taskRedNum, // Number of tasks in red status
        taskYellowNum, // Number of tasks in yellow status
        taskGreenNum, // Number of tasks in green status
        totalTaskNum, // Total number of tasks
        equipmentRedNum, // Number of equipment in red status
        equipmentYellowNum, // Number of equipment in yellow status
        equipmentGreenNum, // Number of equipment in green status
        totalEquipmentNum, // Total number of equipment
        inventoryRedNum, // Number of inventory items in red status
        inventoryYellowNum, // Number of inventory items in yellow status
        inventoryGreenNum, // Number of inventory items in green status
        totalInventoryNum, // Total number of inventory items
        staffingRedNum, // Number of staffing in red status
        staffingYellowNum, // Number of staffing in yellow status
        staffingGreenNum, // Number of staffing in green status
        totalStaffingNum, // Total number of staffing
        salesMoney, // Amount of sales money
        profitMoney, // Amount of profit money
    } = PostListData;

    // Define a state variable isOpenByDefault and a function setIsOpenByDefault to update it
    const [isOpenByDefault, setIsOpenByDefault] = useState(isOpenArray);
    /**
     * Toggles the isOpenByDefault state
     * @function
     */
    const handleToggle = () => {
        /**
         * Sets the isOpenByDefault state to the opposite value
         */
        setIsOpenByDefault(!isOpenByDefault);
    };

    /**
     * Calculates the percentage and returns a list of arrow elements based on the given parameters.
     * @param {number} part - The numerator value.
     * @param {number} whole - The denominator value.
     * @param {string} arrowType - The type of arrow.
     * @returns {Array<ReactElement>} - The list of arrow elements.
     */
    const calculatePercentage = (task, totalTasks) => {
        if (task < 0 || totalTasks <= 0) {
            return 0
        } 
        const percentage = (task / totalTasks) * 100;
        const roundedValue = Math.round(percentage * 10) / 10; // Round to one decimal place

        return roundedValue;
    }

    // Check if PostListData is falsy or an empty string
    if (!PostListData || PostListData === "") {
        // Return a div with the class "post_card_inr empty-post"
        return (
            <div className="post_card_inr empty-post">
                {/* You can customize the placeholder content or leave it empty */}
            </div>
        );
    }

    // Check if the cardClass includes 'multi_days'
    const isMultiDay = cardClass.includes('multi_days');
    return (
        <div className={`post_card_inr ${cardClass}`}>
            <div data-testid="card-header" className='card_header' onClick={handleToggle}>
                <div className='heading_tag'>
                    <h3 className='card_heading' title={cardHeading}>
                        <Link to={'/eventmanagement'}>
                            {cardHeading + date}
                        </Link>
                    </h3>
                    {isMultiDay && (
                        <div className='day_tag_otr'>
                            <p className='day_tag_text'>
                                {dayTagText}
                            </p>
                        </div>
                    )}
                </div>
                <div className='location_time'>
                    <div className='icon_text_otr'>
                        <img className='icon' src={TimeIcon} alt='icon' />
                        <p className='icon_text'>
                            {TimeText}
                        </p>
                    </div>
                    <div className='icon_text_otr location_text_otr'>
                        <img className='icon' src={LocationIcon} alt='icon' />
                        <p className='icon_text'>
                            {LocationText}
                        </p>
                    </div>
                </div>
            </div>
            <div data-testid="card-body" className={`card_body ${isOpenByDefault ? 'card_body_visible' : ''}`}>
                <div className='profile_otr'>
                    <img className='profile_img' src={profileImg} alt='img' />
                    <div className='profile_text'>
                        <p className='user_name'>
                            {userName}
                        </p>
                        <p className='user_post'>
                            {userPost}
                        </p>
                    </div>
                </div>
                <div className='info_icons_otr'>
                    <div className='info_icon_inr'>
                        <div className='icon_tooltip icon_tooltip1'>
                            <p className='tooltip_text'>
                                {tooltipText1}
                            </p>
                        </div>
                        <img className='icon_img' src={infoFilterIcon} alt='icon' />
                    </div>
                    <div className='info_icon_inr'>
                        <div className='icon_tooltip icon_tooltip2'>
                            <p className='tooltip_text'>
                                {tooltipText2}
                            </p>
                        </div>
                        {percentageText ? (
                            <div className='percentage_text_otr'>
                                <p className='percentage_text'>
                                    {percentageText.replace("%", "")}<small>%</small>
                                </p>
                            </div>
                        ) : (
                            <img className='icon_img' src={cashRegister} alt='icon' />
                        )}
                    </div>
                    <div className='info_icon_inr'>
                        <div className='icon_tooltip icon_tooltip3'>
                            <p className='tooltip_text'>
                                {tooltipText3}
                            </p>
                        </div>
                        <img className='icon_img' src={informationIcon} alt='icon' />
                    </div>
                </div>
                <div className='task_equipments_otr'>
                    <div className='task_otr content_otr'>
                        <p className='task_text'>
                            <Link to={'/eventmanagement'}>Tasks</Link>
                        </p>
                        <div className='task_row'>
                            <div className='task_num_inr'>
                                <p className='red_arrow_num arrow_num' style={{ width: `${calculatePercentage(taskRedNum, totalTaskNum)}%` }}>
                                    {taskRedNum}
                                </p>
                                <p className='yellow_arrow_num arrow_num' style={{ width: `${calculatePercentage(taskYellowNum, totalTaskNum)}%` }}>
                                    {taskYellowNum}
                                </p>
                                <p className='green_arrow_num arrow_num' style={{ width: `${calculatePercentage(taskGreenNum, totalTaskNum)}%` }}>
                                    {taskGreenNum}
                                </p>
                            </div>
                            <div className='task_arrow_inr'>
                                <div className="progress-bar-box">
                                    <div className="progress-bar-inner progress-bar-danger" style={{ width: `${calculatePercentage(taskRedNum, totalTaskNum)}%` }}>
                                    </div>

                                    <div className="progress-bar-inner progress-bar-warning" style={{ width: `${calculatePercentage(taskYellowNum, totalTaskNum)}%` }}>
                                    </div>
                                    <div className="progress-bar-inner progress-bar-success" style={{ width: `${calculatePercentage(taskGreenNum, totalTaskNum)}%` }}>
                                    </div>

                                </div>
                                {/* <ul className='red_arrow'>
                                    {calculatePercentage(taskRedNum, totalTaskNum, 'red_arrow')}
                                </ul>
                                <ul className='yellow_arrow'>
                                    {calculatePercentage(taskYellowNum, totalTaskNum, 'yellow_arrow')}
                                </ul>
                                <ul className='green_arrow'>

                                    {calculatePercentage(taskGreenNum, totalTaskNum, 'green_arrow')}
                                </ul> */}
                            </div>
                        </div>
                    </div>
                    <div className='task_otr content_otr'>
                        <p className='task_text'>
                            <Link to={'/'}>Equipment</Link>
                        </p>
                        <div className='task_row'>
                            <div className='task_num_inr'>
                                <p className='red_arrow_num arrow_num' style={{ width: `${calculatePercentage(equipmentRedNum, totalEquipmentNum)}%` }}>
                                    {equipmentRedNum}
                                </p>
                                <p className='yellow_arrow_num arrow_num' style={{ width: `${calculatePercentage(equipmentYellowNum, totalEquipmentNum)}%` }}>
                                    {equipmentYellowNum}
                                </p>
                                <p className='green_arrow_num arrow_num' style={{ width: `${calculatePercentage(equipmentGreenNum, totalEquipmentNum)}%` }}>
                                    {equipmentGreenNum}
                                </p>
                            </div>
                            <div className='task_arrow_inr'>
                                <div className="progress-bar-box">
                                    <div className="progress-bar-inner progress-bar-danger" style={{ width: `${calculatePercentage(equipmentRedNum, totalEquipmentNum)}%` }}>

                                    </div>

                                    <div className="progress-bar-inner progress-bar-warning" style={{ width: `${calculatePercentage(equipmentYellowNum, totalEquipmentNum)}%` }}>

                                    </div>
                                    <div className="progress-bar-inner progress-bar-success" style={{ width: `${calculatePercentage(equipmentGreenNum, totalEquipmentNum)}%` }}>

                                    </div>

                                </div>
                                {/* <ul className='red_arrow'>
                                    {calculatePercentage(equipmentRedNum, totalEquipmentNum, 'red_arrow')}
                                </ul>
                                <ul className='yellow_arrow'>
                                    {calculatePercentage(equipmentYellowNum, totalEquipmentNum, 'yellow_arrow')}
                                </ul>
                                <ul className='green_arrow'>
                                    {calculatePercentage(equipmentGreenNum, totalEquipmentNum, 'green_arrow')}
                                </ul> */}
                            </div>
                        </div>
                    </div>
                    <div className='task_otr content_otr'>
                        <p className='task_text'>
                            <Link to={'/'}>Inventory</Link>
                        </p>
                        <div className='task_row'>
                            <div className='task_num_inr'>
                                <p className='red_arrow_num arrow_num' style={{ width: `${calculatePercentage(inventoryRedNum, totalInventoryNum)}%` }}>
                                    {inventoryRedNum}
                                </p>
                                <p className='yellow_arrow_num arrow_num' style={{ width: `${calculatePercentage(inventoryYellowNum, totalInventoryNum)}%` }}>
                                    {inventoryYellowNum}
                                </p>
                                <p className='green_arrow_num arrow_num' style={{ width: `${calculatePercentage(inventoryGreenNum, totalInventoryNum)}%` }}>
                                    {inventoryGreenNum}
                                </p>
                            </div>
                            <div className='task_arrow_inr'>
                                <div className="progress-bar-box">
                                    <div className="progress-bar-inner progress-bar-danger" style={{ width: `${calculatePercentage(inventoryRedNum, totalInventoryNum)}%` }}>

                                    </div>

                                    <div className="progress-bar-inner progress-bar-warning" style={{ width: `${calculatePercentage(inventoryYellowNum, totalInventoryNum)}%` }}>

                                    </div>
                                    <div className="progress-bar-inner progress-bar-success" style={{ width: `${calculatePercentage(inventoryGreenNum, totalInventoryNum)}%` }}>

                                    </div>

                                </div>
                                {/*  <ul className='red_arrow'>
                                    {calculatePercentage(inventoryRedNum, totalInventoryNum, 'red_arrow')}
                                </ul>
                                <ul className='yellow_arrow'>
                                    {calculatePercentage(inventoryYellowNum, totalInventoryNum, 'yellow_arrow')}
                                </ul>
                                <ul className='green_arrow'>
                                    {calculatePercentage(inventoryGreenNum, totalInventoryNum, 'green_arrow')}
                                </ul> */}
                            </div>
                        </div>
                    </div>
                    <div className='task_otr content_otr'>
                        <p className='task_text'>
                            <Link to={'/'}>Staffing</Link>
                        </p>
                        <div className='task_row'>
                            <div className='task_num_inr'>
                                <p className='red_arrow_num arrow_num' style={{ width: `${calculatePercentage(staffingRedNum, totalStaffingNum)}%` }}>
                                    {staffingRedNum}
                                </p>
                                <p className='yellow_arrow_num arrow_num' style={{ width: `${calculatePercentage(staffingYellowNum, totalStaffingNum)}%` }}>
                                    {staffingYellowNum}
                                </p>
                                <p className='green_arrow_num arrow_num' style={{ width: `${calculatePercentage(staffingGreenNum, totalStaffingNum)}%` }}>
                                    {staffingGreenNum}
                                </p>
                            </div>
                            <div className='task_arrow_inr'>
                                <div className="progress-bar-box">
                                    <div className="progress-bar-inner progress-bar-danger" style={{ width: `${calculatePercentage(staffingRedNum, totalStaffingNum)}%` }}>

                                    </div>

                                    <div className="progress-bar-inner progress-bar-warning" style={{ width: `${calculatePercentage(staffingYellowNum, totalStaffingNum)}%` }}>

                                    </div>
                                    <div className="progress-bar-inner progress-bar-success" style={{ width: `${calculatePercentage(staffingGreenNum, totalStaffingNum)}%` }}>

                                    </div>

                                </div>
                                {/* <ul className='red_arrow'>
                                    {calculatePercentage(staffingRedNum, totalStaffingNum, 'red_arrow')}
                                </ul>
                                <ul className='yellow_arrow'>
                                    {calculatePercentage(staffingYellowNum, totalStaffingNum, 'yellow_arrow')}
                                </ul>
                                <ul className='green_arrow'>
                                    {calculatePercentage(staffingGreenNum, totalStaffingNum, 'green_arrow')}
                                </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sales_profit'>
                    <div className='forcast_otr'>
                        <p className='forcast_text'>
                            Forecast Sales
                        </p>
                        <p className='sales_money'>
                            {salesMoney}
                        </p>
                    </div>
                    <span className='line'></span>
                    <div className='forcast_otr'>
                        <p className='forcast_text'>
                            Forecast Sales
                        </p>
                        <p className='sales_money'>
                            {profitMoney}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard