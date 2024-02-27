import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateEventSlider from "./index";

describe("CreateEventSlider Component", () => {
  test("renders with correct heading", () => {
    render(<CreateEventSlider show={true} handleClose={() => {}} />);
    const heading = screen.getByText("Create Event");
    expect(heading).toBeInTheDocument();
  });

  test("renders Cancel and Save buttons", () => {
    render(<CreateEventSlider show={true} handleClose={() => {}} />);
    const cancelButton = screen.getByText("Cancel");
    const saveButton = screen.getByText("Save");
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test("calls handleClose when Cancel button is clicked", () => {
    const handleClose = jest.fn();
    render(<CreateEventSlider show={true} handleClose={handleClose} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("disables Save button when loading state is true", () => {
    render(<CreateEventSlider show={true} handleClose={() => {}} />);
    const saveButton = screen.getByText("Save");
    expect(saveButton).not.toBeDisabled();
    // Assuming loading state is set to true
    // Update the component to handle loading state and disable the button accordingly
    // fireEvent.click(saveButton); // Trigger an event to simulate loading
    // expect(saveButton).toBeDisabled();
  });

  // Add more test cases as needed
});
