import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; // Import BrowserRouter as Router for routing-related components
import PostCard from "./PostCard"; // Import the component to be tested

// Mock the props for the component
const mockPostListData = {
  date: "2024-02-08",
  cardClass: "test-class",
  cardHeading: "International Music Concert ",
  isOpenArray: true,
};

// Define a test suite for the PostCard component
describe("PostCard component", () => {
  // Define a test case for rendering the component properly
  test("renders with correct content", () => {
    // Render the component with mock props
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <PostCard PostListData={mockPostListData} />
      </MemoryRouter>,
    );

    // Assert that the card header is rendered with the correct text
    expect(
      getByText(/International Music Concert 2024-02-08/),
    ).toBeInTheDocument();

    // Assert that location and time icons are rendered
    expect(getByAltText(/time-icon/)).toBeInTheDocument();
  });

  // Define a test case for toggling the card body visibility
  test("toggles card body visibility on click", () => {
    // Render the component with mock props
    const { getByTestId } = render(
      <MemoryRouter>
        <PostCard PostListData={mockPostListData} />
      </MemoryRouter>,
    );

    // Click on the card header to toggle the visibility
    fireEvent.click(getByTestId("card-header"));

    // Assert that the card body is now visible
    expect(getByTestId("card-body")).toHaveClass("card_body");
  });

  // test('renders correctly', () => {
  //   const tree = renderer
  //     .create(<PostCard PostListData={mockPostListData} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
