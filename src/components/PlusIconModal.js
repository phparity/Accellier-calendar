import axios from "../config/Axios"
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Modal, Button } from "react-bootstrap"
import { Trans } from 'react-i18next'
import Select from 'react-select';
import { VscCalendar } from "react-icons/vsc"
import Moment from 'moment';
import { Datepicker, CalendarNav, CalendarPrev, CalendarNext, Input } from "@mobiscroll/react";
import { CheckModuleName } from "../utils/CheckModuleName";
import { AuthContext } from "../config/Authentications/AuthContext";
import { opCreatePageData, r_value, searchTableModuleValue } from "../navigation/PageRoutes";
import { CgSearch } from "react-icons/cg";
import useFetch from "../service/GetApiResponse";
import { FIELDSAPI } from "../service/ApiPath";
import useStorage from "../service/useStorage";
import useGetReq from "../service/useGetReq"; 
import { recordErrorAPIdata } from "../service/useApiData";




const PlusIconModal = (props)=>{
  const storage = useStorage()
  const [getData] = useGetReq();
  const { authState, setAuthState } = useContext(AuthContext)
  const { row_value, setRow_value, uitype6_value, setuitype6_value} = useContext(r_value)
  const {searchTableModule} = props
  const {setSearchTableModule,smShowError, setSmShowError,error_msg, setError_msg} = useContext(searchTableModuleValue)
  const {add, setAdd} = useContext(opCreatePageData)
  let [modal_add, setModal_add] = useState({})
  const [show, setShow] = useState(false);
  let [mand_error, setMand_error] = useState("")
  let [blocke_modal, setBlocke_modal] = useState([])
  const [countryModel, setCountrymodel] = useState(1)
  const tenantCname = authState.tenant_cname;
  const [autofillnumm, setAutofillnumm] = useState("")
  const [salutation,setSalutation] = useState("Mr")
  let module_name = CheckModuleName()
  let logData = [];
  let viewData = {};
  viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };
  
  useEffect(()=>{setSearchTableModule(searchTableModule)},[searchTableModule])
  const handleShow = () => {
    setShow(true);
  }    
    let [rajya, setRajya] = useState("")
    const [rajyapopup, setRajyapopup] = useState("")
    // let [refNum, setRefNum] = useState(true)

    const [emailError, setEmailError] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

  const isEmail = (value) => {
    const validFormat =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return validFormat.test(value);
  };

    const handleClose = () => {
      setSearchTableModule(undefined);
      setShow(false);
      setModal_add({})
      // setRefNum(!refNum)
    }

    const changeHandle2 = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      // Define a regular expression for email validation
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
      if (name === 'email') {
        if (!emailRegex.test(value)) {
          setEmailError(true);
          setModal_add({ ...modal_add, [name]: value }); // Update the state with the invalid email
        } else {
          setEmailError(false);
        }
      }
    
      if (e.target.name === `${searchTableModule}_country`) {
        setRajyapopup('');
        setCountrymodel(value);
      }
      setModal_add({ ...modal_add, [name]: value });
    
      if (e.target.type === 'checkbox') {
        setModal_add({ ...modal_add, [name]: e.target.checked });
      }
    };

      const changeHandleRajya2 = (rajyapopup) => {
        setRajyapopup(rajyapopup)
      }
      const calendarHeader = () => {
        return <React.Fragment>
          <CalendarPrev className="custom-prev" />
          <CalendarNav className="custom-nav" />
          <CalendarNext className="custom-next" />
        </React.Fragment>;
      }

      let options_modal = []

      blocke_modal&&Object.keys(blocke_modal).map((k) => (
        blocke_modal[k].map((acc) => (
          acc.options != null && acc.fieldname == [searchTableModule + "_county"] ?
            // Object.keys(acc.options).map((opte) => (
              (acc.options[countryModel]||["1"]).map((county, i) => (
                options_modal = [...options_modal, {
                  label: county.picklistlabel,
                  value: county.picklistvalue
                }]
              ))
            // ))
            : null
        ))
      ))
    useEffect(() => {
      searchTableModule&&getData(FIELDSAPI(tenantCname),(data)=>{setBlocke_modal(data.block)},(err)=>console.log(err),{params: {"module": searchTableModule}},storage)
        }, [searchTableModule])

    useEffect(() => {
      if (searchTableModule) {
        setAutofillnumm("00000000000");
        setModal_add({
          ...modal_add,
          [searchTableModule + "_num"]: "00000000000"
        });
      }
      
    
      if (add[module_name + "_id"] == null) { add.assign_to = localStorage.getItem("username") }
      if (modal_add[searchTableModule + "_id"] == null) { modal_add.assign_to = localStorage.getItem("username") }
      if (add[module_name + "_id"] == null) { add[module_name + "_country"] = "1" }
  }, [searchTableModule])
// }, [searchTableModule,refNum])

  let modal_custom = ''

  blocke_modal && Object.keys(blocke_modal).map((k) => (
    blocke_modal[k].map((acc) => (
      acc.fieldname != [searchTableModule + "_num"] && acc.fieldname != "customer_county" && acc.fieldname != "source"
        && acc.fieldname != "status" && acc.uitype != 6 && acc.fieldname != "related_module" && acc.fieldname != "rate_conversion" ?
        modal_custom = { ...modal_custom, [acc.fieldname]: modal_add[acc.fieldname] } : null,

      acc.uitype == 6 ?
          modal_custom =  {...modal_custom,[acc.fieldname] : uitype6_value != undefined ? uitype6_value[1] : add[module_name+"_id"]} : null,

      acc.fieldname == [searchTableModule + "_country"] && countryModel?
          modal_custom = { ...modal_custom, [acc.fieldname]: countryModel } : null,

      acc.fieldname == [searchTableModule + "_county"] && rajyapopup.value != null ?
        modal_custom = { ...modal_custom, [acc.fieldname]: rajyapopup.value } : null,

      acc.uitype === 10 && acc.fieldname === "modifiedtime" ?
        modal_custom = { ...modal_custom, [acc.fieldname]: Moment().format("YYYY-MM-DD HH:mm") } : null,

      acc.uitype === 10 && acc.fieldname === "createtime" ?
        modal_custom = { ...modal_custom, [acc.fieldname]: Moment().format("YYYY-MM-DD HH:mm") } : null
    ))
  ))


    const plus_modal_submit = (e) => {
        e.preventDefault()
        let eventUpdate;
        if (modal_custom.createtime !== undefined) {
          if (typeof modal_custom === 'object') {
            if (modal_custom.createtime !== undefined && modal_custom.end_date !== undefined) {
              eventUpdate = true; 
            } else if (modal_custom.start_date === undefined && modal_custom.end_date === undefined) {
              eventUpdate = true; 
            }
            else if (modal_custom.start_date !== undefined && modal_custom.end_date === undefined) {
              eventUpdate = false; 
            }
            else if (modal_custom.start_date === undefined && modal_custom.end_date !== undefined) {
              eventUpdate = false; 
            }
          } else {
            eventUpdate = true; 
          }
        } else {
          eventUpdate = false;
        }
        
  
        if(modal_add.currency){
            modal_custom["rate_conversion"] = "1.00"
        }
        if(searchTableModule === "customer"){
          modal_custom = {...modal_custom,[searchTableModule + "_country"]:countryModel}
        }
        if (modal_add["email"] && !isEmail(modal_add["email"])) {
          setIsEmailValid(false);
          error_msg.push("Invalid email format")
          setSmShowError(true)
          return; // Prevent saving the data
        } else {
          setIsEmailValid(true);
        }
        axios.post("/" + tenantCname + "/api/" + searchTableModule,
          {
            [searchTableModule + "_num"]: modal_add[searchTableModule + "_num"],
            "custom": modal_custom,
            "source": "web",
            "status": "1",
            "createevent": eventUpdate
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + localStorage.getItem('token')
            }
          })
          .then((response) => {
            if (response.data[0] == undefined) {

              modal_custom=""
              Object.keys(response.data).map((keywords) => (
                error_msg.push(response.data[keywords])
              ))
     
              // Object.keys(response.data).map((keywords) => (
              //   setError_msg(response.data[keywords])
              // ))
              setSmShowError(true)
            }
        
            setRow_value({
              ...row_value,
              ['related_' + searchTableModule]: response.data[0][searchTableModule + "_name"],
              ['related_' + searchTableModule + 'id']: response.data[0][searchTableModule + "id"]
            })
            setuitype6_value({
              ...uitype6_value,
              ['related_' + searchTableModule]: response.data[0][searchTableModule + "_name"],
              ['related_' + searchTableModule + 'id']: response.data[0][searchTableModule + "id"]
            })
            // if (customerDetails === null && e_id === null){
            //   autoFillAgain(add)
            // }
              if(props?.isPrefill){
                props?.setListingMDN(searchTableModule)
                props.setPrefill(response.data[0])
                props.setShow(true)
               }
            setTimeout(() => {
              // setRefNum(!refNum)
              setShow(false);
            }, 1000);

            logData = [{...viewData, 'module_name': module_name, 'api': `/${'searchTableModule'}`, 'payload':{
              [searchTableModule + "_num"]: modal_add[searchTableModule + "_num"],
              "custom": modal_custom,
              "source": "web",
              "status": "1",
              "createevent": eventUpdate
            }, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          })
          .catch((error) => { 
            console.log(error);
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'searchTableModule'}`, 'payload':{
              [searchTableModule + "_num"]: modal_add[searchTableModule + "_num"],
              "custom": modal_custom,
              "source": "web",
              "status": "1",
              "createevent": eventUpdate
            }, 'response':[], 'error_details': error, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
          });
      }

      const handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === 'z') {
          event.preventDefault();
        }
      };
 
    
      
    return(
<> 
<div
            className="plus" 
            onClick={() =>
              handleShow()
            }
          >
            +
          </div> 
 <Modal show={show} onHide={handleClose} className="search_modal plus_modal" scrollable={true} backdrop="static" keyboard={false}  onKeyDown={handleKeyDown}
      tabIndex="0" >
                  <Modal.Header closeButton>
                    <Modal.Title>{<Trans>Create New {searchTableModule === "customer" ? "Account" :searchTableModule === "product" ? "Product" : searchTableModule === "warehouse" ? "Warehouse" : searchTableModule}</Trans>}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={plus_modal_submit}>
                      {
                        blocke_modal && Object.keys(blocke_modal).map((k, index) => (
                          [
                            <div className="detail_div1"><h4 className="cst_inf" key={k}>{k.replace(/_/g, " ")}</h4></div>,
                            <div className={k === "Contact_Information" ? "detail_div2 with_salutation" : "detail_div2"}>
                              <div className="details_field_1">
                                <div className="row">
                                  {
                                    blocke_modal[k].map((acc, i) => (
                                      acc.show_hide_criteria == 1 && acc.uitype !== 10 && acc.in_popup !== 0 ?
                                        [
                                          <div key={acc.fieldlabel} className="col-lg-2 col-md-5 col-sm-5 col-12">
                                            {(acc.uitype !== 6 && acc.uitype != 14) ?
                                              <label><Trans>{acc.fieldlabel}</Trans>{acc.mandatory == 1 ? <span>*</span> : null}</label> : <label></label>}
                                            {acc.mandatory == 1 && mand_error != null ? <h6 className="mand_error">{mand_error}</h6> : null}
                                          </div>,
                                          acc.uitype != 6 && acc.uitype != 14 && acc.uitype != 100 && acc.uitype != 3 &&
                                            acc.uitype != 103 && acc.fieldname != "salutation" && acc.uitype != 5 && acc.uitype != 2 && acc.uitype != 4
                                            && acc.uitype != 7 && acc.uitype != 8 && acc.uitype != 9 && acc.uitype != 102 ?
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              {
                                                acc.fieldname == [searchTableModule + "_num"] ?
                                                  <input type="text"
                                                    name={acc.fieldname}
                                                    placeholder="AUTO GENERATED" readOnly>
                                                  </input> :
                                               (
                                                <div>
                                                  <input
                                                    type="text"
                                                    name={acc.fieldname}
                                                    defaultValue={modal_add[acc.fieldname]}
                                                    onChange={changeHandle2}
                                                    placeholder=""
                                                  />
                                                  {acc.fieldname === 'email' && emailError && (
                                                    <div className="error-message">Please enter a valid email</div>
                                                  )}
                                                </div>
                                              )
                                              }
                                            </div> : null,

                                          acc.uitype == 4 ?
                                            <div className="col-lg-3 col-md-7 col-sm-7 col-12" onChange={changeHandle2} style={{ display: 'inherit' }}>
                                              {
                                                (acc.options || []).map((option) => (
                                                  [<input type='radio' value={option.radiovalue} id={option.radiovalue} name='radio' style={{ height: '15px' }} ></input>,
                                                  <label htmlFor={option.radiovalue}>{option.radiolabel}</label>]
                                                ))
                                              }
                                            </div>
                                            : null,

                                          acc.uitype == 6 ?
                                            <div className="col-lg-4 col-md-7 col-sm-7 col-12 relatd">
                                              <div className="row">
                                                <div key={acc.fieldname} className="col-lg-9 col-md-10 col-sm-9 col-10 search_form_field">
                                                  {/* <input type="text" 
                                  name={acc.fieldname} 
                                  value={row_value || add[module_name+"_name"]}
                                  onChange={(e)=> setRow_value(modal_add.related_to = e.target.value)} placeholder="">
                                  </input>
                                  <span onClick={handleShow1}><i><CgSearch/></i></span> */}
                                                </div>
                                                {/* <div key={i} className="col-lg-3 col-md-2 col-sm-3 col-2 text-endss">
                                  <div className="plus" onClick={handleShow}>+</div>
                                </div> */}
                                              </div>
                                            </div> : null,
                                            acc.uitype == 14 ?
                                            <div className="col-lg-4 col-md-7 col-sm-7 col-12 relatd">
                                              <div className="row">
                                                <div key={acc.fieldname} className="col-lg-9 col-md-10 col-sm-9 col-10 search_form_field">
                                                  {/* <input type="text" 
                                  name={acc.fieldname} 
                                  value={row_value || add[module_name+"_name"]}
                                  onChange={(e)=> setRow_value(modal_add.related_to = e.target.value)} placeholder="">
                                  </input>
                                  <span onClick={handleShow1}><i><CgSearch/></i></span> */}
                                                </div>
                                                {/* <div key={i} className="col-lg-3 col-md-2 col-sm-3 col-2 text-endss">
                                  <div className="plus" onClick={handleShow}>+</div>
                                </div> */}
                                              </div>
                                            </div> : null,

                                          acc.uitype == 7 ?
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              {
                                                <div>
                                                  <div className="input-group date datepickers  datepickerWrap" id="datetimepicker3" data-target-input="nearest">
                                                    <Datepicker className="form-control  datetimepicker-input"
                                                      controls={['calendar']}
                                                      display='anchored'
                                                      renderCalendarHeader={calendarHeader}
                                                      inputComponent="input"
                                                      inputProps={{
                                                        className: "form-control  datetimepicker-input"
                                                      }}
                                                    //   name={acc.fieldname}
                                                    //   onChange={(inst) => setModal_add({ ...modal_add, [acc.fieldname]: Moment(inst.value).format("YYYY-MM-DD") })}
                                                    //   dateFormat="DD/MM/YYYY"
                                                    //   defaultValue={add[acc.fieldname] !== undefined ? Moment(add[acc.fieldname]).format("DD-MM-YYYY") : ''}
                                                    onChange={(inst) => { const formattedDate = Moment(inst.value).format("YYYY-MM-DD");
                                                      setModal_add({  ...modal_add,  [acc.fieldname]: formattedDate });
                                                     }}
                                                    dateFormat="DD/MM/YYYY"
                                                    defaultValue={  modal_add[acc.fieldname] !== undefined  ? Moment(modal_add[acc.fieldname]).format("DD-MM-YYYY") : '' }
                                                    />
                                                    <span className="input-group-text classb" data-toggle="datetimepicker" data-target="#datetimepicker3" >
                                                      <VscCalendar />
                                                    </span>
                                                  </div>
                                                </div>
                                              }
                                            </div> : null,

                                          acc.uitype == 8 ?
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              {
                                                <div>
                                                  <div className="input-group date datepickers  datepickerWrap" id="datetimepicker3" data-target-input="nearest">
                                                    <Datepicker className="form-control  datetimepicker-input"
                                                      controls={['time']}
                                                      display='anchored'
                                                      renderCalendarHeader={calendarHeader}
                                                      inputComponent="input"
                                                      inputProps={{
                                                        className: "form-control  datetimepicker-input"
                                                      }}
                                                      name={acc.fieldname}
                                                      onChange={(inst) => setModal_add({ ...modal_add, [acc.fieldname]: Moment(inst.value).format("HH:mm") })}
                                                      timeFormat="HH:mm"
                                                      defaultValue={add[acc.fieldname] !== undefined ? Moment(add[acc.fieldname]).format("HH:mm") : ''}
                                                    />
                                                    <span className="input-group-text classc" data-toggle="datetimepicker" data-target="#datetimepicker3" >
                                                      <VscCalendar />
                                                    </span>
                                                  </div>
                                                </div>
                                              }
                                            </div> : null,

                                          acc.uitype == 9 ?
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              {
                                                <div>
                                                  <div className="input-group date datepickers  datepickerWrap" id="datetimepicker3" data-target-input="nearest">
                                                    <Datepicker className="form-control  datetimepicker-input"
                                                      controls={['calendar', 'time']}
                                                      display='anchored'
                                                      renderCalendarHeader={calendarHeader}
                                                      inputComponent="input"
                                                      inputProps={{
                                                        className: "form-control  datetimepicker-input"
                                                      }}
                                                      name={acc.fieldname}
                                                      onChange={(inst) => setModal_add({ ...modal_add, [acc.fieldname]: Moment(inst.value).format("YYYY-MM-DD HH:mm") })}
                                                      dateFormat="DD/MM/YYYY"
                                                      timeFormat="HH:mm"
                                                      defaultValue={add[acc.fieldname] !== undefined ? Moment(add[acc.fieldname]).format("DD-MM-YYYY HH:mm") : ''}
                                                    />
                                                    <span className="input-group-text classa" data-toggle="datetimepicker" data-target="#datetimepicker3" >
                                                      <VscCalendar />
                                                    </span>
                                                  </div>
                                                </div>
                                              }
                                            </div> : null,

                                          acc.uitype == 100 ?
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              <select name={acc.fieldname} onChange={changeHandle2}>

                                                <option hidden>{modal_add[acc.fieldname]}</option>
                                                {
                                                  (acc.options).map((option) => (
                                                    <option key={option.userid} defaultValue={modal_add[acc.fieldname]}>{option.firstname} {option.lastname}</option>
                                                  ))
                                                }
                                              </select>
                                            </div> : null,

                                          acc.uitype == 3 ?
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              <textarea type="text"
                                                name={acc.fieldname}
                                                defaultValue={modal_add[acc.fieldname]}
                                                onChange={changeHandle2} placeholder="">
                                              </textarea>
                                            </div> : null,
                                          //////--------COUNTRY--------////////////////
                                          (acc.uitype == 2 || acc.uitype == 102) && acc.fieldname != 'salutation' ?
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              <select key="s" name={acc.fieldname} defaultValue={(countryModel === "1" || 1)? modal_add[acc.fieldname]:countryModel} onChange={changeHandle2}>

                                                <option hidden>{modal_add[acc.fieldname] === 1 || "undefined"? "United Kingdom" : modal_add[acc.fieldname]}</option>
                                                <option value="2" hidden>Select</option>
                                                {
                                                  (acc.options || []).map((opt, i) => (
                                                     <option key={i} value={opt.picklistvalue}>{opt.picklistlabel}</option>
                                                 ))
                                                }

                                              </select>

                                            </div> : null,

                                          acc.uitype == 2 && acc.fieldname == "salutation" ?
                                            <div key={"a3"} className="col-lg-3 col-md-7 col-sm-7 col-12 salute_column modal_salute">
                                              <div className="row salute_row">
                                                <div className="col-lg-3 col-md-4 col-sm-3 col-4 pr-0">
                                                  <select key={"a2"} name={acc.fieldname} defaultValue={modal_add[acc.fieldname]} onChange={changeHandle2}>
                                                    <option hidden>{modal_add[acc.fieldname] == undefined? "Mr." :salutation }</option>
                                                    {acc.options.length >= 1 ?
                                                      (acc.options).map((opt) => (
                                                        <option key={opt.picklistlabel} value={opt.picklistvalue}>
                                                          {opt.picklistlabel}
                                                        </option>
                                                      )) : null
                                                    }
                                                  </select>
                                                </div>
                                              </div>
                                            </div> : null,

                                          acc.uitype == 5 ?
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              <input type="checkbox"
                                                name={acc.fieldname}
                                                defaultValue={modal_add[acc.fieldname]}
                                                checked={modal_add[acc.fieldname] || false}
                                                onChange={changeHandle2} placeholder="">
                                              </input>
                                            </div> : null,

                                          acc.uitype == 103 ?
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                              <Select options={options_modal}
                                                value={rajyapopup} onChange={changeHandleRajya2}
                                                placeholder={
                                                  <>
                                                    <CgSearch className="countyfield countyfield-popup" />{"  "}{rajyapopup}
                                                  </>
                                                }
                                              />
                                            </div> : null,

                                          acc.full_width === 1 ?
                                            [<div key={i} className="col-lg-1"></div>,
                                            <div key={acc.fieldlabel} className="col-lg-2 col-md-5 col-sm-5 col-12">
                                            </div>,
                                            <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                            </div>] : null,

                                          <div key={i} className="col-lg-1"></div>
                                        ]
                                        : null
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                          ]
                        ))
                      }
                      <div className="new_plus_modal_foot">
                        <button className="btn_cancel reset_button" type="button" onClick={handleClose}>Cancel</button>
                        <button type="submit" className="btn_save import_button">Save</button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal></>
    );
}
export default  PlusIconModal;
