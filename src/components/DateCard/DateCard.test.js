import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import DateCard from "./DateCard";

describe("DateCard Component", () => {
  it("renders DateText and DayText correctly", () => {
    const dateText = "2024-02-08";
    const dayText = "Monday";

    const { getByText } = render(
      <DateCard DateText={dateText} DayText={dayText} />,
    );

    const renderedDateText = getByText(dateText);
    const renderedDayText = getByText(dayText);

    expect(renderedDateText).toBeInTheDocument();
    expect(renderedDayText).toBeInTheDocument();
  });

  it("applies custom className correctly", () => {
    const customClassName = "custom-class";
    const { container } = render(
      <DateCard
        DateText="2024-02-08"
        DayText="Monday"
        className={customClassName}
      />,
    );

    const dateCardElement = container.querySelector(
      ".date_card_otr.custom-class",
    );

    expect(dateCardElement).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const dateText = "2024-02-08";
    const dayText = "Monday";
    const tree = renderer
      .create(<DateCard DateText={dateText} DayText={dayText} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
