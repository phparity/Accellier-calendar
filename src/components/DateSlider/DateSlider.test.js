import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateSlider from "./DateSlider";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

// Mock eventListData
const mockEventListData = [
  { id: 1, date: "2/8/2024" },
  { id: 2, date: "2/9/2024" },
  { id: 3, date: "2/10/2024" },
];

describe("DateSlider Component", () => {
  test("DateSlider renders properly and navigates correctly", () => {
    // Render the DateSlider component
    render(
      <Router>
        <DateSlider
          selectedDate={new Date("2024-02-08")}
          eventListData={mockEventListData}
        />
      </Router>,
    );

    // Check if date cards are rendered
    const dateCard = screen.getByTestId("date-card");
    expect(dateCard).toBeInTheDocument();

    // Check if post cards are rendered
    const postCard = screen.getByTestId("post-card");
    expect(postCard).toBeInTheDocument();

    // Check if left arrow is rendered
    const leftArrow = screen.getByTestId("left-arrow");
    expect(leftArrow).toBeInTheDocument();

    // Check if right arrow is rendered
    const rightArrow = screen.getByTestId("right-arrow");
    expect(rightArrow).toBeInTheDocument();

    // Simulate clicking on the left arrow
    fireEvent.click(leftArrow);

    // Simulate clicking on the right arrow
    fireEvent.click(rightArrow);
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Router>
          <DateSlider
            selectedDate={new Date("2024-02-08")}
            eventListData={mockEventListData}
          />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
