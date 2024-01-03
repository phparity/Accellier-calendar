/* eslint-disable react/prop-types */

import { useState } from "react";
import SingleProfile from "../profile/SingleProfile";

import ProfileIcon from "../../../public/images/profile-icon.svg";
import ProfilePic from "../../../public/images/profile-img2.png";

import "./ChooseProfile.scss";

function ChooseProfile() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState([]);

  const profiles = [
    {
      id: 1,
      name: "John Doe",
      position: "event manager",
      imageUrl: ProfilePic,
    },
    {
      id: 2,
      name: "John Doe",
      position: "event manager",
      imageUrl: ProfilePic,
    },
    {
      id: 3,
      name: "John Doe",
      position: "event manager",
      imageUrl: ProfilePic,
    },
    {
      id: 4,
      name: "John Doe",
      position: "event manager",
      imageUrl: ProfilePic,
    },
  ];
  const handleChoose = (id) => {
    const index = selectedProfile.findIndex((profileId) => profileId === id);

    if (index !== -1) {
      const newSelectedProfile = [...selectedProfile];
      newSelectedProfile.splice(index, 1);
      setSelectedProfile(newSelectedProfile);
      return;
    }
    setSelectedProfile([...selectedProfile, id]);
  };

  const handleDoneClick = () => {
    console.log(selectedProfile);
    setOpenModal(false);
  };
  return (
    <div className=" choose_profile">
      <button onClick={() => setOpenModal(true)} className="icon_otr">
        <img className="user_icon" src={ProfileIcon} alt="icon" />
      </button>
      {openModal && (
        <div className="profile_container ">
          {profiles.map((profile, i) => (
            <div key={i} className="profile-modal w-52 ">
              {/* Render the Profile component with additional information */}
              <SingleProfile
                profile={profile}
                onChoose={handleChoose}
                selectedProfile={selectedProfile}
              />
            </div>
          ))}
          <div className="profile_button">
            <button onClick={() => setOpenModal(false)} className="cancel_btn ">
              Cancel
            </button>
            <button onClick={handleDoneClick} className="theme_btn">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChooseProfile;
