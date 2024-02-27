import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DatePickerComponent from "./DatePickerComponent";
import PropTypes from 'prop-types';

const mockSetTodaysDate = jest.fn();

// Define prop types for the component
DatePickerComponent.propTypes = {
  selected: PropTypes.any,
  onChange: PropTypes.func,
  placeholderText: PropTypes.string
};

jest.mock("react-datepicker", () => {
  // Mocking DatePicker component
  const DatePicker = ({ selected, onChange, placeholderText }) => {
    return (
      <input
        type="text"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholderText}
      />
    );
  };
  return DatePicker;
});

describe("DatePickerComponent", () => {
  it("DatePickerComponent renders properly and changes date correctly", () => {
    const placeholderText = "Select a date";
    const setTodaysDateMock = jest.fn();

    const { getByPlaceholderText } = render(
      <DatePickerComponent
        setTodaysDate={setTodaysDateMock}
        placeholder={placeholderText}
      />,
    );

    // Check if the component renders with the correct placeholder text
    const datePickerInput = getByPlaceholderText(placeholderText);
    expect(datePickerInput).toBeInTheDocument();

    // Simulate a date change
    const newDate = "2024-02-08";
    fireEvent.change(datePickerInput, { target: { value: newDate } });

    // Check if the setTodaysDate function is called with the correct date
    expect(setTodaysDateMock).toHaveBeenCalledWith(newDate);
  });

  it("renders with placeholder text", () => {
    const placeholderText = "Select a date";
    const { getByPlaceholderText } = render(
      <DatePickerComponent
        setTodaysDate={mockSetTodaysDate}
        placeholder={placeholderText}
      />,
    );

    const datePickerInput = getByPlaceholderText(placeholderText);
    expect(datePickerInput).toBeInTheDocument();
  });

  it("calls setTodaysDate function with selected date on change", () => {
    const placeholderText = "Select a date";
    const { getByPlaceholderText } = render(
      <DatePickerComponent
        setTodaysDate={mockSetTodaysDate}
        placeholder={placeholderText}
      />,
    );
    const newDate = "2024-02-08";

    const datePickerInput = getByPlaceholderText(placeholderText);
    fireEvent.change(datePickerInput, { target: { value: newDate } });

    expect(mockSetTodaysDate).toHaveBeenCalledWith(newDate);
  });
});
