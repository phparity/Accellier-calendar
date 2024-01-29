import React, { Fragment } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import ProfileImg from '../../assets/images/profile-img2.png';
import BlankCheckIcon from '../../assets/images/blankCheckIcon.svg';
import CheckIcon from '../../assets/images/checkIcon.svg';
import './FilterUserEvent.scss';
import { Trans } from 'react-i18next';
/**
 * Function to filter and render user events based on the given props.
 *
 * @param {object} props - The props object containing handleFilterCloseButton, filterValue, handleFilterSelection, and handleEventFilteredData
 * @return {JSX.Element} The filtered and rendered user events
 */
const FilterUserEvent = (props) => {
    // Destructuring props to extract specific values
    const { handleFilterCloseButton, filterValue, handleFilterSelection, handleEventFilteredData } = props;
    return (
        <Fragment>
            {/* Dropdown menu for filtering user events */}
            <Dropdown.Menu>
                <div className='filterMenu_wrap'>
                    {
                        // Mapping through filterValue array to render dropdown items
                        filterValue?.map((item, i) => {
                            return (
                                <Dropdown.Item key={item?.id} as="button" onClick={() => handleFilterSelection(item, i)}>
                                    {/* User profile information */}
                                    <div className='profile_otr'>
                                        <div className='profile_box'>
                                            <img className='profile_img' src={item?.profileImg} alt='img' />
                                            <div className='profile_text'>
                                                <p className='user_name'>
                                                    {item?.userName}
                                                </p>
                                                <p className='user_post'>
                                                    {item?.userPost}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Checkbox for filtering */}
                                        <div className='checkbox_wrap'>
                                            <img className={`checkIcon`} src={item?.isFilter ? CheckIcon : BlankCheckIcon} alt='img' />
                                        </div>
                                    </div>
                                </Dropdown.Item>
                            )
                        })
                    }
                </div>
                {/* Button group for cancel and save actions */}
                <div className='btn-grp event_action_btn'>
                    <Button className='btn cancel_btn' onClick={handleFilterCloseButton}>
                        <Trans>Cancel</Trans>
                    </Button>
                    <Button className='btn save_btn' onClick={(e) => handleEventFilteredData(e)}>
                        <Trans>Done</Trans>
                    </Button>
                </div>
            </Dropdown.Menu>
        </Fragment>
    )
}
export default FilterUserEvent;