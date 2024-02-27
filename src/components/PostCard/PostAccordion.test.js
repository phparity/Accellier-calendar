import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import PostAccordion from "./PostAccordion";

const items = [
  { title: "Title 1", content: "Content 1" },
  { title: "Title 2", content: "Content 2" },
  { title: "Title 3", content: "Content 3" },
];

test("PostAccordion renders properly and expands/collapses items correctly", () => {
  const { getByText, queryByText } = render(<PostAccordion items={items} />);

  items.forEach((item) => {
    expect(queryByText(item.title)).toBeInTheDocument();
    expect(queryByText(item.content)).not.toBeInTheDocument();
  });

  items.forEach((item, index) => {
    const header = getByText(item.title);
    fireEvent.click(header);

    expect(queryByText(item.content)).toBeInTheDocument();

    items
      .filter((_, i) => i !== index)
      .forEach((otherItem) => {
        expect(queryByText(otherItem.content)).not.toBeInTheDocument();
      });

    fireEvent.click(header);
    expect(queryByText(item.content)).not.toBeInTheDocument();
  });
});

describe("Post Accordion Component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<PostAccordion items={items} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
