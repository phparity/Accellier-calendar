import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import ThemeButton from "./ThemeButton";

test("ThemeButton renders properly and calls onClick function when clicked", () => {
  const mockOnClick = jest.fn();

  const { getByText } = render(
    <ThemeButton
      buttonClass="test-class"
      buttonText="Click Me"
      onClick={mockOnClick}
    />,
  );

  const button = getByText("Click Me");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(mockOnClick).toHaveBeenCalled();
});

describe("Theme button Component", () => {
  it("renders correctly", () => {
    const mockOnClick = jest.fn();
    const tree = renderer
      .create(
        <ThemeButton
          buttonClass="test-class"
          buttonText="Click Me"
          onClick={mockOnClick}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
