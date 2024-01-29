import React, { useState, useEffect, useContext, createContext } from "react";
import "../assets/style/Header.css";
import { Link } from "react-router-dom";
import acc_tab_img from "../assets/images/acc_tab_img.png";
import { GiHamburgerMenu } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import i18n from "../config/i18n"
import MenuBar from "../components/HeaderComponents/MenuBar";
import GlobalSearchBar from "../components/HeaderComponents/GlobalSearchBar";
import Notification from "../components/Notification";
import UserDetails from "../components/UserDetails";
import { AuthContext } from "../config/Authentications/AuthContext";
import { userMenuContext } from "../../src/navigation/PageRoutes"

export const contextValue = createContext();

function Header(props) {

  const { authState } = useContext(AuthContext)
  const { userMenuData } = useContext(userMenuContext)
  const [menuShow, setMenuShow] = useState(false);

  const handleShow = () => {
    setMenuShow(true);
  };

  const lang = authState.language;

  if (lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <contextValue.Provider value={{ menuShow, setMenuShow }}>
      <>
        <div className="header_pos col-12">
          <div className="container-fluid" id="containerFluid">
            <div className="row">
              <nav className="navbar navbar-expand-lg my_nav col-lg-12">
                <i className="menu_bar_icon" onClick={handleShow}>
                  <GiHamburgerMenu />
                </i>
                <div
                  className="acc_tab_img_H"
                 >
                  <Link target='_self' to="/home/">
                    <img src={acc_tab_img} alt="acc_tab_img_H" />
                  </Link>
                </div>
                <GlobalSearchBar />
                <Notification />
                <UserDetails response={userMenuData} />
              </nav>
            </div>
            {menuShow && <MenuBar data1={userMenuData} />}
          </div>
        </div>
      </>
    </contextValue.Provider>
  );
}

export default Header;
