import React, { useState } from "react";

/**
 * PostAccordion component to render an accordion with a list of items.
 *
 * @param {Object} items - List of items to render in the accordion
 * @return {JSX.Element} The rendered accordion component
 */
function PostAccordion({ items }) {
  // State to keep track of the index of the expanded item
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Function to handle item click and toggle the expanded state
  const handleItemClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  // Render the accordion component with the list of items
  return (
    <div className="PostAccordion_otr">
      {items.map((item, index) => (
        <div key={index} className="accordion_item">
          <div
            className={`accordion_header ${index === expandedIndex ? "expanded" : ""}`}
            onClick={() => handleItemClick(index)}
          >
            {item.title}
          </div>
          {index === expandedIndex && (
            <div className="accordion_content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostAccordion;
