/* eslint-disable react/prop-types */

import "./SingleProfile.scss";
const SingleProfile = ({ profile, onChoose, selectedProfile }) => {
  const { imageUrl, name, position, id } = profile;
  const isSelected = selectedProfile.find((profileId) => profileId === id);

  console.log("🚀 ~ file: SingleProfile.jsx:8 ~ isSelected:", isSelected);

  return (
    <div className="profile-container">
      <div className="profile_card">
        <img src={imageUrl} alt="Profile Image" className="profile-image" />
        <div className="profile-info">
          <div className="profile-name">{name}</div>
          <div className="profile-position">{position}</div>
        </div>
      </div>

      <button onClick={() => onChoose(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M8.10303 9.64044L10.5901 12.1275L18.8802 3.83734"
            stroke={isSelected ? "#4E73DF" : "#ACACAC"}
            strokeWidth="1.32642"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.0512 10.4694V16.2725C18.0512 16.7122 17.8765 17.1339 17.5655 17.4449C17.2546 17.7558 16.8329 17.9305 16.3931 17.9305H4.78694C4.3472 17.9305 3.92547 17.7558 3.61453 17.4449C3.30359 17.1339 3.12891 16.7122 3.12891 16.2725V4.66627C3.12891 4.22653 3.30359 3.80481 3.61453 3.49387C3.92547 3.18292 4.3472 3.00824 4.78694 3.00824H13.9061"
            stroke={isSelected ? "#4E73DF" : "#ACACAC"}
            strokeWidth="1.32642"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default SingleProfile;
