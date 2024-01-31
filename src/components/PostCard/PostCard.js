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
const calculatePercentage = (part, whole, arrowType) => {
    // Calculate the percentage value
    let percentValue = (part / whole * 100);

    // Round the percentage value and calculate the number of arrows
    let roundedValue = Math.round((percentValue / 100) * 16);

    // Define the arrow class and color based on the arrow type
    let arrowClass = '';
    let arrowColor = '';
    if (arrowType === 'red_arrow') {
        arrowClass = 'red_arrow_li';
        arrowColor = RedArrow;
    } else if (arrowType === 'yellow_arrow') {
        arrowClass = 'yellow_arrow_li';
        arrowColor = YellowArrow;
    } else if (arrowType === 'green_arrow') {
        arrowClass = 'green_arrow_li';
        arrowColor = GreenArrow;
    }

    // Create an array of arrow elements
    let loopedValue = [];
    for (let i = 0; i < roundedValue; i++) {
        loopedValue.push(
            <li className={arrowClass}>
                <img className='arrow_img' src={arrowColor} alt='icon' />
            </li>
        );
    }

    // Return the array of arrow elements
    return loopedValue;
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
            <div className='card_header' onClick={handleToggle}>
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
            <div className={`card_body ${isOpenByDefault ? 'card_body_visible' : ''}`}>
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
                                    {percentageText.replace("%","")}<small>%</small>
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
                                <p className='red_arrow_num arrow_num'>
                                    {taskRedNum}
                                </p>
                                <p className='yellow_arrow_num arrow_num'>
                                    {taskYellowNum}
                                </p>
                                <p className='green_arrow_num arrow_num'>
                                    {taskGreenNum}
                                </p>
                            </div>
                            <div className='task_arrow_inr'>
                                <ul className='red_arrow'>
                                    {calculatePercentage(taskRedNum, totalTaskNum, 'red_arrow')}
                                </ul>
                                <ul className='yellow_arrow'>
                                    {calculatePercentage(taskYellowNum, totalTaskNum, 'yellow_arrow')}
                                </ul>
                                <ul className='green_arrow'>

                                    {calculatePercentage(taskGreenNum, totalTaskNum, 'green_arrow')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='task_otr content_otr'>
                        <p className='task_text'>
                            <Link to={'/'}>Equipment</Link>
                        </p>
                        <div className='task_row'>
                            <div className='task_num_inr'>
                                <p className='red_arrow_num arrow_num'>
                                    {equipmentRedNum}
                                </p>
                                <p className='yellow_arrow_num arrow_num'>
                                    {equipmentYellowNum}
                                </p>
                                <p className='green_arrow_num arrow_num'>
                                    {equipmentGreenNum}
                                </p>
                            </div>
                            <div className='task_arrow_inr'>
                                <ul className='red_arrow'>
                                    {calculatePercentage(equipmentRedNum, totalEquipmentNum, 'red_arrow')}
                                </ul>
                                <ul className='yellow_arrow'>
                                    {calculatePercentage(equipmentYellowNum, totalEquipmentNum, 'yellow_arrow')}
                                </ul>
                                <ul className='green_arrow'>
                                    {calculatePercentage(equipmentGreenNum, totalEquipmentNum, 'green_arrow')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='task_otr content_otr'>
                        <p className='task_text'>
                            <Link to={'/'}>Inventory</Link>
                        </p>
                        <div className='task_row'>
                            <div className='task_num_inr'>
                                <p className='red_arrow_num arrow_num'>
                                    {inventoryRedNum}
                                </p>
                                <p className='yellow_arrow_num arrow_num'>
                                    {inventoryYellowNum}
                                </p>
                                <p className='green_arrow_num arrow_num'>
                                    {inventoryGreenNum}
                                </p>
                            </div>
                            <div className='task_arrow_inr'>
                                <ul className='red_arrow'>
                                    {calculatePercentage(inventoryRedNum, totalInventoryNum, 'red_arrow')}
                                </ul>
                                <ul className='yellow_arrow'>
                                    {calculatePercentage(inventoryYellowNum, totalInventoryNum, 'yellow_arrow')}
                                </ul>
                                <ul className='green_arrow'>
                                    {calculatePercentage(inventoryGreenNum, totalInventoryNum, 'green_arrow')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='task_otr content_otr'>
                        <p className='task_text'>
                            <Link to={'/'}>Staffing</Link>
                        </p>
                        <div className='task_row'>
                            <div className='task_num_inr'>
                                <p className='red_arrow_num arrow_num'>
                                    {staffingRedNum}
                                </p>
                                <p className='yellow_arrow_num arrow_num'>
                                    {staffingYellowNum}
                                </p>
                                <p className='green_arrow_num arrow_num'>
                                    {staffingGreenNum}
                                </p>
                            </div>
                            <div className='task_arrow_inr'>
                                <ul className='red_arrow'>
                                    {calculatePercentage(staffingRedNum, totalStaffingNum, 'red_arrow')}
                                </ul>
                                <ul className='yellow_arrow'>
                                    {calculatePercentage(staffingYellowNum, totalStaffingNum, 'yellow_arrow')}
                                </ul>
                                <ul className='green_arrow'>
                                    {calculatePercentage(staffingGreenNum, totalStaffingNum, 'green_arrow')}
                                </ul>
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
