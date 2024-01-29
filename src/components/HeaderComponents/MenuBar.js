import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, Navigate, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Trans } from "react-i18next";
import { contextValue } from "../../layouts/Header";
import "react-toastify/dist/ReactToastify.css";
import useGetReq from "../../service/useGetReq";
import { MenuIcons } from "../MenuIcons";
import { AuthContext } from "../../config/Authentications/AuthContext";
import { USERMENUAPI } from "../../service/ApiPath";
import useStorage from "../../service/useStorage";

const MenuBar = ({data1}) => {
  const storage = useStorage();
  const {authState,setAuthState} = useContext(AuthContext)
  let tenantCname = authState.tenant_cname
  const [menuData, setMenuData] = useState([]);
  const [isClicked, setIsClicked] = useState("");
  const [isClicked2, setIsClicked2] = useState("");
  const [getData] = useGetReq();
  const { menuShow, setMenuShow } = useContext(contextValue);

  useEffect(() => {
    if (data1) {
      setMenuData(data1.menu_data)
    };
  }, [data1]);

  
  const [main_menu_icons] = MenuIcons();


  for (var i = 0; i < menuData.length; i++) {
    menuData[i].menu_icon = main_menu_icons[i].icr;
  }
  const handleClose = (mn, mi) => {
    setMenuShow(false);
    localStorage.setItem('onClickMenuModule',localStorage.getItem("prev_module_name"))

  };
  return (
    <>
    {  data1&&<Modal
        show={menuShow}
        onHide={handleClose}
        className="menu_modal"
        autoFocus={false}
        style={{zIndex:2000}}
      >
        <Modal.Body>
          <div className="triangle"></div>
          <ul className="nav-menu-items p-0">
            <div className="navbar-toggle">
              <p>MENU</p>
              <Link target='_self' to="#" className="menu-bars"></Link>
            </div>
            {menuData.map((post, j) => (
              <Dropdown
                key={j}
                defaultShow={isClicked == post.menu_name ? true : false}
                className={
                  isClicked == post.menu_name ? "act_menu myshow" : "act_menu"
                }
                onClick={() => setIsClicked(post.menu_name)}
              >
                {post.sublinks === undefined
                  ? <Dropdown.Toggle
                    className={
                      post.sublinks === undefined
                        ? "removewap menu_btn_1"
                        : "menu_btn_1"
                    }
                    id="dropdown-basic1"

                    href={(post.menu_link)}
                    onClick={() => {
                      handleClose()
                    }}
                  >
                    {post.menu_icon} {post.menu_name}
                  </Dropdown.Toggle> :
                  <Dropdown.Toggle
                    className={
                      post.sublinks === undefined
                        ? "removewap menu_btn_1 dropdownBtn"
                        : "menu_btn_1 dropdownBtn"
                    }
                    id="dropdown-basic"
                  >
                    {post.menu_icon} {post.menu_name}
                  </Dropdown.Toggle>
                }
                {typeof post.sublinks == "object" ? (
                  <Dropdown.Menu className="menu_btn">
                    {post.sublinks.map((item, i) => (
                      <Dropdown.Item
                        onClick={() => {
                          handleClose(post.menu_name, item.menu_name)
                        }
                        }
                        style={
                          isClicked2 == item.menu_name
                            ? { color: "blue" }
                            : null
                        }
                        key={item.menuid}
                        href={(item.menu_link)}
                      >
                        <Trans>{item.menu_name}</Trans>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                ) : null}
              </Dropdown>
            ))}
          </ul>
        </Modal.Body>
      </Modal>}
    </>
  );
};

export default MenuBar;
