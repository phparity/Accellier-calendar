import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterUserEvent from './index';

describe('FilterUserEvent Component', () => {
  const handleFilterCloseButton = jest.fn();
  const handleFilterSelection = jest.fn();
  const handleEventFilteredData = jest.fn();

  const filterValue = [
    {
      id: 1,
      profileImg: 'profile-img1.png',
      userName: 'User1',
      userPost: 'Post1',
      isFilter: false
    },
    {
      id: 2,
      profileImg: 'profile-img2.png',
      userName: 'User2',
      userPost: 'Post2',
      isFilter: true
    }
  ];

  test('renders dropdown items with correct data', () => {
    const { getByText } = render(
      <FilterUserEvent
        handleFilterCloseButton={handleFilterCloseButton}
        filterValue={filterValue}
        handleFilterSelection={handleFilterSelection}
        handleEventFilteredData={handleEventFilteredData}
      />
    );

    // Check if dropdown items are rendered with correct user names
    expect(getByText('User1')).toBeInTheDocument();
    expect(getByText('User2')).toBeInTheDocument();

    // Ensure the checkboxes are rendered correctly based on isFilter property
    expect(getByText('User1').nextElementSibling.querySelector('img')).toHaveAttribute('src', 'BlankCheckIcon.svg');
    expect(getByText('User2').nextElementSibling.querySelector('img')).toHaveAttribute('src', 'checkIcon.svg');
  });

  test('calls handleFilterSelection when dropdown item is clicked', () => {
    const { getByText } = render(
      <FilterUserEvent
        handleFilterCloseButton={handleFilterCloseButton}
        filterValue={filterValue}
        handleFilterSelection={handleFilterSelection}
        handleEventFilteredData={handleEventFilteredData}
      />
    );

    fireEvent.click(getByText('User1'));
    fireEvent.click(getByText('User2'));

    // Ensure handleFilterSelection is called with the correct arguments
    expect(handleFilterSelection).toHaveBeenCalledWith(filterValue[0], 0);
    expect(handleFilterSelection).toHaveBeenCalledWith(filterValue[1], 1);
  });

  test('calls handleFilterCloseButton when cancel button is clicked', () => {
    const { queryByText } = render(
      <FilterUserEvent
        handleFilterCloseButton={handleFilterCloseButton}
        filterValue={filterValue}
        handleFilterSelection={handleFilterSelection}
        handleEventFilteredData={handleEventFilteredData}
      />
    );

    fireEvent.click(queryByText('Cancel'));

    // Ensure handleFilterCloseButton is called
    expect(handleFilterCloseButton).toHaveBeenCalled();
  });

  test('calls handleEventFilteredData when done button is clicked', () => {
    const { getByText } = render(
      <FilterUserEvent
        handleFilterCloseButton={handleFilterCloseButton}
        filterValue={filterValue}
        handleFilterSelection={handleFilterSelection}
        handleEventFilteredData={handleEventFilteredData}
      />
    );
    const dropdownButton = getByText('Done');
    fireEvent.click(dropdownButton); 

    // Ensure handleEventFilteredData is called
    expect(handleEventFilteredData).toHaveBeenCalled();
  });
});
