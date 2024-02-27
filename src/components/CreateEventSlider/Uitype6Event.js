import React, { useContext, useState, useEffect } from "react";
import { opCreatePageData, r_value } from "../../navigation/PageRoutes";
import { CheckModuleName } from "../../utils/CheckModuleName";
import SearchIconModal from "../SearchIconModal";
import "../../assets/style/CustomerList.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Trans } from "react-i18next";
import axios from "../../config/Axios";
import { AuthContext } from "../../config/Authentications/AuthContext";
import { LISTVIEWAPI } from "../../service/ApiPath";
import useStorage from "../../service/useStorage";
import { recordErrorAPIdata } from "../../service/useApiData";
import useGetReq from "../../service/useGetReq";

function Uitype6Event(props) {
  const [getData] = useGetReq();
  let { blocke } = useContext(r_value);
  const { acc, add, relatedTo, changeHandle } = props;
  // console.log(relatedTo, "relatedTo");
  const { setAdd, setCountry, addForMulti } = useContext(opCreatePageData);
  let module_name = CheckModuleName();
  const storage = useStorage();
  const { authState, setAuthState } = useContext(AuthContext);
  const tenantCname = authState.tenant_cname;

  const [table_header, setTable_header] = useState([]);
  const [table_d, setTable_d] = useState([]);
  let [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(null);
  let logData = [];
  let viewData = {};
  viewData = {
    view_name: sessionStorage.getItem("vwname"),
    company_id: localStorage.getItem("companyId"),
    user_id: localStorage.getItem("userid"),
    user_ip: sessionStorage.getItem("ipAddress"),
  };
  let related_module = localStorage.getItem("relatedmodule");
  if (module_name == undefined) {
    module_name = related_module;
  }

  let fieldName = "";
  let uiType = "";
  blocke &&
    Object.keys(blocke).map((k) => {
      blocke[k].map((acc) => {
        fieldName = acc.fieldname;
        uiType = acc.uitype;
        if (uiType == 14) {
          addForMulti[fieldName] = "test Steirn";
        }
      });
    });

  useEffect(() => {
    acc.relatedto[0] &&
      getData(
        LISTVIEWAPI(tenantCname),
        (data) => setTable_header(data.fields),
        (err) => setLoading(err.message),
        { params: { module: acc.relatedto[0] } },
        storage,
      );

    acc.relatedto[0] &&
      axios
        .get("/" + tenantCname + "/api/" + acc.relatedto[0], {
          headers: {
            Accept: "application/JSON",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            order: [acc.relatedto[0] + "_name"] + ":" + "asc",
            ipp: 100,
          },
        })
        .then((res) => {
          console.log("d3");
          setTable_d(res?.data.data);
          if (props?.isPrefill) {
            props.setListingMDN(res?.data?.listing_module_name);
          }
          // console.log(res?.data.data, "res.data")
          setReset(false);
          logData = [
            {
              ...viewData,
              module_name: module_name,
              api: `/${acc.relatedto[0]}`,
              payload: {
                order: [acc.relatedto[0] + "_name"] + ":" + "asc",
                ipp: 100,
              },
              response: res.data,
              status_code: res.status,
              error_details: "",
            },
          ];
          if (
            Number(process.env.REACT_APP_DEBUG_MODE) === 1 ||
            Number(sessionStorage.getItem("debugMode")) === 1
          ) {
            recordErrorAPIdata(
              localStorage.getItem("tenant_cname"),
              ...logData,
            );
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(err.message);
          logData = [
            {
              ...viewData,
              module_name: module_name,
              api: `/${acc.relatedto[0]}`,
              payload: {
                order: [acc.relatedto[0] + "_name"] + ":" + "asc",
                ipp: 100,
              },
              response: [],
              error_details: err,
              status_code: "",
            },
          ];
          if (
            Number(process.env.REACT_APP_DEBUG_MODE) === 1 ||
            Number(sessionStorage.getItem("debugMode")) === 1
          ) {
            recordErrorAPIdata(
              localStorage.getItem("tenant_cname"),
              ...logData,
            );
          }
        });
  }, [reset, acc.relatedto[0]]);

  useEffect(() => {
    console.log(table_header, "tableHead");
  }, [table_header]);

  const getOptionValue = (add, acc) => {
    return (table_d || []).map(
      (option) =>
        table_header &&
        table_header.map(
          (head, i) => (
            console.log(option, head, "head"),
            (
              <option key={i} defaultValue={add[acc.fieldname]}>
                {option[head.fieldname]}
              </option>
            )
          ),
        ),
    );
  };

  return (
    <select
      name={acc.fieldname}
      defaultValue={add[acc.venue_name]}
      onChange={(event) => changeHandle(event.target)}
    >
      <option hidden>{add[acc.fieldname]}</option>
      {getOptionValue(add, acc)}
    </select>
  );
}

export default Uitype6Event;
