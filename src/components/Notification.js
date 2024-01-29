import React, { useState, useEffect, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BiBell } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../config/Authentications/AuthContext";
import { userMenuContext } from "../navigation/PageRoutes";
import { recordErrorAPIdata } from "../service/useApiData";
import axios from "axios";

function Notification() {
  const { authState } = useContext(AuthContext)
  const { notificationData } = useContext(userMenuContext)
  let tenantCname = authState.tenant_cname
  const [notifys, setNotifys] = useState([]);
  const notice = notifys.filter((item) => item.status === "pending");
  const noticeCount = notice.length;
  let logData = [];
  let viewData = {};
  viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };

  useEffect(() => {
    if (notificationData) {
      setNotifys(notificationData)
    }
  })
  const noti_clear = (nid,cl_all) => {
    // var axios = require('axios');
    var data = '';

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}` + tenantCname + '/api/updatenotification?updateval={"status": "cleared"}&updateid=' + `${cl_all ? `[${nid}]` : nid}`,
      headers: {
        'Accept': 'application/json',
        'Authorization': "Bearer" + " " + localStorage.getItem('token')
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response !== undefined) {
          window.location.reload()
        }
        logData = [{...viewData, 'module_name': 'notification', 'api': `/${'updatenotification'}`, 'payload':{
          data,
        }, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      })
      .catch(function (error) {
        console.log(error);
        logData = [{...viewData, 'module_name': 'notification', 'api': `/${'updatenotification'}`, 'payload':{
          data,
        }, 'response':[], 'error_details': error, 'status_code':'' }];
        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
        }
      });
  }

  return (

    <Dropdown className="notification dropstart">
      <Dropdown.Toggle id="dropdown-basic">
        <i className="bell_icon">
          <BiBell />
          <div className="bell_num">{noticeCount}</div>
        </i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="notifi_list">
        <div className="notifi_list_head">
          <p>
            Notifications <span>({noticeCount})</span>
          </p>
        </div>
        <div className="notifi_body">
          {notifys.map((notify) => (
            <div
              className="noti_item_div"
              key={notify.notification_id}
            >
              <h5>{notify.notification_heading}</h5>
              <div className="notifi_msg_wrap">
                <div className="notifi_msg">
                  <p>
                    {notify.notification_details
                      .replace("<p>", "")
                      .replace("</p>", "")}
                  </p>
                </div>
                <span>
                  <button
                    type="button"
                    className="btn_cancel reset_button addmargin"
                    onClick={() => noti_clear(notify.notification_id)}
                  >
                    <MdDelete />
                  </button>
                </span>
              </div>
              <p className="notifi_time">20 Jan 2020, 16:40</p>
            </div>
          ))}
        </div>

        <div className="notifi_list_foot">
          <button
            className="crt_btn"
            type="button"
            onClick={() => noti_clear(notifys.map(e => e['notification_id']),true)}
          >
            Clear All Notifications
          </button>
        </div>
      </Dropdown.Menu>
    </Dropdown>

  );
}
export default Notification;