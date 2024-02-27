import React from "react";

import "./ThemeButton.scss";

/**
 * Renders a themed button with the specified class and text, and handles the onClick event.
 *
 * @param {string} buttonClass - The class for styling the button.
 * @param {string} buttonText - The text to display on the button.
 * @param {function} onClick - The function to be called when the button is clicked.
 * @return {JSX.Element} The themed button component.
 */
function ThemeButton({ buttonClass, buttonText, onClick }) {
  // Create a themed button with the specified class and text
  return (
    <button onClick={onClick} className={`theme_btn ${buttonClass}`}>
      {buttonText}
    </button>
  );
}

export default ThemeButton;
