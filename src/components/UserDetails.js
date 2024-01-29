import Dropdown from "react-bootstrap/Dropdown";
import React, { useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import {ProfileSvg } from "./SvgImages";
import {LogOutSvg } from "./SvgImages";
import Buttons from "./Buttons";
import { useContext } from "react";
import {AuthContext} from "../config/Authentications/AuthContext"
import { userMenuContext } from "../navigation/PageRoutes";
import useStorage from "../service/useStorage";

const UserDetails = (props)=> {
  const {clearData} = useStorage()
  const {authState,setAuthState} = useContext(AuthContext)
  const {setUsermenuData} = useContext(userMenuContext)
  const [userDetails, setUserDetails] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [navigate, setNavigate] = useState(false);

  let tkn = authState.token

  useEffect(() => {
    if (props.response) {
      setUserDetails(props.response.user_data);
      setFirstname(props.response.user_data.firstname[0]);
      setLastname(props.response.user_data.lastname[0]);

      setAuthState({...authState,
        "clanguage":props.response.user_data.username,
        "username": props.response.user_data.firstname + " " + props.response.user_data.lastname,
        "userid":props.response.user_data.userid,
        "roleid":props.response.user_data.roleid,
    });
    localStorage.setItem("userid",props.response.user_data.userid)
    sessionStorage.setItem("userid",props.response.user_data.userid)
    localStorage.setItem("username",props.response.user_data.firstname + " " + props.response.user_data.lastname)
    }
  }, [props.response]);

  useEffect(() => {
    if (tkn !== null) {
      const tkn2 = jwtDecode(tkn);
      if (Number(tkn2.exp) < Number(Date.now() / 1000)) {
        logout();
      }
    } else {
      logout();
    }
  }, [window.location.href]);

   const logout = () => {
    setUsermenuData('')
    setUserDetails('');
    setFirstname('');
    setLastname('');
    localStorage.clear() 
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('ipAddress');
    sessionStorage.clear();
    clearData()
    setAuthState({})
    setNavigate(true);
    window.location.href = "#/";
  };
  if (navigate) {
    window.location.href = "#/";
  }
  return (
  <div className="user_det">
      <div className="user_ini">
        {firstname.toUpperCase() +
          (lastname || "").toUpperCase().replace("&", "")}
      </div>
      <div className="user_email">
        <Dropdown>
          <Dropdown.Toggle
            className="email"
            variant="success"
            id="dropdown-basic"
          >
            <span>
              {userDetails.firstname}{" "}
              {(userDetails.lastname || "").replace("&nbsp;", "")}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Buttons type="button" class="logoutbutton">
              <i>{ProfileSvg}</i> &nbsp; Profile
            </Buttons>
            <Buttons
              type="button"
              onClick={logout}
              class="logoutbutton"
            >
              <i>
                {LogOutSvg}
              </i>
              &nbsp; Logout
            </Buttons>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
export default UserDetails;