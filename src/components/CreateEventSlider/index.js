import { Drawer } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../../config/i18n";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoMdClose } from "react-icons/io";
import "./style.scss";
import { Trans } from "react-i18next";
import useStorage from "../../service/useStorage";
import { AuthContext } from "../../config/Authentications/AuthContext";
import {
  groupCheck,
  linee_value,
  opCreatePageData,
  r_value,
  searchTableModuleValue,
} from "../../navigation/PageRoutes";
import { useNavigate } from "react-router-dom";
import {
  allUserListApi,
  editapi,
  for_updating_calculation,
  getDuplicateApiData,
  getEditApiData,
  getFieldDataApiData,
  getFieldsApiData,
  getRelatedModuleApiData,
  multiedit_api_forall_module,
  op_and_payroll_editapi,
  postapi,
  put_api_forall_module,
  soreceipt_module_post_api,
} from "../../service/useApiData";
import { CheckModuleName } from "../../utils/CheckModuleName";
import { Button, Modal } from "react-bootstrap";
import { FIELDSAPI } from "../../service/ApiPath";
import useGetReq from "../../service/useGetReq";
import LeavePageWarning from "../LeavePageWarning";
import ShowErrorMsg from "../ShowErrorMsg";
import LineDeleteModal from "../LineDeleteModal";
import Uitype11 from "../UitypeComponents/Uitype11";
import RadioButtons from "../UitypeComponents/RadioButtons";
import Uitype6 from "../UitypeComponents/Uitype6";
import Uitype14 from "../UitypeComponents/Uitype14";
import Uitype102 from "../UitypeComponents/Uitype102";
import Uitype7 from "../UitypeComponents/Uitype7";
import Uitype8 from "../UitypeComponents/Uitype8";
import Uitype9 from "../UitypeComponents/Uitype9";
import Uitype100 from "../UitypeComponents/Uitype100";
import Uitype101 from "../UitypeComponents/Uitype101";
import Uitype3 from "../UitypeComponents/Uitype3";
import ForSalutation from "../UitypeComponents/ForSalutation";
import Checkbox from "../UitypeComponents/Checkbox";
import ShowUserList from "../ShowUserList";
import EditAccountModal from "../Modal/EditAccountModal";
import Buttons from "../Buttons";
import CreateRecordTime from "../CreateRecordTime";
import SupplierorderReceiptLines from "../SupplierorderReceiptLines";
import Uitype2 from "../UitypeComponents/Uitype2";
import RelatedListForCreateRecord from "../RelatedListForCreateRecord";
import BackToLinks from "../UitypeComponents/BackToLinks";
import Uitype103 from "../UitypeComponents/Uitype103";
import TextField from "../UitypeComponents/TextField";
import FieldData from "../UitypeComponents/FieldData";
import Moment from "moment";
import { usePayload } from "../../service/usePayload";
import CurrencyInput from "react-currency-input-field";
import { VscCalendar } from "react-icons/vsc";
import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  Datepicker,
} from "@mobiscroll/react";
import { MdAccessTime } from "react-icons/md";
import Uitype6Event from "./Uitype6Event";
export const blocke_value = createContext();

/**
 * CreateEventSlider function.
 *
 * @param {object} props - the props object containing show and handleClose properties
 * @return {JSX.Element} the Offcanvas component
 */
const CreateEventSlider = (props) => {
  // Destructure show and handleClose from props
  const { show, handleClose } = props;
  const storage = useStorage();
  const [apiPathData, setapiPathData] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const tenantCname = authState.tenant_cname;
  const {
    add,
    setAdd,
    addForMulti,
    setAddForMulti,
    setDep_dropdown_value,
    country,
    setCountry,
    salutation,
    setSalutation,
  } = useContext(opCreatePageData);
  const { line, setLine } = useContext(linee_value);
  const {
    searchTableModule,
    searchRelatedTo,
    setSearchRelatedTo,
    uitype_module,
    setUitype_module,
    smShowError,
    setSmShowError,
    error_msg,
    setError_msg,
  } = useContext(searchTableModuleValue);
  let {
    row_value,
    setRow_value,
    product_Table,
    setProduct_Table,
    blocke,
    setBlocke,
    related_record,
    setRelated_record,
    uitype6_value,
    setuitype6_value,
    add_forName,
    setAdd_forName,
  } = useContext(r_value);
  const { supplierorder_num, setSupplierOrder_num } = useContext(groupCheck);
  const [show2, setShow2] = useState(false);
  const [show4, setShow4] = useState(false);
  const [showUserlist, setShowUserlist] = useState(false);
  const [rlist, setRlist] = useState([]);
  let [mand_error, setMand_error] = useState("");
  const [autofillnumm, setAutofillnumm] = useState("");
  let [selectedUserList, setSelectedUserList] = useState([
    localStorage.getItem("userid"),
  ]);
  const [userListState, setUserListState] = useState([]);
  const [progres_value, setProgres_value] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [warehouse_multiple_record, setWarehouse_multiple_record] =
    useState("");
  const [isreadonly, setIsreadonly] = useState(false);
  const [loading, setLoading] = useState(null); // to show error
  let [linee, setLinee] = useState([]);
  const [lineDeleteId, setLineDeleteId] = useState({});
  const [groupName, setGroupName] = useState([]);
  // const [supplierorder_num, setSupplierOrder_num] = useState("")
  const [show9, setShow9] = useState(false);
  const [show10, setShow10] = useState(false);
  const [smShow2, setSmShow2] = useState(false);
  let [linearray, setLinearray] = useState([]);
  const [amount, setAmount] = useState("");
  let [rajya, setRajya] = useState({});
  const [relatedModuleName, setRelatedModuleName] = useState("");
  const [rediLinkRel, setRediLinkRel] = useState("");
  const [smLeaveEditWarn, setSmLeaveEditWarn] = useState(false);
  const [parent, setParent] = useState("");
  const relatedPopUp = props.relatedPopUp;
  const main_module = localStorage.getItem("prev_module_name");
  let related_module = localStorage.getItem("relatedmodule");
  const [multiField, setMultiField] = useState(2);
  const lang = localStorage.getItem("language");
  if (lang) {
    i18n.changeLanguage(lang);
  }
  const [isEmailValid, setIsEmailValid] = useState(true);
  let navigate = useNavigate();
  const handleClose4 = () => setShow4(false);
  const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  let module_name = "event";

  let selectedFlatRows = authState.selectedFlatRows;
  let selectedFlatRowsmy = selectedFlatRows && JSON.parse(selectedFlatRows);
  // let selectedFlatRowsmy = selectedFlatRows
  const customerDetailsss = authState.customerDetails;
  const customerDetails = customerDetailsss && JSON.parse(customerDetailsss);

  useEffect(() => {
    (async () => {
      if (
        module_name &&
        (module_name != "calendar" || related_module == "calendar")
      ) {
        const data = await getFieldsApiData(tenantCname, module_name, storage);
        if (data) {
          setBlocke(data.block);
          setRlist(data.related);
        }
        // else {
        //     setLoading(err.message)
        // }
      }
    })();
  }, [module_name]);

  useEffect(() => {
    // when we create record or duplicate
    (async () => {
      if (!e_id) {
        const data = await getFieldDataApiData(tenantCname, module_name);
        if (data) {
          setAutofillnumm(data[0]);

          setAdd({ ...add, [module_name + "_num"]: data[0] });
          setAdd_forName({ ...add_forName, [module_name + "_num"]: data[0] });

          if (props.module_name === null || props.module_name === undefined) {
            if (
              (customerDetails === null || e_id === null) &&
              selectedFlatRowsmy.length < 1
            ) {
              setAdd({ ...add, [module_name + "_num"]: data[0] });
            } else if (props.apiForOpPayModal === "true") {
              setAdd({ ...add, [module_name + "_num"]: data[0] });
            }
          } else {
            setAdd({ ...add, [module_name + "_num"]: data[0] });
          }

          if (
            add[module_name + "_id"] == null &&
            selectedFlatRowsmy &&
            selectedFlatRowsmy.length < 1
          ) {
            add.assign_to = authState.username;
          }
        }
        // else {
        //     setLoading(err.message)
        // }
      }
    })();
  }, []);

  let e_id = "";
  // console.log("3006666",authState,"222",customerDetails)
  if (customerDetails && customerDetails[module_name + "_id"]) {
    e_id =
      customerDetails[module_name + "_id"] ||
      customerDetails[module_name + "id"];
  }

  let duplicate = authState.duplicate;

  useEffect(() => {
    setAddForMulti({});
  }, [module_name]);

  useEffect(() => {
    const urlFetch = window.location.hash;
    let urlModule_name = "";
    const match = urlFetch.match(/\/home\/(\w+)\//);
    if (match) {
      urlModule_name = match[1];
    }
    // console.log("xxxxx",urlModule_name)
    let forChange = urlModule_name.replace(/s$/, "");

    // commmented because nowgetting module name from url
    // let forChange = localStorage.getItem("prev_module_name2")
    // if (localStorage.getItem("prev_module_name2") === "opportunity") {
    //   forChange = 'opportunitie'
    // }

    if (props.yes == false) {
      setCountry(1);
    }
  }, [props.yes]);

  const changeHandle = (changeHandleProps) => {
    // const name = e.target.name;
    // const value = e.target.value;
    console.log(changeHandleProps, "changeHandleProps");
    let { name, value, type, checked } = changeHandleProps;
    console.log(name, value, type, checked, "name, value, type, checked");
    if (name == "salutation") {
      setSalutation(value);
    }
    setAdd({ ...add, [name]: value });
    setAdd_forName({ ...add_forName, [name]: value });
    setAddForMulti({ ...addForMulti, [name]: value });
    if (type === "checkbox") {
      setAdd({ ...add, [name]: checked });
      setAddForMulti({ ...addForMulti, [name]: checked });
    }
  };

  useEffect(() => {
    setLine({
      product_id: 0,
      [module_name + "_product"]: "",
      ordered_qty: "0",
      pending_qty: "0",
      qty_received: "0",
      warehouse_multiple_module: "",
      warehouse_multiple_record: "",
      batch_or_serial: "",
      batch_expiry: "",
    });
  }, []);

  // for sending data to edit api dynamically xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const { customPayload: custom, boot: loadPayload } = usePayload({
    blocke,
    module_name,
    row_value,
    add,
    related_record,
    rajya,
    selectedUserList,
    customerDetails,
    e_id,
    searchTableModule,
    authState,
    country,
    salutation,
    searchRelatedTo,
    add_forName,
    uitype_module,
    relatedPopUp,
    main_module,
    related_module,
    uitype6_value,
    multiField,
    supplierorder_num,
  });
   console.log("here",blocke)

  useEffect(() => {
    loadPayload();
  }, [add, row_value, uitype6_value, multiField]);

  const clear = () => {
    setAdd_forName({});
    setuitype6_value({});
    setUitype_module({});
    setAdd({});
  };

  const postApiForAllModule = (headers) => {
    console.log(574);
    (async () => {
      const data = await postapi(
        tenantCname,
        module_name,
        custom,
        add_forName,
        headers,
        autofillnumm,
      );
      if (data) {
        if (data[0] != undefined) {
          clear();
        }
        if (data[0] === undefined) {
          Object.keys(data).map((keywords) => error_msg.push(data[keywords]));
          setSmShowError(true);
          setSaveButtonDisabled(false);
        } else if (props.yes !== true) {
          window.location.href =
            "#/home/" +
            (module_name == "accounts" || module_name == "customer"
              ? "accounts"
              : module_name) +
            "/detail/" +
            data[0][module_name + "id"];
          if (data[0].warning !== undefined) {
            localStorage.setItem("warning", data[0].warning);
          }
        } else {
          window.location.reload();
        }

        localStorage.removeItem("duplicate");
      } else {
        // console.log(err)
        setMand_error("Field(s) Required");
      }
    })();
    setAuthState({ ...authState, duplicate: "", customerDetails: "" });
  };

  const submit = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    if (duplicate && custom["createtime"]) {
      custom["createtime"] = Moment().format("YYYY-MM-DD HH:mm:ss");
    }

    if (
      module_name != "supplierorderreceipt" ||
      related_module != "supplierorderreceipt"
    ) {
      !e_id && postApiForAllModule(headers);
    }

    // setAuthState({ ...authState, customerDetails: "" })
    handleClose4();
    setSaveButtonDisabled(true);
  };

  const cancel = () => {
    handleClose();
    setTimeout(() => {
      localStorage.removeItem("customerDetails");
      localStorage.setItem("selectedFlatRows", "[]");
      localStorage.removeItem("duplicate");
      setAuthState({
        ...authState,
        customerDetails: "",
        duplicate: "",
        selectedFlatRows: "",
      });
      setAdd_forName({});
      setuitype6_value({});
      setUitype_module({});
      setAdd({});
      setRow_value({});
      setCountry(1);
      setRelated_record("");
      setSearchRelatedTo();
    }, 500);
  };

  let xlink = "";

  if (related_module != null) {
    let markchange = localStorage.getItem("prev_module_name2");
    xlink =
      "/home/" +
      markchange +
      "/detail/" +
      (localStorage.getItem("prev_c_id") || "");
  } else {
    let markchange = localStorage.getItem("prev_module_name");
    xlink = "/home/" + markchange;
  }

  let nam = "";
  if (customerDetails && e_id != null) {
    nam = add[module_name + "_name"];
  } else if (selectedFlatRowsmy && selectedFlatRowsmy.length >= 1) {
    // console.log("111411 edit",selectedFlatRowsmy,"222",(selectedFlatRowsmy).length )
    nam = "Edit Selected Records";
  } else {
    nam = "Create New " + module_name;
  }

  const calendarHeader = () => {
    return (
      <React.Fragment>
        <CalendarPrev className="custom-prev" />
        <CalendarNav className="custom-nav" />
        <CalendarNext className="custom-next" />
      </React.Fragment>
    );
  };
  // Return the Offcanvas component with show, onHide, and placement props
  return (
    <Drawer anchor="right" open={show} onClose={handleClose}>
      <div className="drawer-content drawer-boxSize eventCreateForm">
        <div className="headingRow">
          <div className="row m-0"> 
            <div className="col-6 p-0">
              <h3 className="page_heading">Create Event</h3>
            </div>
            <div className="col-6 p-0">
              <div className="close_btn">
                <i onClick={handleClose} className="closeButton">
                  <IoMdClose style={{ width: "24px", height: "24px" }} />
                </i>
              </div>
            </div>
          </div>
        </div>
        <blocke_value.Provider
          value={{
            groupName,
            setGroupName,
            linee,
            setLinee,
            show2,
            setShow2, 
            warehouse_multiple_record,
            setWarehouse_multiple_record,
            apiPathData,
          }}
        >
          <div className="createEvent detail_parent mt-0 pb-0">
            <div className="container-fluid col-12 pl-4 pr-4">
              {blocke != "[]" ? (
                <div className="row pr-1">
                  <div className="createEvent parent_div col-12 mb-0">
                    <form>
                      <div className="sortWrap">
                        {blocke &&
                          Object.keys(blocke).map(
                            (k, index) => (
                              console.log(k, "1031", index),
                              [
                                <Accordion
                                  defaultExpanded={index === 0 ? true : false}
                                  className="card-box"
                                >
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className="card-box-header"
                                    key={k}
                                  >
                                    <Typography>
                                      <Trans>{k.replace(/_/g, " ")}</Trans>
                                    </Typography>{" "}
                                  </AccordionSummary>

                                  <AccordionDetails className="card-box-body">
                                    <div className="row">
                                      {blocke[k].map(
                                        (acc, i) => (
                                          console.log(acc, "1040"),
                                          acc.show_hide_criteria == 1
                                            ? [
                                              acc.uitype !== 10 ? (
                                                <div
                                                  key={acc.fieldlabel}
                                                  className={
                                                    acc.fieldname ==
                                                      "assign_to" ||
                                                      acc.fieldname ==
                                                      "event_name" ||
                                                      acc.fieldname ==
                                                      "related_venue" ||
                                                      acc.fieldname ==
                                                      "total_paid" ||
                                                      acc.uitype == 3
                                                      ? "col-12"
                                                      : "col-6"
                                                  }
                                                >
                                                  <div className="event-group">
                                                    <label for="eventNature">
                                                      <Trans>
                                                        {acc.fieldlabel.replace(
                                                          "&pound;",
                                                          "£",
                                                        )}
                                                      </Trans>
                                                      {acc.mandatory == 1 ? (
                                                        <span>*</span>
                                                      ) : null}
                                                    </label>
                                                    {acc.mandatory == 1 &&
                                                      mand_error != null &&
                                                      add[acc.fieldname] ==
                                                      null ? (
                                                      <h6 className="mand_error">
                                                        {mand_error}
                                                      </h6>
                                                    ) : null}
                                                    {acc.uitype == 1 ? (
                                                      <input
                                                        type="text"
                                                        name={acc.fieldname}
                                                        id={acc.fieldname}
                                                        placeholder={
                                                          acc.fieldname ==
                                                            "event_num"
                                                            ? "Auto Generated"
                                                            : acc.fieldname.replace(
                                                              /_/g,
                                                              " ",
                                                            )
                                                        }
                                                        value={
                                                          acc.fieldname ==
                                                            "event_num"
                                                            ? ""
                                                            : add[
                                                            acc.fieldname
                                                            ]
                                                        }
                                                        readOnly={
                                                          acc.fieldname ==
                                                            "event_num"
                                                            ? true
                                                            : false
                                                        }
                                                        onChange={(event) =>
                                                          changeHandle(
                                                            event.target,
                                                          )
                                                        }
                                                      />
                                                    ) : acc.uitype == 2 ? (
                                                      <select
                                                        key="s"
                                                        name={acc.fieldname}
                                                        defaultValue={
                                                          add_forName[
                                                          acc.fieldname
                                                          ] || ""
                                                        }
                                                        onChange={(event) =>
                                                          changeHandle(
                                                            event.target,
                                                          )
                                                        }
                                                      >
                                                        <option hidden>
                                                          Select
                                                        </option>
                                                        {acc.options.map(
                                                          (option) => (
                                                            <option
                                                              key={
                                                                option.picklistvalue
                                                              }
                                                              value={
                                                                option.picklistvalue
                                                              }
                                                            >
                                                              {
                                                                option.picklistlabel
                                                              }
                                                            </option>
                                                          ),
                                                        )}
                                                      </select>
                                                    ) : acc.uitype == 6 ? (
                                                      <Uitype6Event
                                                        acc={acc}
                                                        relatedTo={
                                                          acc?.relatedto
                                                        }
                                                        add={add}
                                                        i={i}
                                                        changeHandle={
                                                          changeHandle
                                                        }
                                                      />
                                                    ) : acc.uitype === 11 ? (
                                                      <CurrencyInput
                                                        name={acc.fieldname}
                                                        onValueChange={(
                                                          value,
                                                          name,
                                                        ) =>
                                                          changeHandle({
                                                            value,
                                                            name,
                                                          })
                                                        }
                                                        value={
                                                          add_forName[
                                                          acc.fieldname
                                                          ] &&
                                                          Number(
                                                            add_forName[
                                                              acc.fieldname
                                                            ].replace(
                                                              ",",
                                                              "",
                                                            ),
                                                          )
                                                        }
                                                        thousandSeparator={
                                                          false
                                                        }
                                                      />
                                                    ) : acc.uitype == 3 ? (
                                                      <textarea
                                                        name={acc.fieldname}
                                                        id={acc.fieldname}
                                                        rows="3"
                                                        defaultValue={
                                                          add[
                                                          acc.fieldname
                                                          ] || ""
                                                        }
                                                        onChange={(event) =>
                                                          changeHandle(
                                                            event.target,
                                                          )
                                                        }
                                                      ></textarea>
                                                    ) : acc.uitype == 100 ? (
                                                      <select
                                                        name={acc.fieldname}
                                                        defaultValue={
                                                          add[acc.fieldname]
                                                        }
                                                        onChange={(event) =>
                                                          changeHandle(
                                                            event.target,
                                                          )
                                                        }
                                                      >
                                                        <option hidden>
                                                          {add[acc.fieldname]}
                                                        </option>
                                                        {acc.options.map(
                                                          (option) => (
                                                            <option
                                                              key={
                                                                option.userid
                                                              }
                                                              defaultValue={
                                                                add[
                                                                acc
                                                                  .fieldname
                                                                ]
                                                              }
                                                            >
                                                              {
                                                                option.firstname
                                                              }{" "}
                                                              {option.lastname !==
                                                                "&nbsp;"
                                                                ? option.lastname
                                                                : ""}
                                                            </option>
                                                          ),
                                                        )}
                                                      </select>
                                                    ) : acc.uitype == 7 ? (
                                                      <div
                                                        className="input-group date datepickers  datepickerWrap"
                                                        id="datetimepicker3"
                                                        data-target-input="nearest"
                                                      >
                                                        <Datepicker
                                                          className="form-control  datetimepicker-input"
                                                          controls={[
                                                            "calendar",
                                                          ]}
                                                          display="anchored"
                                                          renderCalendarHeader={
                                                            calendarHeader
                                                          }
                                                          inputComponent="input"
                                                          inputProps={{
                                                            className:
                                                              "form-control  datetimepicker-input",
                                                          }}
                                                          name={acc.fieldname}
                                                          onChange={(
                                                            inst,
                                                          ) => (
                                                            setAdd({
                                                              ...add,
                                                              [acc.fieldname]:
                                                                Moment(
                                                                  inst.value,
                                                                ).format(
                                                                  "YYYY-MM-DD",
                                                                ),
                                                            }),
                                                            setAddForMulti({
                                                              ...addForMulti,
                                                              [acc.fieldname]:
                                                                Moment(
                                                                  inst.value,
                                                                ).format(
                                                                  "YYYY-MM-DD",
                                                                ),
                                                            })
                                                          )}
                                                          dateFormat="DD-MM-YYYY"
                                                          defaultValue={
                                                            add[
                                                            acc.fieldname
                                                            ] || ""
                                                          }
                                                        />
                                                        <span
                                                          className="input-group-text"
                                                          data-toggle="datetimepicker"
                                                          data-target="#datetimepicker3"
                                                        >
                                                          <VscCalendar />
                                                        </span>
                                                      </div>
                                                    ) : acc.uitype == 8 ? (
                                                      <div
                                                        className="input-group date timepickers timepickerWrap"
                                                        id="datetimepicker5"
                                                        data-target-input="nearest"
                                                      >
                                                        <Datepicker
                                                          cssClass="datetimepicker56"
                                                          buttons={[
                                                            "set",
                                                            "cancel",
                                                          ]}
                                                          display="anchored"
                                                          controls={["time"]}
                                                          touchui={true}
                                                          timeFormat="HH:mm"
                                                          inputComponent="input"
                                                          inputProps={{
                                                            className:
                                                              "form-control  datetimepicker-input",
                                                          }}
                                                          name={acc.fieldname}
                                                          onChange={(
                                                            inst,
                                                          ) => (
                                                            setAdd({
                                                              ...add,
                                                              [acc.fieldname]:
                                                                Moment(
                                                                  inst.value,
                                                                ).format(
                                                                  "HH:mm",
                                                                ),
                                                            }),
                                                            setAddForMulti({
                                                              ...addForMulti,
                                                              [acc.fieldname]:
                                                                Moment(
                                                                  inst.value,
                                                                ).format(
                                                                  "HH:mm",
                                                                ),
                                                            })
                                                          )}
                                                          defaultValue={
                                                            add[acc.fieldname]
                                                          }
                                                        />
                                                        <span
                                                          className="input-group-text"
                                                          data-toggle="datetimepicker"
                                                          data-target="#datetimepicker5"
                                                        >
                                                          <MdAccessTime />
                                                        </span>
                                                      </div>
                                                    ) : acc.uitype == 9 ? (
                                                      <div
                                                        className="input-group date datepickers  datepickerWrap bb"
                                                        id="datetimepicker3"
                                                        data-target-input="nearest"
                                                      >
                                                        <Datepicker
                                                          className="form-control  datetimepicker-input"
                                                          controls={[
                                                            "calendar",
                                                            "time",
                                                          ]}
                                                          display="anchored"
                                                          buttons={[
                                                            "set",
                                                            "cancel",
                                                          ]}
                                                          inputComponent="input"
                                                          inputProps={{
                                                            className:
                                                              "form-control  datetimepicker-input",
                                                          }}
                                                          // name={acc.fieldname}
                                                          // onChange={(inst) => setAdd({ ...add, [acc.fieldname]: Moment(inst.value).format("YYYY-MM-DD HH:mm") })}
                                                          // dateFormat="DD/MM/YYYY"
                                                          // timeFormat="HH:mm"
                                                          // defaultValue={add[acc.fieldname]||''}

                                                          name={acc.fieldname}
                                                          onChange={(inst) =>
                                                            setAdd({
                                                              ...add,
                                                              [acc.fieldname]:
                                                                Moment(
                                                                  inst.value,
                                                                ).format(
                                                                  "DD-MM-YYYY HH:mm",
                                                                ),
                                                            })
                                                          }
                                                          dateFormat="DD-MM-YYYY"
                                                          timeFormat="HH:mm"
                                                          defaultValue={
                                                            add[acc.fieldname]
                                                          }
                                                        />
                                                        <span
                                                          className="input-group-text"
                                                          data-toggle="datetimepicker"
                                                          data-target="#datetimepicker3"
                                                        >
                                                          <VscCalendar />
                                                        </span>
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                </div>
                                              ) : null,
                                            ]
                                            : null
                                        ),
                                      )}
                                    </div>
                                  </AccordionDetails>
                                </Accordion>,
                              ]
                            ),
                          )}
                      </div>

                      <div className="btn-grp event_action_btn create_event_btn">
                        <Button className="btn cancel_btn" onClick={cancel}>
                          <Trans>Cancel</Trans>
                        </Button>
                        <Button
                          className="btn save_btn"
                          disabled={isSaveButtonDisabled}
                          onClick={submit}
                        >
                          <Trans>Save</Trans>
                        </Button>
                      </div>

                      {/* {(!relatedPopUp && module_name === "supplierorderreceipt") ? null :
                 <div className="row">
  <div className="col-lg-6  col-md-6 col-12"></div>
  <div className="col-lg-6 col-md-6 col-12 submit-row">
      <Buttons type="button" class="btn_cancel reset_button bottom" onClick={cancel}>Cancel</Buttons>
      <Buttons type="button" class="btn_save crt_btn edit_btn bottom" disabled={isSaveButtonDisabled} onClick={submit}>Save</Buttons>
  </div>
                 </div>} */}
                    </form>

                    {/* xxxxxx modal for edit confirmation xxxxxx */}
                    <EditAccountModal
                      show4={show4}
                      submit={submit}
                      handleClose4={handleClose4}
                    />

                    {/* xxxxxx Modal for Assignig users xxxxxx */}
                    <ShowUserList
                      selectedUserList={selectedUserList}
                      setShowUserlist={setShowUserlist}
                      custom={custom}
                      userListState={userListState}
                      showUserlist={showUserlist}
                    />

                    {/* Modal for Error message xxxxxx */}
                    <ShowErrorMsg
                      error_msg={error_msg}
                      smShowError={smShowError}
                      setSmShowError={setSmShowError}
                      setError_msg={setError_msg}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </blocke_value.Provider>
      </div>
    </Drawer>
  );
};
export default CreateEventSlider;
