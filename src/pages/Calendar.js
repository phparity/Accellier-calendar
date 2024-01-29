/* eslint-disable */
import React from "react";
import {useState, useEffect} from 'react';
// import mobiscroll from '@mobiscroll/react';
import { Eventcalendar, CalendarNav, setOptions, SegmentedGroup, SegmentedItem, CalendarPrev, CalendarNext } from "@mobiscroll/react";
import { snackbar, Popup, Button, Input, Textarea, Switch, Datepicker, CalendarToday } from '@mobiscroll/react';
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
import Moment from 'moment';
import Form from 'react-bootstrap/Form'
import {CgSearch} from "react-icons/cg"
import {Modal} from "react-bootstrap"
import { useParams, Link } from "react-router-dom";
import axios from "../config/Axios"
// import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import "../assets/style/Calendar.css"
import {GiHamburgerMenu} from "react-icons/gi"
import {IoMdSettings} from "react-icons/io"
import DropdownItem from "react-bootstrap/esm/DropdownItem";
// import { green } from "@material-ui/core/colors";
import {  Trans } from 'react-i18next'
import i18n from "../config/i18n"
import OpCreatePage from "./OpCreatePage";
import Header from "../layouts/Header";
import { useContext } from "react";
import { AuthContext } from "../config/Authentications/AuthContext";
import Footer from "../layouts/Footer";
import Uitype14 from "../components/UitypeComponents/Uitype14";
import { r_value } from "../navigation/PageRoutes";
// import OpCreateEdit from "./OpCreateEdit"
import { getFieldDataApiData, recordErrorAPIdata } from "../service/useApiData";
import Group981 from "../assets/images/Group 981.svg"
import useGetReq from "../service/useGetReq";
import useStorage from "../service/useStorage";
import { FIELDSAPI, GETALLTAGS } from "../service/ApiPath";

function Calendar() {
    const [getData] = useGetReq()
    const storage = useStorage()
    const { authState, setAuthState } = useContext(AuthContext)
    const {row_value,setRow_value} = useContext(r_value)
    const tenantCname = authState.tenant_cname;

    const [cuslist, setCuslist] = useState([]);
    const [details, setDetails] = useState({});
    const [table_header, setTable_header] = useState([]);
    let [blocke, setBlocke] = useState([]);
    let [add, setAdd] = useState({});
    const [crv, sCrv] = useState('')
    const [searchTableModule, setSearchTableModule] = useState("")
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [input_mobile, setInput_mobile] = useState('')
    const [search_mobile, setSearch_mobile] = useState('')
    const [isrest, setIsrest] = useState(false)
    const [table_d, setTable_d] = useState([])
    const [search_value, setSearch_value] = useState({customer_num : '',
    phone:"",
    email:"",
    customer_name:"",
    street_address:"",
    pobox:"",
    customer_city:"",
    customer_county:"",
    customer_country:"",
    post_code:"",
    assign_to:"",
    related_to: ''})
    let [reset, setReset] = useState(false)
    const [getAllUser, setGetAllUser] = useState([])
    const [getalltags, setGetalltags] = useState([])
    const [daterange, setDaterange] = useState("")
    let [allusers, setAllusers] = useState([localStorage.getItem("userid")])
    let [alltag, setAlltag] = useState([])
    const [showr, setShowr] = useState(false);
    const [leftsegment, setLeftsegment] = useState(false)
    const [isTick, setIsTick] = useState("opportunity")
    const [autofillnumm, setAutofillnumm] = useState("")
    let [defaultUserId, setDefaultUserId] = useState("")
    const [isreadonly, setIsreadonly] = useState(false)
    const [smShowError, setSmShowError] = useState(false);
    const [error_msg, setError_msg] = useState([])
    const [show2, setShow2] = useState(false);

    
    let logData = [];
    let viewData = {};
    viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };

    const now = new Date();
    const handleCloser = () => setShowr(false);
    const handleRelatedData = (rel) => {
        if(rel.related_module){
        setRow_value({
                ...row_value, ['related_' + rel.related_module]:rel.related_record,
                ['related_' + rel.related_module + 'id']:rel.related_recordid,
                ['cal_module']:rel.related_module,
                ['related_record']:rel.related_recordid
            });  
        sCrv(rel.related_module);
    }
    }

    const lang = localStorage.getItem("language")
        if (lang){
            i18n.changeLanguage(lang)
        }

    const [view, setView] = React.useState('month');
    let [myEvents, setMyEvents] = React.useState([]);
    const [tempEvent, setTempEvent] = React.useState(null);
    const [isOpen, setOpen] = React.useState(false);
    const [isRcOpen, setRcOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null);
    const [start, startRef] = React.useState(null);
    const [end, endRef] = React.useState(null);
    const [popupEventTitle, setTitle] = React.useState('');
    const [popupEventDescription, setDescription] = React.useState('');
    const [popupEventAllDay, setAllDay] = React.useState(true);
    const [popupEventDate, setDate] = React.useState([]);
    const [popupEventStatus, setStatus] = React.useState('busy');
    const [mySelectedDate, setSelectedDate] = React.useState(now);
    const [popupEventType, setType] = React.useState('');
    const [popupEventCalendar_num, setCalendar_num] = React.useState('');
    const [popupEventSubject, setSubject] = React.useState('');
    const [popupEventRelated_record, setRelated_record] = React.useState('');
    const [popupEventStart_datetime, setStart_date] = React.useState('');
    const [popupEventRelated_module, setRelated_module] = React.useState('');
    const [popupEventStart_time, setStart_time] = React.useState('');
    const [popupEventEnd_datetime, setEnd_date] = React.useState('');
    const [popupEventActivity_type, setActivity_type] = React.useState('');
    const [popupEventEnd_time, setEnd_time] = React.useState('');
    const [popupEventActivity_status, setActivity_status] = React.useState('')
    const [popupEventAssign_to, setAssign_to] = React.useState(localStorage.getItem("username"))

    let {module_name} = useParams();

    setOptions({
        theme: 'ios',
        themeVariant: 'light'
    });

    const [isSave, setIsSave] = useState(false);

    let filtersdate = Moment(mySelectedDate).startOf('month').subtract(7, 'days').format("YYYY-MM-DD").slice(0, 10)
    let filteredate = Moment(mySelectedDate).endOf('month').add(7, 'days').format("YYYY-MM-DD").slice(0, 10)

    // React.useEffect ( ()=>{
    //     if (allusers.length == 0 && alltag.length == 0){
    //         axios.get("/api/calendar?datefilter=start_datetime="+filtersdate+','+filteredate+'&ipp=false', {
    //         headers:{
    //             "Accept": "application/JSON",
    //             "Authorization": "Bearer" + " " + localStorage.getItem('token')
    //         }
    //     }
            
    //         )
    //         .then(res=>{
    //             console.log(res)
    //             setCuslist(res.data.data)
    //             setDetails(res.data)
    //             localStorage.removeItem("customerDetails")
    //             jhjh(res.data.data);
    //             setIsSave(false)
    //             setAllusers([])
    //             setAlltag([])
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //             setCuslist([])
    //         })
    //         }
            
    // },[isSave, mySelectedDate])

    const jhjh=(cust)=>{
        myEvents=[]
            cust.map((cus)=>(
                myEvents = [...myEvents, { 
                    id: cus.calendarid,
                    start: cus.start_datetime, 
                    end: cus.end_datetime,
                    allDay: cus.allDay,
                    title:  [cus.start_datetime != null ? cus.start_datetime.slice(11, 16) : null] +" "+ cus.subject,
                    color: cus.color.replace(";", ""),
                    type: cus.type,
                    subject: cus.subject,
                    calendar_num: cus.calendar_num,
                    description: cus.description,
                    activity_status: cus.activity_status,
                    activity_statusid: cus.activity_statusid,
                    activity_type: cus.activity_type,
                    activity_typeid: cus.activity_typeid,
                    start_datetime: cus.start_datetime,
                    start_time: cus.start_time,
                    end_datetime: cus.end_datetime,
                    end_time: cus.end_time,
                    related_record: cus.related_record,
                    related_recordid: cus.related_recordid,
                    related_module: cus.related_module,
                    assign_to: cus.assign_to,
                    comment: cus.comment,
                    createtime:cus.createtime,
                }]
            )) 
                setMyEvents(myEvents)
    }

    useEffect(() => {
        getData(FIELDSAPI(tenantCname),(data)=>setBlocke(data.block),(err)=>console.log(err),{params:{"module": "calendar"}},storage)
        axios.get("/"+tenantCname+"/api/getalluser", {
            headers:{
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            } 
        } 
       )
        .then(res=>{
            getAllUser.push(res.data[0])
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'getalluser'}`, 'payload':{"module": "calendar"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
        })
        .catch(err=>{
            console.log(err)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'getalluser'}`, 'payload':{"module": "calendar"}, 'response':[], 'error_details': err, 'status_code':'' }];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
        })

        axios.get("/"+tenantCname+"/api/getalluser?type=shared", {
            headers:{
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            } 
        } 
       )
        .then(res=>{
            res.data.map((addin)=>(
                getAllUser.push(addin)
            ))
            
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'getalluser'}`, 'payload':{"type": "shared"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
        })
        .catch(err=>{
            console.log(err)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'getalluser'}`, 'payload':{"type": "shared"}, 'response':[], 'error_details': err, 'status_code':'' }];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
        })
        getData(GETALLTAGS(tenantCname),(data)=>{
            setGetalltags(data)
            data.map((addin)=>(
                alltag.push(addin.tagid.toString())
            ))
            initialdatas()
        },(err)=>console.log(err),{},storage)

        setAutofillnumm("00000000000")
        setAdd((p) => ({...p,['calendar_num']:"00000000000"}))
      
    }, [])

    useEffect(() => {
    if (searchTableModule !== "") {
    axios.get("/"+tenantCname+"/api/"+searchTableModule, {
      headers:{
          "Accept": "application/JSON",
          "Authorization": "Bearer" + " " + localStorage.getItem('token')
      },
      params:{
        "order": [searchTableModule+"_name"] + ":" + "asc"
      }
    }
      
      )
      .then(res=>{
          setTable_d(res.data.data)
          logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"order": [searchTableModule+"_name"] + ":" + "asc"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
      })
      .catch(err=>{
          console.log(err)
          logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"order": [searchTableModule+"_name"] + ":" + "asc"}, 'response':[], 'error_details': err, 'status_code':'' }];
          if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
          }
      })
    }
    //   axios.get("/"+tenantCname+"/api/listview", {
    //         headers:{
    //             "Accept": "application/JSON",
    //             "Authorization": "Bearer" + " " + localStorage.getItem('token')
    //         },
    //         params:{
    //             "module":searchTableModule
    //         }   
    //     } 
    //    )
    //     .then(res=>{
    //         setTable_header(res.data.fields)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
        
    }, [searchTableModule, reset == true])
    
    
const viewSettings = {
    calendar: { labels: true }
};
const responsivePopup = {
    medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false
    }
};

const changeHandle =(e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setAdd({ ...add, [name]: value})
    // if(name === "activity_type"){setAdd({...add, ["activity_type"]: value})}else{setAdd({...add, ["activity_type"]: add.activity_typeid})}
    // if(name === "activity_status"){setAdd({...add, ["activity_status"]: value})}else{setAdd({...add, ["activity_status"]: add.activity_statusid})}
    if (e.target.type === 'checkbox') {setAdd({ ...add, [name]: e.target.checked })};
}

if (add.subject == null) {add.assign_to = localStorage.getItem("username")}
if (add.subject == null) {add.calendar_num = autofillnumm}


let custom = ""
const custombanao=()=>{
  Object.keys(blocke).map((k)=>(
    blocke[k].map((acc)=>(
      acc.fieldname !== "calendar_num" && acc.fieldname !== "source" && acc.fieldname !== "status" && acc.fieldname !== "start_datetime"
      && acc.fieldname !== "end_datetime" && acc.uitype !== 6 && acc.fieldname !== [module_name+"_country"] 
      && acc.fieldname !== [module_name+"_county"] && acc.fieldname !== "related_customer" && acc.fieldname !== "related_module" ?
        custom = {...custom, [acc.fieldname]: add[acc.fieldname]} : null,

        acc.uitype === 6 ?
            custom =  {...custom,[acc.fieldname] : row_value !== undefined && typeof(row_value) !== "string" ? row_value[1] : row_value} : null,

        // acc.fieldname === "activity_type" ?
        //     custom =  {...custom,[acc.fieldname] : (isEdit ? add["activity_typeid"] : add[acc.fieldname])} : null,

        // acc.fieldname === "activity_status" ?
        //     custom =  {...custom,[acc.fieldname] : (isEdit ? add["activity_statusid"] : add[acc.fieldname])} : null,

        acc.fieldname === "related_module" ?
            custom =  {...custom,[acc.fieldname] : searchTableModule} : null,

        acc.uitype === 100 ?
         acc.options.map((owner)=>(
           add[acc.fieldname] == [owner.firstname+" "+owner.lastname] ?
           custom = {...custom, ["ownerid"] : owner.userid} : null
         )) : null,

         acc.fieldname === "start_datetime" ?
         custom = {...custom, [acc.fieldname]: Moment(popupEventDate[0]).format("YYYY-MM-DD HH:mm")} : null,

         acc.fieldname === "end_datetime" ?
         custom = {...custom, [acc.fieldname]: Moment(popupEventDate[1]).format("YYYY-MM-DD HH:mm")} : null
    ) )
  ))

}
const closeModalError = () => {
    setAllowPostCall(true);
    setTimeout(() => {
      setSmShowError(false);
      setError_msg([]);
    }, 1000);
  };


const [allowPostCall, setAllowPostCall] = useState(true);
const saveapi = () => {
    if (allowPostCall === true) {
    let custom2 = ""
    if(custom.related_module === ""){
         custom2 = {custom3: (delete custom["related_record"], delete custom["related_module"], custom)}
    }else{
        custom2 = {custom3: (custom)}
    }
    custom2.custom3["createtime"] = Moment().format("YYYY-MM-DD HH:mm")
    custom2.custom3["modifiedtime"] = Moment().format("YYYY-MM-DD HH:mm")
    if(crv){
        custom2.custom3['related_module'] = crv;
        custom2.custom3['related_record'] = row_value[`related_${crv}id`]
    }



    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + localStorage.getItem('token')
      }
    axios.post("/"+tenantCname+"/api/calendar", 
            
          {
            "calendar_num": add.calendar_num,
                "custom": custom2.custom3,
                "source": "web app",
                "status": "1"
            },
          {
              headers: headers
            })
            .then((response) => {
              if(response.data[0] === undefined){
                // alert(
                //   Object.keys(response.data).map((keywords)=>(
                //     response.data[keywords]
                //   ))
                // )
                Object.keys(response.data).map((keywords)=>(
                    error_msg.push(response.data[keywords])
                  ))
                  setSmShowError(true)
                  setAllowPostCall(false); 
              }else{setOpen(false);}
              setIsSave(true)
              initialdatas()

                logData = [{...viewData, 'module_name': module_name, 'api': `/${'calendar'}`, 'payload':{
            "calendar_num": add.calendar_num,
                "custom": custom2.custom3,
                "source": "web app",
                "status": "1"
            }, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
            .catch((error) => {
              console.log(error)
              alert("Something Went Wrong")
              logData = [{...viewData, 'module_name': module_name, 'api': `/${'calendar'}`, 'payload':{
            "calendar_num": add.calendar_num,
                "custom": custom2.custom3,
                "source": "web app",
                "status": "1"
            }, 'response':[], 'error_details': error, 'status_code':'' }];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            })
}
 }

const updateapi = (id)=>{
    let custom2 = ""

    if(crv){
        custom = {...custom,'related_module':crv,'related_record':row_value[`related_${crv}id`]}
    }

    if(custom.related_module === ""){
         custom2 = {custom3: (delete custom["related_record"], delete custom["related_module"], custom)}
    }else{
        custom2 = {custom3: (custom)}
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + localStorage.getItem('token')
      }
      custom2.custom3["modifiedtime"] = Moment().format("YYYY-MM-DD HH:mm:ss")
      custom2.custom3["createtime"] = Moment(custom["createtime"], "DD-MM-YYYY hh:mm:ss").format('YYYY-MM-DD HH:MM:SS')
    axios.put("/"+tenantCname+"/api/calendars/"+id, 
        
      {
      "calendar_num": add.calendar_num,
      "custom": custom2.custom3,
      "source": "web app",
      "status": "1"
    },
      {
          headers: headers
        })
        .then((response) => {
          if(response.data[0] === undefined){
            // alert(
            //   Object.keys(response.data).map((keywords)=>(
            //     response.data[keywords]
            //   ))
            // )
            Object.keys(response.data).map((keywords)=>(
                error_msg.push(response.data[keywords])
              ))
              setSmShowError(true)
          }else{setOpen(false);}
          setIsSave(true)
          initialdatas()
          logData = [{...viewData, 'module_name': module_name, 'api': `/${'calendars'}`, 'payload':{
            "calendar_num": add.calendar_num,
            "custom": custom2.custom3,
            "source": "web app",
            "status": "1"
          }, 'response':response.data, 'status_code': response.status, 'error_details': ''}];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
        })
        .catch((error) => {
          console.log(error)
          alert("Something Went Wrong")
          logData = [{...viewData, 'module_name': module_name, 'api': `/${'calendars'}`, 'payload':{
            "calendar_num": add.calendar_num,
            "custom": custom2.custom3,
            "source": "web app",
            "status": "1"
          }, 'response':[], 'error_details': error, 'status_code':'' }];
          if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
          }
        })

}

const saveEvent = React.useCallback(() => {
    const newEvent = {
        id: tempEvent.id,
        title: popupEventTitle,
        description: popupEventDescription,
        start: popupEventDate[0],
        end: popupEventDate[1],
        allDay: popupEventAllDay,
        status: popupEventStatus,
        color: tempEvent.color,
        type: popupEventType,
        calendar_num: popupEventCalendar_num,
        subject: popupEventSubject,
        related_record: popupEventRelated_record,
        start_datetime: popupEventStart_datetime,
        related_module: popupEventRelated_module,
        // Start_time: popupEventStart_time,
        end_datetime: popupEventEnd_datetime,
        activity_type: popupEventActivity_type,
        // end_time: popupEventEnd_time,
        activity_status: popupEventActivity_status,
        assign_to: popupEventAssign_to
    };
    if (isEdit) {custombanao();
        // update the event in the list
        const index = myEvents.findIndex(x => x.id === tempEvent.id);
        const newEventList = [...myEvents];

        newEventList.splice(index, 1, newEvent);
        setMyEvents(newEventList);
        // here you can update the event in your storage as well
        // ...
        updateapi(tempEvent.id)
        
    } else {custombanao();
        // add the new event to the list
        setMyEvents([...myEvents, newEvent]);
        // here you can add the event to your storage as well
        // ...
        saveapi();
    }
    setSelectedDate(popupEventDate[0]);
    // close the popup
    // setOpen(false);
    
}, [isEdit, myEvents, popupEventAllDay, popupEventDate, popupEventDescription, popupEventStatus, popupEventTitle, tempEvent, 
    popupEventCalendar_num, popupEventSubject, popupEventRelated_record, popupEventStart_datetime, popupEventRelated_module, 
    popupEventStart_time, popupEventEnd_datetime, popupEventActivity_type, popupEventEnd_time, popupEventActivity_status, 
    popupEventAssign_to, add, row_value, searchTableModule]);

const deleteEvent = React.useCallback((event) => {
    setMyEvents(myEvents.filter(item => item.id !== event.id));
    setTimeout(() => {
        snackbar({
            button: {
                action: () => {
                    setMyEvents(prevEvents => [...prevEvents, event]);
                },
                text: 'Undo'
            },
            message: 'Event deleted'
        });
    });
}, [myEvents]);

const loadPopupForm = React.useCallback((event) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate([event.start, event.end]);
    setAllDay(event.allDay || false);
    setStatus(event.status || 'busy');
    setType(event.type)
    setCalendar_num(event.calendar_num);
    setSubject(event.subject);
    setRelated_record(event.related_record);
    setStart_date(event.start_datetime);
    setRelated_module(event.related_module);
    setStart_time(event.Start_time);
    setEnd_date(event.end_datetime);
    setActivity_type(event.activity_typeid);
    setEnd_time(event.end_time);
    setActivity_status(event.activity_statusid);
    setAssign_to(event.assign_to);
    setAdd({...event, ["activity_status"]: event.activity_statusid, ["activity_type"]: event.activity_typeid});
    setSearchTableModule(event.related_module || searchTableModule);
    setRow_value([event.related_record, event.related_recordid]);
    (event.related_module === "opportunity") && (event.activity_typeid === "174") ? setIsreadonly(true) : setIsreadonly(false)
    handleRelatedData(event)
}, []);

// handle popup form changes

// const typeChange = React.useCallback((ev) => {
//     setType(ev.target.value);
// }, []);

// const numChange = React.useCallback((ev) => {
//     setCalendar_num(ev.target.value);
// }, []);

// const subjectChange = React.useCallback((ev) => {
//     setSubject(ev.target.value);
// }, []);

// const related_recordChange = React.useCallback((ev) => {
//     setRelated_record(ev.target.value);
// }, []);

// const start_dateChange = React.useCallback((ev) => {
//     setStart_date(ev.target.value);
// }, []);

// const related_moduleChange = React.useCallback((ev) => {
//     setRelated_module(ev.target.value);
// }, []);

// const Start_timeChange = React.useCallback((ev) => {
//     setStart_time(ev.target.value);
// }, []);

// const end_dateChange = React.useCallback((ev) => {
//     setEnd_date(ev.target.value);
// }, []);

// const activity_typeChange = React.useCallback((ev) => {
//     setActivity_type(ev.target.value);
// }, []);

// const end_timeChange = React.useCallback((ev) => {
//     setEnd_time(ev.target.value);
// }, []);

// const activity_statusChange = React.useCallback((ev) => {
//     setActivity_status(ev.target.value);
// }, []);

// const assign_toChange = React.useCallback((ev) => {
//     setAssign_to(ev.target.value);
// }, []);

// const titleChange = React.useCallback((ev) => {
//     setTitle(ev.target.value);
// }, []);

// const descriptionChange = React.useCallback((ev) => {
//     setDescription(ev.target.value);
// }, []);

const allDayChange = React.useCallback((ev) => {
    setAllDay(ev.target.checked);
}, []);

const dateChange = React.useCallback((args) => {
    setDate(args.value);
}, []);

const statusChange = React.useCallback((ev) => {
    setStatus(ev.target.value);
}, []);

const changeHandle5 =(e) =>{
    setSearch_mobile(e.target.value)
}

const onDeleteClick = React.useCallback(() => {

    axios.delete("/"+tenantCname+"/api/calendars/"+tempEvent.id, {
            headers:{
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            }}
            
            )
        .then(res=>{
            setIsSave(true)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'calendars'}`, 'payload':{'id':tempEvent.id}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
        })
        .catch(err=>{
            console.log(err)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'calendars'}`, 'payload':{'id':tempEvent.id}, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })

    deleteEvent(tempEvent);
    setOpen(false);
}, [deleteEvent, tempEvent]);

// scheduler options

const onSelectedDateChange = React.useCallback((event) => {
    setSelectedDate(event.date);
});

const onEventClick = React.useCallback((args) => {
    localStorage.setItem("customerDetails", JSON.stringify({"opportunity_id": args.event.related_recordid}))
    setEdit(true);
    setTempEvent({ ...args.event });


    // fill popup form with event data
    loadPopupForm(args.event);
    setAnchor(args.domEvent.target);
    if ((args.event.related_module === "opportunity") && (args.event.activity_typeid === "0174")){
        setRcOpen(true);
    } else {
    setOpen(true);
    }
}, [loadPopupForm]);

const onEventCreated = React.useCallback((args) => {
    // createNewEvent(args.event, args.target)
    setEdit(false);
    setTempEvent(args.event)
    // fill popup form with event data
    loadPopupForm(args.event);
    setAnchor(args.target);
    // open the popup
    setOpen(true);
}, [loadPopupForm]);

const onEventDeleted = React.useCallback((args) => {
    deleteEvent(args.event)
}, [deleteEvent]);

const onEventUpdated = React.useCallback((args) => {
    // here you can update the event in your storage as well, after drag & drop or resize
    // ...
}, []);

// datepicker options
const controls = React.useMemo(() => popupEventAllDay ? ['calendar'] : ['calendar', 'time'], [popupEventAllDay]);
const respSetting = React.useMemo(() => popupEventAllDay ? {
    medium: {
        controls: ['calendar'],
        touchUi: true
    }
} : {
        medium: {
            controls: ['calendar', 'time'],
            touchUi: true
        }
    }, [popupEventAllDay]);

// popup options
const headerText = React.useMemo(() => isEdit ? 'Edit event' : 'New Calendar Entry', [isEdit]);
const popupButtons = React.useMemo(() => {
    if (isEdit) {
        return [
            'cancel',
            {
                handler: () => {
                    saveEvent();
                },
                keyCode: 'enter',
                text: 'Save',
                cssClass: 'mbsc-popup-button-primary'
            }
        ];
    }
    else {
        return [
            'cancel',
            {
                handler: () => {
                    saveEvent();
                    setIsSave(true);
                },
                keyCode: 'enter',
                text: 'Add',
                cssClass: 'mbsc-popup-button-primary'
            }
        ];
    }
}, [isEdit, saveEvent]);

const onClose = React.useCallback(() => {
    if (!isEdit) {
        // refresh the list, if add popup was canceled, to remove the temporary event
        setMyEvents([...myEvents]);
    }
    setOpen(false);
    setRcOpen(false);
    if(crv){
        delete row_value['related_' + crv]
        delete row_value['related_' + crv + 'id']
        delete row_value['cal_module']
        delete row_value['related_record']
        sCrv('');
}

}, [isEdit, myEvents]);

const boxClose = () => {
    setRcOpen(false)
    initialdatas()
}

    // React.useEffect(() => {
    //     getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
    //         setEvents(events);
    //     }, 'jsonp');
    // }, []);

    const [calView, setCalView] = React.useState(
        {
            calendar: { labels: true, popoverClass: 'pre' }
        }
    );

    const changeView = (event) => {
        let view;
        switch (event.target.value) {
            case 'month':
                view = {
                    calendar: { labels: true, popoverClass: 'pre' }
                };
                break;
            case 'week':
                view = {
                    calendar: { type: 'week' },
                    agenda: { type: 'week' }
                };
                break;
            case 'day':
                view = {
                    agenda: { type: 'day' }
                };
                break;
        }

        setView(event.target.value);
        setCalView(view);
    }
    
    const customWithNavButtons = () => {
        return <React.Fragment>
            <div className="left_icons_btns">                
                
                <div className="head_today_btn">
                    <div className="pgTitle"><span>Calendar</span></div>
                    <CalendarToday />
                </div>
                <div className="left_icon_ctrls">
                    <CalendarPrev className="cal-header-prev" />
                    <CalendarNext className="cal-header-next" />
                    <CalendarNav className="cal-header-nav" />
            </div>
        </div>
        <div className="swtch_nd_icons">
            <div className="cal-header-picker">
                <SegmentedGroup value={view} onChange={changeView}>
                    {
                        window.innerWidth >= 520 ?  
                    [<SegmentedItem value="month">Month</SegmentedItem>,
                    <SegmentedItem value="week">Week</SegmentedItem>,
                    <SegmentedItem value="day">Day</SegmentedItem>] :
                    <DropdownButton rootCloseEvent={''} id="dropdown-basic-button" className="mwdDropdown" title="View">
                        <SegmentedItem value="month">Month</SegmentedItem>
                        <SegmentedItem value="week">Week</SegmentedItem>
                        <SegmentedItem value="day">Day</SegmentedItem>
                    </DropdownButton>
                    }
                    
                </SegmentedGroup>
            </div>
            <div className="set_cal_icons">
                {/* <div> */}
                <DropdownButton rootCloseEvent={''}  className="calendar_pop" title={<img src={Group981} alt="Icon"></img>}>
                    <Datepicker
                        controls={['calendar']}
                        select="range"
                        calendarType="month"
                        pages={1}
                        display="inline"
                        touchUi={true}
                        responsive={respSetting}
                        onChange={rangeChange}
                        value={daterange}
                    /> 
                </DropdownButton>
                {/* </div> */}
                <div>
                <DropdownButton className="settings_pop" id="dropdown-basic-button" title={<i><IoMdSettings/></i>}>
                    <DropdownItem><IoMdSettings/>Settings</DropdownItem>
                    <DropdownItem><i class="fas fa-print"></i> Print</DropdownItem>
                </DropdownButton>  
                </div>
            </div>
            
        </div>
            
        </React.Fragment>;
    }

    const renderLabel = React.useCallback((data) => {
        if(data.isMultiDay) {
           return <div style={{background:data.original.color, color:'#000'}} className="multi-day-event">{data.original.title}</div>
        }
        else {
            return <React.Fragment>
                <div className="single-day-event-dot" style={{background:data.original.color}}></div>
                <div className="single-day-event" style={{background:data.original.color}}>{data.original.title}</div>
            </React.Fragment>
        }
      });

      const renderEventContent = React.useCallback((data) => {
        return <React.Fragment>
            <div className={data.isMultiDay == true ? "pree" : null}>{data.title}</div>
                {/* <div className="md-custom-event-cont">
                    <img className="md-custom-event-img" src={getParticipant(data.original.participant).img} />
                    <div className="mbsc-custom-event-name">{getParticipant(data.original.participant).name}</div>
                    <Button className="md-custom-event-btn" color="secondary" variant="outline" onClick={(domEvent) => add(domEvent, data.original)}>Add participant</Button>
                </div> */}
        </React.Fragment>
    });

      const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () =>{
         if(isreadonly === false && searchTableModule !== ""){
            setShow1(true);
            shifting()
            }
        }

    const mobilesearch = () =>{
        axios.get("/"+tenantCname+"/api/"+searchTableModule, {
            headers:{
                "Accept": "application/JSON",
                "Authorization": "Bearer" + " " + localStorage.getItem('token')
            },
            params:{
                "filter": search_mobile + "=" + input_mobile
            }
        }
            
            )
            .then(res=>{
                setTable_d(res.data.data)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": search_mobile + "=" + input_mobile}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                  if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                  }
            })
            .catch(err=>{
                console.log(err)
                logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": search_mobile + "=" + input_mobile}, 'response':[], 'error_details': err, 'status_code':'' }];
                if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                  recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                }
            })
    }

    const search_click = ()=>{
        axios.get("/"+tenantCname+"/api/"+searchTableModule, {
              headers:{
                  "Accept": "application/JSON",
                  "Authorization": "Bearer" + " " + localStorage.getItem('token')
              },
              params:{
                  "filter": JSON.stringify(search_value).replace(/[\{\}\"]/g,'').replace(/:/g,"=")
              }
          }
              
              )
              .then(res=>{
                  setTable_d(res.data.data)
                  setIsrest(true)
                  logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": JSON.stringify(search_value).replace(/[\{\}\"]/g,'').replace(/:/g,"=")}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
              })
              .catch(err=>{
                  console.log(err)
                  logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": JSON.stringify(search_value).replace(/[\{\}\"]/g,'').replace(/:/g,"=")}, 'response':[], 'error_details': err, 'status_code':'' }];
                  if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                  }
              })
              setReset(false)
      }

      const set_again=()=>{
        setReset(true)
        setIsrest(false)
        setSearch_value({
            customer_num : '',
        phone:"",
        email:"",
        customer_name:"",
        street_address:"",
        pobox:"",
        customer_city:"",
        customer_county:"",
        customer_country:"",
        post_code:"",
        assign_to:"",
        related_to: ''
        })
      }

      let [headerx, setHeaderx] = useState([
        // {
        //   header: "         ",
        //   inputx: [isrest == false ? <button key="b2" type="button" className="button_in_modal search_button" onClick={search_click}>Search</button> :
        //   <button key="b1" className="button_in_modal1 reset_button" onClick={set_again}>Reset</button>]
        // }
      ])

      let defaultActivitySDate = typeof(daterange) == "string" ? Moment(mySelectedDate).startOf('month').format("YYYY-MM-DD HH:mm:ss") : Moment(daterange[0]).format("YYYY-MM-DD HH:mm:ss")
      let defaultActivityEDate = typeof(daterange) == "string" ? Moment(mySelectedDate).endOf('month').format("YYYY-MM-DD HH:mm:ss") : Moment(daterange[1]).format("YYYY-MM-DD HH:mm:ss")

      const getallactivity = (info, id) => {
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" + " " + localStorage.getItem('token')
          }
        //   if (typeof(daterange) != "string"){
            axios.get("/"+tenantCname+"/api/getallactivity?sdate="+
            defaultActivitySDate+"&edate="+defaultActivityEDate,
        
        {
            headers: headers,
            params:{
                "id": alltag,
                "userids": allusers,
                "type": info,
                // "sdate": typeof(daterange) != "string" ? new Date(daterange[0]).toISOString().replace("T", " ").substr(0, 19) : null || Moment(mySelectedDate).startOf('month').subtract(7, 'days').format("YYYY-MM-DD HH:mm:ss"),
                // "edate": typeof(daterange) != "string" ? new Date(daterange[1]).toISOString().replace("T", " ").substr(0, 19) : null || Moment(mySelectedDate).endOf('month').add(7, 'days').format("YYYY-MM-DD HH:mm:ss")
            }
        }
       )
        .then(res=>{
            jhjh(res.data);
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'getallactivity'}`, 'payload':{"id": alltag,
                "userids": allusers,
                "type": info,}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
            
        })
        .catch(err=>{
            console.log(err)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'getallactivity'}`, 'payload':{"id": alltag,
                "userids": allusers,
                "type": info,}, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })
        // } 
      }

      const getallactivitytag = (info) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" + " " + localStorage.getItem('token')
          }
            axios.get("/"+tenantCname+"/api/getallactivity?sdate="+
            defaultActivitySDate+"&edate="+defaultActivityEDate,
        
        {
            headers: headers,
            params:{
                "id": alltag,
                "userids": allusers,
                "type": info
            }
        }
       )
        .then(res=>{
            let bhejo = []
            Object.keys(res.data).map((bhej, i)=>(
                Object.keys(res.data[bhej].data).map((bheji)=>(
                    bhejo.push(res.data[bhej].data[bheji])
                ))
            ))
            jhjh(bhejo);
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'getallactivity'}`, 'payload':{"id": alltag,
                "userids": allusers,
                "type": info}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
              if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
              }
        })
        .catch(err=>{
            console.log(err)
            logData = [{...viewData, 'module_name': module_name, 'api': `/${'getallactivity'}`, 'payload':{"id": alltag,
                "userids": allusers,
                "type": info}, 'response':[], 'error_details': err, 'status_code':'' }];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
        })
      }

    // { 
    //     Object.keys(getAllUser).map((gau, i)=>(
    //       localStorage.getItem("username") == getAllUser[gau].firstname+" "+getAllUser[gau].lastname ?
    //       allusers[i] != getAllUser[gau].userid ?
    //       (allusers.push(2), getallactivity("users")) : null : null
    //   ))
    // }

    const initialdatas = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer" + " " + localStorage.getItem('token')
          }
        
          axios.get("/"+tenantCname+"/api/getallactivity?sdate="+
          defaultActivitySDate+"&edate="+defaultActivityEDate,
      
      {
          headers: headers,
          params:{
              "id": alltag,
              "userids": allusers,
              "type": "taglist"
          }
      }
     )
      .then(res=>{
          let bhejo = []
            Object.keys(res.data).map((bhej, i)=>(
                Object.keys(res.data[bhej].data).map((bheji)=>(
                    bhejo.push(res.data[bhej].data[bheji])
                ))
            ))
            jhjh(bhejo);
          setIsSave(false)
          if(res.data === undefined){
            // alert(
            //   Object.keys(response.data).map((keywords)=>(
            //     response.data[keywords]
            //   ))
            // )
            Object.keys(res.data).map((keywords)=>(
              error_msg.push(res.data[keywords])
            ))
            setSmShowError(true)
          }
          logData = [{...viewData, 'module_name': module_name, 'api': `/${'getallactivity'}`, 'payload':{
              "id": alltag,
              "userids": allusers,
              "type": "taglist"
          }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
            }
      })
      .catch(err=>{
          console.log(err)
          logData = [{...viewData, 'module_name': module_name, 'api': `/${'getallactivity'}`, 'payload':{
              "id": alltag,
              "userids": allusers,
              "type": "taglist"
          }, 'response':[], 'error_details': err, 'status_code':'' }];
          if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
            recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
          }
      })

    //   axios.get("/"+tenantCname+"/api/fielddata", {
    //         headers:{
    //             "Accept": "application/JSON",
    //             "Authorization": "Bearer" + " " + localStorage.getItem('token')
    //         },
    //         params:{
    //             "module":"calendar"
    //         }   
    //     } 
    //    )
    //     .then(res=>{
    //         setAutofillnumm(res.data[0])
            
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     }) 

    }

    // const startTags = useMemo(()=>  alltag, [getalltags])

    //   useEffect(() => {
    //       if (allusers.length != 0 && startTags.length != 0){
    //         const headers = {
    //             'Content-Type': 'application/json',
    //             'Authorization': "Bearer" + " " + localStorage.getItem('token')
    //           }
    //             axios.get("/api/getallactivity?sdate="+
    //             defaultActivitySDate+"&edate="+defaultActivityEDate,
            
    //         {
    //             headers: headers,
    //             params:{
    //                 "id": startTags || [],
    //                 "type": "users"
    //                 // "sdate": typeof(daterange) != "string" ? new Date(daterange[0]).toISOString().replace("T", " ").substr(0, 19) : null,
    //                 // "edate": typeof(daterange) != "string" ? new Date(daterange[1]).toISOString().replace("T", " ").substr(0, 19) : null
    //             }
    //         }
    //        )
    //         .then(res=>{
    //             console.log(res)
    //             jhjh(res.data);
    //             setIsSave(false)
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //         })
    //       }
    //   }, [daterange, isSave, mySelectedDate, startTags])

    useEffect(() => {
        initialdatas()
    }, [daterange, isSave, mySelectedDate])

      const handleChange = (e)=>{
        setSearch_value(
          {[e.target.name]: e.target.value}
        )

        if(e.target.value.length >= 4){
            axios.get("/"+tenantCname+"/api/"+searchTableModule, {
                headers:{
                    "Accept": "application/JSON",
                    "Authorization": "Bearer" + " " + localStorage.getItem('token')
                },
                params:{
                    "filter": e.target.name+"="+e.target.value
                }
            }
                
                )
                .then(res=>{
                    setTable_d(res.data.data)
                    setIsrest(true)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": e.target.name+"="+e.target.value}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                      if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                        recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                      }
                })
                .catch(err=>{
                    console.log(err)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${searchTableModule}`, 'payload':{"filter": e.target.name+"="+e.target.value}, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
          }else if(e.target.value.length === 0){
            set_again()
          }

      }
      const rangeChange = React.useCallback((args) => {
        setDaterange(args.value);
    }, []);

    
    const userChange = (e)=>{
        if (e.target.type === 'checkbox' && e.target.checked == true){
        allusers.push(e.target.value)
        }else{
            allusers.splice(allusers.indexOf(e.target.value), 1) 
        }
        getallactivity("taglist")
      }

    const tagChange = (event)=>{
        if (event.target.type === 'checkbox' && event.target.checked == true){
            alltag.push(event.target.value)
            }else{
                alltag.splice(alltag.indexOf(event.target.value), 1) 
            }
        getallactivitytag("taglist")
      }

    const shifting=()=>{
        (table_header || []).slice(0).reverse().map((h, i)=>(
            ((h.listview == 1) && (h.fieldname == [searchTableModule+"_name"] || h.fieldname == "firstname" || h.fieldname == "lastname")) ?
            [
                 setHeaderx([
                {
                ["header"]: [h.fieldlabel, "         "],
                ["inputx"]: [
                            <input key={i} type="text" className="input_in_modal" name={h.fieldname} autoComplete="off"
                                defaultValue={search_value[h.fieldname] || ''} onChange={handleChange} placeholder={h.fieldlabel}>
                            </input>,
                            [isrest == false ? <button key="b2" type="button" className="button_in_modal search_button" onClick={search_click}>Search</button> :
                            <button key="b1" className="button_in_modal1 reset_button" onClick={set_again}>Reset</button>]
                            ]
                }
                
            ])] : null 
        ))
    }
    
    //  {table_header.slice(0).reverse().map((h, i)=>(
    //     ((h.listview == 1) && (h.fieldname == [searchTableModule+"_name"])) ?
    //      headerx.unshift({
    //         header: h.fieldlabel,
    //         inputx: <input key={i} type="text" className="input_in_modal" name={h.fieldname} 
    //                     defaultValue={search_value[h.fieldname] || ''} onChange={handleChange} placeholder={h.fieldlabel}>
    //                 </input>
    //     }
    //     )
    //      : null 
    // ))}

    const mibuttons= [
        {
            text: 'X',
            handler: 'cancel',
            icon: 'close',
            cssClass: 'my-btn'
        }
    ]


    return (
        <> <Header/>
        {/* {myEvents.length == 0 ? null : */}
        <div className="outerWrap calendar_wrapper">

            <div className={leftsegment ? "col-2 leftBar activeLeftbar active" : "col-2 leftBar active"}>
                <div className="topBar"> 
                <h3>Calendar</h3>
                </div>
                <div className="drop_wrap_outer">
                <div className="drop_wrap">
                    {/* <div className="activities">
                    <DropdownButton rootCloseEvent={''} id="dropdown-basic-button" title="My Activities">
                    <div className="prnt no_img">
                        <input type="checkbox" id="todo"></input>
                        <label htmlFor="todo">Todos</label>
                    </div>
                    <div className="prnt no_img">
                        <input type="checkbox" id="events"></input>
                        <label htmlFor="events">Events</label>
                    </div>
                    </DropdownButton>
                    
                </div> */}
                <div>

                <div className="tags">
                <DropdownButton rootCloseEvent={''} defaultShow={true} drop="down" id="dropdown-basic-button" title="My Activities">
                {
                    getalltags.map((gau)=>(
                        <div className="prnt">
                            <label htmlFor={gau.tagid+"T"}>
                            <div className="usr_img">
                            <img></img>
                            </div>
                                <input key={gau.tagid+"T"} type="checkbox" id={gau.tagid+"T"} value={gau.tagid}
                                defaultChecked='true' 
                                onChange={tagChange}></input>
                                <span className="checkmark" style={{backgroundColor: gau.color.replace(";", " ")}}></span>
                            {gau.tagname}
                            </label>
                        </div>
                    ))
                }
                </DropdownButton>
                </div>
                
                <div className="mt-1 users">
                <DropdownButton rootCloseEvent={''} defaultShow={true} id="dropdown-basic-button" title="Calendars">
                {
                    Object.keys(getAllUser).map((gau)=>(
                        <div className="prnt">
                            <label htmlFor={getAllUser[gau].userid}>
                            <div className="usr_img">
                            <img></img>
                            </div>
                            {
                                // localStorage.getItem("userid").toString() == getAllUser[gau].userid ? 
                                // [<input key={gau.userid} type="checkbox" checked id={getAllUser[gau].userid} value={getAllUser[gau].userid} onChange={userChange}></input>,
                                // <span className="checkmark" style={{backgroundColor: getAllUser[gau].color.replace(";", " ")}}></span>] : 
                                
                                [<input key={gau.userid} type="checkbox"
                                 defaultChecked={localStorage.getItem("userid").toString() == getAllUser[gau].userid ? true : false}
                                 id={getAllUser[gau].userid} value={getAllUser[gau].userid} onChange={userChange}></input>,
                                <span className="checkmark" style={{backgroundColor: getAllUser[gau].color.replace(";", " ")}}></span>]
                            }
                            {/* <input type="checkbox" id={getAllUser[gau].userid} value={getAllUser[gau].userid} onChange={userChange}></input> */}
                            {getAllUser[gau].firstname+" "+getAllUser[gau].lastname}</label>
                        </div>
                    ))
                }
                </DropdownButton>
                </div>
                
              </div>
                </div>
            </div>
            </div>
            <div className={leftsegment ? "calendarWrap mt-5 rightContent activeContent" : "calendarWrap mt-5 rightContent"}>
            <i className="menu_bar_icon2" id="LRtoggler" onClick={()=> setLeftsegment(!leftsegment)}><GiHamburgerMenu/></i>
                <div className="md-switching-view-cont">
                    <Eventcalendar
                    renderHeader={customWithNavButtons}
                    renderEventContent={renderEventContent}
                    view={calView}
                    data={myEvents}
                    clickToCreate="double"
                    dragToCreate={true}
                    dragToMove={true}
                    dragToResize={true}
                    selectedDate={mySelectedDate}
                    onSelectedDateChange={onSelectedDateChange}
                    onEventClick={onEventClick}
                    onEventCreated={onEventCreated}
                    onEventDeleted={onEventDeleted}
                    onEventUpdated={onEventUpdated}
                    theme="ios"
                    themeVariant="light"
                    dateFormat="DD-MM-YYYY"
                    timeFormat="HH:mm"
                />
                <Popup
                    display="center"
                    fullScreen={true}
                    contentPadding={false}
                    headerText="Edit Opportunity"
                    isOpen={isRcOpen}
                    onClose={onClose}
                    responsive={responsivePopup}
                    cssClass="related_create_cal"
                    scrollLock={false}
                    buttons={['cancel']}
                >
                    <OpCreatePage himmat={isTick} yes={true} closeBox={() => boxClose()} />
                </Popup>
                <Popup
                    display="bottom"
                    fullScreen={true}
                    contentPadding={false}
                    headerText={headerText}
                    anchor={anchor}
                    buttons={popupButtons}
                    isOpen={isOpen}
                    onClose={onClose}
                    responsive={responsivePopup}
                >
            <div className="mbsc-form-group">
                {
                    Object.keys(blocke).map((k)=>(
                        [
                            blocke[k].map((acc, i)=>(
                                acc.show_hide_criteria == 1 ?
                                [acc.uitype != 6 && acc.uitype != 9 && acc.uitype != 100 && acc.uitype != 2 && acc.uitype != 3 && acc.uitype != 14 ?
                                <Input label={acc.fieldlabel+(acc.mandatory == 1 ? " *" : "")} 
                                name={acc.fieldname} value={add[acc.fieldname]} onChange={changeHandle} /> : null,

                                acc.uitype == 3 ?
                                <Textarea label={acc.fieldlabel+(acc.mandatory == 1 ? " *" : "")} 
                                name={acc.fieldname} value={add[acc.fieldname]} onChange={changeHandle} /> : null,

                                acc.uitype == 6 ? 
                                [
                                  <Input type="text" 
                                  className="readonly"
                                  label={acc.fieldlabel+(acc.mandatory == 1 ? " *" : "")}
                                  key={acc.fieldlabel}
                                  readOnly
                                  name={acc.fieldname} 
                                  value={row_value != undefined && typeof(row_value) != "string" ? row_value[0] : row_value || add[acc.fieldname]}
                                  onChange={(e)=> setRow_value(add.related_to = e.target.value)} placeholder="">
                                  </Input>,
                                  
                                  <div className="search_popup">
                                      {acc.relatedto.length >= 2 ?
                                      <Form.Control as="select" defaultValue={searchTableModule} 
                                        onChange={(e)=> setSearchTableModule(e.target.value)}
                                        disabled={isreadonly ? true : false} size="sm" className="choose_select">
                                      <option hidden>Select</option>
                                      {
                                          acc.relatedto.map((ye, i)=>(
                                            <option className="option" key={i} value={ye}>
                                                {ye === "customer" ? "Accounts" : ye === "contact" ? "Contacts" : ye === "venue" ? "Venues" : ye === "opportunity" ? "Opportunities" : ye}
                                            </option>
                                          ))
                                      }
                                      </Form.Control>
                                    : null}
                                  <div className="plus" onClick={handleShow1}><i><CgSearch/></i></div>
                                  </div>,
                                  <div className="relatedToLink">
                                      <Link target='_self' to={"/home/calendar/detail/"+add.id} >More informations...</Link>
                                  </div>
                                ]  : null,

                                  acc.uitype == 2 ?
                                  [<div className="type"> 
                                    <label className="assigntolabel">{acc.fieldlabel+(acc.mandatory == 1 ? " *" : "")}</label>
                                    <select name={acc.fieldname} value={add[acc.fieldname]} onChange={changeHandle} disabled={(isreadonly && (acc.fieldname === "activity_type")) ? true : false}>
                                
                                        {/* <option hidden>{add[acc.fieldname]}</option> */}
                                        <option hidden>Select</option> 
                                    {
                                        (acc.options).map((option)=>(
                                        <option key={option.picklistvalue} value={option.picklistvalue}>
                                            {option.picklistlabel}
                                        </option>
                                        ))
                                    }
                                    </select> 
                                  </div>] : null,

                                acc.uitype == 100 ?
                                [<div className="assignTo">
                                    <label className="assigntolabel">{acc.fieldlabel+(acc.mandatory == 1 ? " *" : "")}</label>
                                <select className="assigntoselect" name={acc.fieldname} defaultValue={add[acc.fieldname]} onChange={changeHandle}>
                            
                                   {/* <option hidden>{add[acc.fieldname]}</option>  */}
                                {
                                  (acc.options).map((option)=>(
                                  <option key={option.userid} defaultValue={add[acc.fieldname]}>
                                    {option.firstname} {option.lastname}
                                  </option>
                                  ))
                                }
                                </select>
                                </div> ] : null,

                                acc.uitype == 14 ? 
                                [<div className="mbsc-flex">
                                <label className="assigntolabel">{acc.fieldlabel+(acc.mandatory == 1 ? " *" : "")}</label>
                                <div className="assigntoselect"><Uitype14 isEdit={isEdit} acc={acc} sCrv={sCrv} add={add} setShow2={setShow2} isreadonly={isreadonly} rst={true} /> </div>
                                
                            </div> ] : null
                                ]
                                : null
                            ))
                        ]
                    ))
                }
                {/* <Input label="Title" value={popupEventTitle} onChange={titleChange} />
                <Input label="Type" value={popupEventType} onChange={typeChange} />
                <Textarea label="Description" value={popupEventDescription} onChange={descriptionChange} />
                <Input label="Calendar Ref" value={popupEventCalendar_num} onChange={numChange} readOnly />
                <Input label="Subject" value={popupEventSubject} onChange={subjectChange} />
                <Input label="Related Record" value={popupEventRelated_record} onChange={related_recordChange} />
                <Input label="Start Date" value={popupEventStart_datetime} onChange={start_dateChange} />
                <Input label="Related Module" value={popupEventRelated_module} onChange={related_moduleChange} />
                <Input label="Start Time" value={popupEventStart_time} onChange={Start_timeChange} />
                <Input label="End Date" value={popupEventEnd_datetime} onChange={end_dateChange} />
                <Input label="Activity Type" value={popupEventActivity_type} onChange={activity_typeChange} />
                <Input label="End Time" value={popupEventEnd_time} onChange={end_timeChange} />
                <Input label="Activity Status" value={popupEventActivity_status} onChange={activity_statusChange} />
                <Input label="Assigned To" value={popupEventAssign_to || localStorage.getItem("username")} onChange={assign_toChange} /> */}
            </div>
            <div className="mbsc-form-group">
                <Switch label="All-day" checked={popupEventAllDay} onChange={allDayChange} />
                <Input ref={startRef} label={"Starts *"} />
                <Input ref={endRef} label={"Ends"} />
                <Datepicker
                    select="range"
                    controls={controls}
                    dateFormat="DD-MM-YYYY"
                    timeFormat="HH:mm"
                    startInput={start}
                    endInput={end}
                    display="anchored"
                    responsive={respSetting}
                    onChange={dateChange}
                    value={popupEventDate}
                />
                {/* <SegmentedGroup onChange={statusChange}>
                    <SegmentedItem value="busy" checked={popupEventStatus === 'busy'}>Show as busy</SegmentedItem>
                    <SegmentedItem value="free" checked={popupEventStatus === 'free'}>Show as free</SegmentedItem>
                </SegmentedGroup> */}
                {isEdit && (isreadonly === false) ? <div className="mbsc-button-group"><Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete event</Button></div> : null}
            </div>
        </Popup>
        </div>
            </div>
            
        </div>
            

{/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx modal for related to search xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        <Popup
        // headerText={searchTableModule}
        // buttons={mibuttons}
        display="center"
        touchUi={true}
        contentPadding={true}
        isOpen={show1}
        onClose={handleClose1}
        responsive={responsivePopup}
        cssClass="mobipopup"
        minHeight="350"
        maxWidth="350"
        scrollLock={false}
        >
        
            <div className="chart_top p-0">
                <div className="miheader">
                    <h4><Trans>{searchTableModule}</Trans></h4>
                    <h5 onClick={handleClose1}>X</h5>
                    <hr></hr>
                </div>
                
                <div className="chart_table_wrap customer_table">
                    <div className="global_filter">
                        <select className="float-left" name="search_mobile" defaultValue={search_mobile} onChange={changeHandle5}>
                            <option className="option">Search by</option>
                            {
                               headerx.map((hdx, i)=>(
                                <option className="option" key={i} value={hdx.inputx}>{hdx.header}</option>
                                ))
                            }
                        </select>
                        <div className="search_box">
                            <input className="float-left" type="text" placeholder="Enter your Search" 
                                onChange={(e)=>{setInput_mobile(e.target.value)}}></input>
                            <span onClick={mobilesearch}><i><CgSearch/></i></span>
                        </div>
                    </div>
                    <table className="table table-bordered table-hover">
                    <thead>
                        <tr role="row">
                        {
                            (headerx || []).map((hdx, i)=>(
                            <th key={i} colSpan="1" role="columnheader">
                            {hdx.header}
                            <div className=" filter">{hdx.inputx}</div>
                            </th>
                            ))
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (table_d || []).map((d, i)=>(
                            
                            <tr key={i} onClick={()=>{setRow_value([d[searchTableModule+"_name"], d[searchTableModule+"id"]]); setShow1(false)}}>
                            {
                            (table_header || []).map((head, i)=>(
                                head.listview == 1 ? head.fieldname == searchTableModule+"_name" || head.fieldname == "firstname" || head.fieldname == "lastname" ?
                                <td key={i} data-title={head.fieldlabel}>{d[head.fieldname]}</td>
                                : null : null
                            ))
                            }
                            <td></td>
                            </tr>
                            ))
                        }
                    </tbody>
                    </table>
            </div>
          </div>
      </Popup>
{/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx modal for left segment xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      <Modal show={showr} onHide={handleCloser} className="menu_modal" autoFocus={false} backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title>Range</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="mt-3">
                <Datepicker
                    controls={['calendar']}
                    select="range"
                    calendarType="month"
                    pages={1}
                    display="inline"
                    touchUi={true}
                    responsive={respSetting}
                    onChange={rangeChange}
                    value={daterange}
                /> 
                </div>
                
                <div className="mt-1 users">
                <DropdownButton rootCloseEvent={''} defaultShow={true} id="dropdown-basic-button" title="Users">
                {
                    // getAllUser.map((gau)=>(
                    //     <div className="prnt">
                    //         <div className="usr_img">
                    //         <image>img</image>
                    //         </div>
                    //         <input type="checkbox" id={gau.userid} value={gau.userid} onChange={userChange}></input>
                    //         <label htmlFor={gau.userid}>{gau.firstname+" "+gau.lastname}</label>
                    //     </div>
                    // ))
                }
                </DropdownButton>
                </div>
                <div className="mt-2 tags">
                <DropdownButton rootCloseEvent={''} defaultShow={true} id="dropdown-basic-button" title="Tags">
                {
                    getalltags.map((gau)=>(
                        <div className="prnt">
                            <div className="usr_img">
                            <image>img</image>
                            </div>
                            <input type="checkbox" id={gau.tagid+"T"} value={gau.tagid}
                            defaultChecked={(alltag || []).indexOf(gau.tagid) > -1 ? true : false}
                             onChange={tagChange}></input>
                            <label htmlFor={gau.tagid+"T"}>{gau.tagname}</label>
                        </div>
                    ))
                }
                </DropdownButton>
                </div>
            </Modal.Body>
        </Modal>

{/* Modal for Error message xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                <Modal
                    size="sm"
                    show={smShowError}
                    onHide={closeModalError}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm" style={{"color": "red"}}>
                        <Trans>Error</Trans>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{error_msg.map((para)=> (<li style={{"color": "brown", "font-size": "12px"}}>{para}</li>))}</Modal.Body>
                </Modal>

{/* Modal for searchtable module......... */}

 <Modal show={show2} onHide={()=>setShow2(false)} className="modal_delete fade small_modal modal model-zindex-c">
                  <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>Please select Module first</h5>
                  </Modal.Body>
                </Modal>

                <Footer/>   </>
    )
}

export default Calendar;
