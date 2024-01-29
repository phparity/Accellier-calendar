import React, { useState, useEffect, useMemo, useRef, createContext } from 'react'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { Modal, Button } from "react-bootstrap"
import { useTable, useRowSelect, useGlobalFilter, useFilters } from 'react-table'
import { IndeterminateCheckbox } from '../middleware/IndeterminateCheckbox'
import "../assets/style/CustomerList.css"
import { Trans } from 'react-i18next';
import i18n from "../config/i18n"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdModeEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import { IoMdEye } from "react-icons/io"
import { FaCopy } from 'react-icons/fa';
import { CgSearch } from "react-icons/cg"
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Moment from 'moment';
import { useLocation } from 'react-router';
import ActionDropdown from './ActionDropdown'
import Pagination from './Pagination'
import useGetReq from "../service/useGetReq";
import useDeleteReq from "../service/useDeleteReq";
import MoreDropDown from './MoreDropDown'
import { CURRENTPAGEDATAAPI, CUS_LIST_DSC_API, DELETERECORD, DELETERELATEDMODULE, DELETERELATEDMODULE1, LISTREPORTDATA, LISTVIEWAPI, MOB_R_LIST_API, MOB_R_LIST_HISTORY_API, MOB_SEARCH_R_LIST_API, RESET_CUS_LIST_API, R_LIST_API, R_LIST_DSC_API, R_LIST_HISTORY_API, R_LIST_HISTORY_ASC_API, R_LIST_HISTORY_DSC_API, SEARCH_CUS_LIST_API, SORT_CUS_DATA, SEARCHREPORT_CUS_LIST_API } from '../service/ApiPath'
import {CheckModuleName, Markchange, Markchange1, PrevModuleName} from "../utils/CheckModuleName"
import { useContext } from 'react'
import { AuthContext } from '../config/Authentications/AuthContext'
import useFetch from '../service/GetApiResponse'
import { Param } from './Params'
import { d_table } from '../pages/CustomerList'
import RelatedTableDateField from './DateModalForRelatedTable/RelatedTableDateField'
import { opCreatePageData ,searchTableModuleValue} from '../navigation/PageRoutes'
import ShowErrorMsg from './ShowErrorMsg'
import flatted from 'flatted';

import useStorage from '../service/useStorage'

export const UpdateCustList = createContext();
export const UpdateDetails = createContext();
export const selecet_Rows = createContext();
const DataTable = (props)=> {
    const storage = useStorage();

  const {smShowError, setSmShowError,error_msg, setError_msg } = useContext(searchTableModuleValue)

    const {authState,setAuthState} = useContext(AuthContext)
    const { current_pages, setCurrent_pages} = useContext(d_table)
    const tenantCname = authState.tenant_cname
    const { valuex, setValuex } = useContext(opCreatePageData)
    const [cuslist, setCuslist] = useState([]);
    const [details, setDetails] = useState({})
    // const [valuex, setValuex] = useState({})
    const [search_mobile, setSearch_mobile] = useState('')
    const [input_mobile, setInput_mobile] = useState('')
    const [show3, setShow3] = useState(false);
    const [table_header, setTable_header] = useState([])
    const [cusid, setCusid] = useState("")
    const [cus_selected_name, setCus_selected_name] = useState("")
    const [noofdata, setNoofdata] = useState("")
    const [isrest, setIsrest] = useState(false)
    const [sortTrue, setSortTrue] = useState(false)
    const [resetData, setResetData] = useState(false)
    const [offset, setOffset] = useState(authState.page || 1);
    const [adminpermission, setAdminpermission] = useState(true)
    const [importSample, setImportSample] = useState("")
    const prevModuleValue = useRef("")
    const [getData] = useGetReq();
    const [deleteData] = useDeleteReq();
    const [listViewApiData, setListViewApiData] = useState("")
    const [currentPageData, setCurrentPageData] = useState("")
    const [listReportData, setListReportData] = useState("")
    const [CustomerListData, setCustomerListData] = useState('')
    const [resetCustomerListData, setResetCustomerListData] = useState('')
    const [mobileSearchData, setMobileSearchData] = useState('')
    const [sortData, setSortData] = useState('')
    const [descsortData, setDescSortData] = useState('')
    const [accrValue, setAccrValue] = useState('')
    const [adValue, setAdvalue] = useState('')
    const [dtRelatedModule, setDtRelatedModule] = useState('')
    const [dtRelatedModule1, setDtRelatedModule1] = useState('')
    const [rListHistoryData, setRListHistoryData] = useState('')
    const [rListData, setRListData] = useState('')
    const [r_List_Data, setR_List_Data] = useState('')
    const [r_List_asc_Data, setR_List_asc_Data] = useState('')
    const [rList_desc_Data, setRList_desc_Data] = useState('')
    const [rListHistory_desc_Data, setRListHistory_desc_Data] = useState('')
    const [cusList_desc_Data, setCusList_desc_Data] = useState('')
    const [err, setErr] = useState("")
    const [showMsg, setShowMsg] = useState("")
    const [related_module, setRelated_module] = useState(authState.relatedmodule)
    const [progres_value, setProgres_value] = useState("")
    const [seen, setSeen] = useState(new Set());
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    // const [isrestApi, setIsrestApi] = useState(false)
    // console.log("9111",authState)

    useEffect(()=>{
        const handleBeforeUnload = (e)=>{
    //    e.preventDefault();
    //    e.returnValue = "";
            localStorage.setItem("page",1)
        }
        window.addEventListener("beforeunload", handleBeforeUnload);
        return ()=>{
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    },[])
 
    const handleClose3 = () => {
        setShow3(false);
    }
    const lang = authState.language
    let { pvid } = useParams();
    let  prev_module_name  = PrevModuleName()

    if (lang) {
        i18n.changeLanguage(lang)
    }


    let module_name = CheckModuleName()
    const handleQueryString = useLocation().search;
   

    let nice = ""

    useEffect(()=>{
        localStorage.removeItem("relatedmodule")
        localStorage.removeItem("prev_c_id")
        localStorage.removeItem("c_id")
        setAuthState({...authState,duplicate:''})
    },[module_name])

    useEffect(() => {
        prevModuleValue.current = module_name
        nice = handleQueryString.replace('?', '').replace(/%20/g, " ")
    }, [module_name])

//   let valuexy = JSON.stringify(valuex).replace(/[\{\}\"]/g, '').replace(/:/g, "=").replace(/,/g, "@")

  let valuexy = Object.entries(valuex)
    .map(([key, value]) => `${key}=${value.replace(/,/g, '')}`)
    .join(valuex.length > 1 ? ',' : '&');
    
   const data1= Param.data5(module_name)
   const data3= Param.data7(authState.page,authState.line,authState.roleid,authState.userid)
    let data2= Param.data6(authState.onClickMenuModule,module_name,authState.page,authState.line,details.per_page)
    let data4= Param.data8(valuexy,authState.order,authState.line)
    let data5= Param.data9(authState.page,details.per_page,authState.line)
    let data6= Param.data10(search_mobile,input_mobile,authState.order,authState.line)
    let data7= Param.data11(accrValue,valuexy,authState.page,authState.line)
    let data9= Param.data12(authState.prev_module_name,pvid,search_mobile,input_mobile,authState.order,authState.line)
    let data10= Param.data13(prev_module_name, related_module,pvid,search_mobile,input_mobile,authState.order,authState.line)
    let data16= Param.data19(accrValue,valuexy,authState.page,authState.line, module_name)

    // useEffect(()=>{
        // commented because getting back to last filtered list afer editing some record
    //     setValuex("")
    // },[module_name])

    const filterIsrest = localStorage.getItem("filterIsrest");
    useEffect(() => {
      // Set isrest based on filterIsrest when the component mounts
    if(filterIsrest === "true"){
       reset();
       localStorage.removeItem("filterIsrest");
    }
    }, [isrest]);

  const mod_nameValuexy = localStorage.getItem("prev_module_name");
  const prevModNameRef = useRef(mod_nameValuexy);

useEffect(() => {
    // console.log("aaa",prevModNameRef.current,"222",mod_nameValuexy)
  if (prevModNameRef.current !== mod_nameValuexy) {
  setSortTrue(false)
  reset()
  }
  
  prevModNameRef.current = mod_nameValuexy;
}, [mod_nameValuexy]); 

    const filterPageData = localStorage.getItem("filterPage1");
    const pageDataFromLocalStorage = localStorage.getItem("pageData");

    useEffect(() => {
        // first page data
        if (currentPageData) {
            setCurrent_pages(currentPageData?.current_page);
            setAuthState({ ...authState, customerDetails: '' });
            setAdminpermission(true);
    
            if (pageDataFromLocalStorage !== null) {
                const parsedPageData = JSON.parse(pageDataFromLocalStorage);
                setCuslist(parsedPageData);
           if (prevModuleValue.current !== mod_nameValuexy) {
               setIsrest(false);
              } 
            else if (valuex !=="") {
              setIsrest(true);
              }
             }
             else if(localStorage.getItem("filterPage1")?.length > 0) {
                setCuslist(JSON.parse(localStorage.getItem("filterPage1")));
                setIsrest(true);
              } 
            else {
                setCuslist(currentPageData.data);
                setIsrest(false);

            }
    
            setDetails(currentPageData);
    
            setTimeout(() => {
                setShowMsg(true);
            }, 1000);
    
            if (err) {
                setCuslist([]);
            }
        }
    }, [currentPageData, module_name]);

    // useEffect(()=>{
    //     // first page data
    //     if (currentPageData) {
    //         setCurrent_pages(currentPageData?.current_page)
    //         setAuthState({ ...authState, customerDetails: '' })
    //         setAdminpermission(true)
    //         setCuslist(currentPageData.data)
    //         setDetails(currentPageData)
    //         setIsrest(false)
    //         setTimeout(()=>{
    //             setShowMsg(true)
    //         },1000)

    //         if (err) {
    //             setCuslist([])
    //         }
    //     }
    // },[currentPageData, module_name])

    useEffect(()=>{
        
        if (CustomerListData) {
            CustomerListData.from == null && CustomerListData.to == null ? alert("No Record(s) Found") :
            setCuslist(CustomerListData?.data)
            setDetails(CustomerListData)
            // setIsrest(true)
            // setValuex({})
            if (err) {
                console.log(err)
            }
        }
    },[CustomerListData])
 
    useEffect(() => {
        if (listViewApiData) {
            setTable_header(listViewApiData?.fields.sort((a, b) => a.listsequence - b.listsequence))
            setImportSample(listViewApiData?.sample_file)

        }

        if (listReportData) {
            setCuslist(listReportData.data)
            setDetails(listReportData)
            setAuthState({ ...authState, customerDetails: '' })
        }
        if (err) {
            setCuslist([])
        }

        if (resetCustomerListData && resetData) {
            setCuslist(resetCustomerListData.data)
            setDetails(resetCustomerListData)
            // setIsrest(true)
            localStorage.removeItem("filterPage1")
            localStorage.removeItem("pageData")
            // props.resetH("false")
            if (err) {
                console.log(err)
            }
        }

        if (mobileSearchData) {
            mobileSearchData.from == null && mobileSearchData.to == null ? alert("No Record(s) Found") :
            setCuslist(mobileSearchData.data)
            setDetails(mobileSearchData)
            setIsrest(true)
            // setValuex({})
            if (err) {
                console.log(err)
            }
        }

        if (sortData && adValue === "asc" && sortTrue) {
            setCuslist(sortData.data)
            setDetails(sortData)
        }
        if (descsortData && adValue === "desc" && sortTrue) {
            setCuslist(descsortData.data)
            setDetails(descsortData)
            setAuthState({ ...authState, order: accrValue + ":" + adValue })
        }
        if (dtRelatedModule) {
            setShow3(false);
            window.location.reload()
        }
        if (rListHistoryData) {
            rListHistoryData == null ? alert("No Record(s) Found") :
            setCuslist(rListHistoryData)
            setDetails(rListHistoryData)
            setIsrest(true)
        }
        if (rListData) {
            rListData == null ? alert("No Record(s) Found") :
            setCuslist(rListData.data)
            setDetails(rListData)
            setIsrest(true)
        }
       
        if (cusList_desc_Data) {
              setCuslist(cusList_desc_Data.data)
            setDetails(cusList_desc_Data)
            setAuthState({ ...authState, order: accrValue + ":" + adValue })

        }
        if (localStorage.getItem("onClickMenuModule") != module_name) {
            // setOffset(1);
            setCurrent_pages(1);
            localStorage.setItem("page", 1)
        }
     
    }, [descsortData,sortData,resetCustomerListData,cusList_desc_Data, rList_desc_Data, rListHistory_desc_Data, r_List_Data, r_List_asc_Data, rListData, rListHistoryData, listViewApiData, currentPageData, listReportData])

    useFetch(LISTVIEWAPI(tenantCname),setListViewApiData,setErr,data1)
    useFetch(CURRENTPAGEDATAAPI(tenantCname,module_name),setCurrentPageData,setErr,data2)
    useFetch(LISTREPORTDATA(tenantCname,module_name),setListReportData,setErr,data3) 

    const handleEdit = (row) => {
        setAuthState({...authState,customerid:row.customerid,customerDetails:JSON.stringify(row),c_id:'' ,prev_c_id:row.customerid,prev_module_name2:module_name, reportId: row.reportid, said: row.sa_id})
        (module_name === "report" ? (localStorage.setItem('reportId', row.reportid), localStorage.setItem('said', row.sa_id)) : '')
    }

    const duplicate = (row) => {       
        setAuthState({...authState,duplicate:JSON.stringify(row), c_id:'', customerDetails:''})
    }

    const handleDelete = (row) => {
        setShow3(true)
        setCusid(row[module_name + "id"])
        setCus_selected_name(row[module_name + "_name"])
    }

    let linkChangeForOpportunity = ""
    let linkChangeForOpportunity2 = ""
    if ((module_name === "opportunity") || (module_name === "invoice") || (module_name === "supplierorder") || (module_name == "supplierorderreturn")) {
        let markchange = Markchange(module_name)
      if(markchange ==="opportunity"){
        markchange="opportunities"
      }
        linkChangeForOpportunity = "/home/" + markchange + "/add-edit-op"
        linkChangeForOpportunity2 = "/home/" + markchange + "/detail-op/"
    } else if(module_name === "report"){
        let markchange = Markchange1(module_name)
        
        linkChangeForOpportunity = "/home/" + markchange + "/add-edit-report/"
        linkChangeForOpportunity2 = "/home/" + markchange + "/reportdetails/"
    }
    else {
        let markchange = Markchange1(module_name)

        linkChangeForOpportunity = "/home/" + markchange + "/add-edit"
        linkChangeForOpportunity2 = "/home/" + markchange + "/detail/"
    }

    let COLUMNS = [
        {
            Header: 'Actions',
            accessor: 'type',
            button: "button",
            show: false,
            Cell: (accessor) => {
                if (accessor.value == 4) {
                    return <>
                        <div className="act_icons">
                            <Link target='_self' to={module_name === "report" ? linkChangeForOpportunity + accessor?.row?.original?.sa_id : linkChangeForOpportunity} data-tooltip="Edit" className='tool'><i onClick={() => handleEdit(accessor.row.original)}><MdModeEdit /></i></Link>
                            {module_name !== "report" ? <Link target='_self' to={linkChangeForOpportunity} data-tooltip="Duplicate" className='tool'  ><i onClick={() => duplicate(accessor.row.original[module_name + "id"])}><FaCopy /></i></Link>  : null} 
                            <Link target='_self' to={module_name === "report" ? (linkChangeForOpportunity2 + accessor?.row?.original?.reportid) : (linkChangeForOpportunity2 + accessor.row.original[module_name + "id"])} data-tooltip="Detail View"  className='tool' ><i onClick={() => handleEdit(accessor.row.original)}><IoMdEye /></i></Link>
                            <i style={{cursor:"pointer"}}  onClick={() => handleDelete(accessor.row.original)} data-tooltip="Delete" className='tool delete_icon'><MdDelete /></i>
                        </div>
                        <div className="mobile_visible">
                            <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><BsThreeDotsVertical /></i>}>
                                <Dropdown.Item href={module_name === "report" ? "#" + linkChangeForOpportunity + accessor?.row?.original?.sa_id : "#" + linkChangeForOpportunity} onClick={() => handleEdit(accessor.row.original)}><i><MdModeEdit /></i>Edit <Trans>{module_name}</Trans></Dropdown.Item>
                                {module_name !== "report" ? <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => duplicate(accessor.row.original[module_name + "id"])}><i><FaCopy /></i>Create Duplicate</Dropdown.Item>  : null} 
                                <Dropdown.Item href={module_name === "report" ? ("#" + linkChangeForOpportunity2 + accessor?.row?.original?.reportid) : ("#" + linkChangeForOpportunity2 + accessor.row.original[module_name + "id"])} onClick={() => handleEdit(accessor.row.original)}><i><IoMdEye /></i>View <Trans>{module_name}</Trans></Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => handleDelete(accessor.row.original)}><i className="del_icons"><MdDelete /></i>Delete <Trans>{module_name}</Trans></Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </>
                }
                else if (accessor.value == 3) {
                    return <> <div className="act_icons">
                        <Link target='_self' to={module_name === "report" ? linkChangeForOpportunity + accessor?.row?.original?.sa_id : linkChangeForOpportunity} data-tooltip="Edit" ><i onClick={() => handleEdit(accessor.row.original)}><MdModeEdit /></i></Link>
                        {module_name !== "report" ?<Link target='_self' to={linkChangeForOpportunity} data-tooltip="Duplicate" ><i onClick={() => duplicate(accessor.row.original[module_name + "id"])}><FaCopy /></i></Link>  : null} 
                        <Link target='_self' to={module_name === "report" ? (linkChangeForOpportunity2 + accessor?.row?.original?.reportid) : (linkChangeForOpportunity2 + accessor.row.original[module_name + "id"])} data-tooltip="Detail View" ><i onClick={() => handleEdit(accessor.row.original)}><IoMdEye /></i></Link>
                    </div>
                        <div className="mobile_visible">
                            <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><BsThreeDotsVertical /></i>}>
                                <Dropdown.Item href={module_name === "report" ? "#" + linkChangeForOpportunity + accessor?.row?.original?.sa_id : "#" + linkChangeForOpportunity} onClick={() => handleEdit(accessor.row.original)}><i><MdModeEdit /></i>Edit <Trans>{module_name}</Trans></Dropdown.Item>
                                {module_name !== "report" ?  <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => duplicate(accessor.row.original[module_name + "id"])}><i><FaCopy /></i>Create Duplicate</Dropdown.Item>  : null} 
                                <Dropdown.Item href={module_name === "report" ? ("#" + linkChangeForOpportunity2 + accessor?.row?.original?.reportid) : ("#" + linkChangeForOpportunity2 + accessor.row.original[module_name + "id"])} onClick={() => handleEdit(accessor.row.original)}><i><IoMdEye /></i>View <Trans>{module_name}</Trans></Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </>
                }
                else if (accessor.value == 2) {
                    return <> <div className="act_icons">
                        {module_name !== "report" ? <Link target='_self' to={linkChangeForOpportunity} data-tooltip="Duplicate" ><i onClick={() => duplicate(accessor.row.original[module_name + "id"])}><FaCopy /></i></Link> : null} 
                        <Link target='_self' to={module_name === "report" ? (linkChangeForOpportunity2 + accessor?.row?.original?.reportid) : (linkChangeForOpportunity2 + accessor.row.original[module_name + "id"])} data-tooltip="Detail View" ><i onClick={() => handleEdit(accessor.row.original)}><IoMdEye /></i></Link>
                    </div>
                        <div className="mobile_visible">
                            <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><BsThreeDotsVertical /></i>}>
                            {module_name !== "report" ? <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => duplicate(accessor.row.original[module_name + "id"])}><i><FaCopy /></i>Create Duplicate</Dropdown.Item>  : null} 
                               
                               <Dropdown.Item href={module_name === "report" ? ("#" + linkChangeForOpportunity2 + accessor?.row?.original?.reportid) : ("#" + linkChangeForOpportunity2 + accessor.row.original[module_name + "id"])} onClick={() => handleEdit(accessor.row.original)}><i><IoMdEye /></i>View <Trans>{module_name}</Trans></Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </>
                }
                else if (accessor.value == 1) {
                    return <> <div className="act_icons">
                        <Link target='_self' to={module_name === "report" ? (linkChangeForOpportunity2 + accessor?.row?.original?.reportid) : (linkChangeForOpportunity2 + accessor.row.original[module_name + "id"])} data-tooltip="Detail View" className="tooltip"><i onClick={() => handleEdit(accessor.row.original)}><IoMdEye /></i></Link>
                    </div>
                        <div className="mobile_visible">
                            <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><BsThreeDotsVertical /></i>}>
                                <Dropdown.Item href={module_name === "report" ? ("#" + linkChangeForOpportunity2 + accessor?.row?.original?.reportid) : ("#" + linkChangeForOpportunity2 + accessor.row.original[module_name + "id"])} onClick={() => handleEdit(accessor.row.original)}><i><IoMdEye /></i>View <Trans>{module_name}</Trans></Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </>
                }
                else { setAdminpermission(false); return <div className="act_icons"> </div> }
            }
        }
    ]

    // const changeHandle = (e) => {
    //     setValuex({ ...valuex, [e.target.name]: e.target.value })
    // }

    const changeHandle = (event) => {
        const { name, value } = event.target;
      
        // Update the state only if the input value is not empty
        if (value.trim() !== '') {
          setValuex((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        } else {
          // Remove the key from state if the input value is empty
          setValuex((prevState) => {
            const newState = { ...prevState };
            delete newState[name];
            return newState;
          });
          setIsrest(false);
          localStorage.removeItem("pageData")
          localStorage.removeItem("filterPage1")
        }
      };

    const changeHandle2 = (e) => {
        setSearch_mobile(e.target.value)
    }
    const[dtCustList,setDtCustList] =useState()

    useEffect(()=>{
        if (dtCustList) {
            setShow3(false);
            setProgres_value(98)

            if (dtCustList.success == true) {
                setCuslist(cuslist.filter(f =>f[`${module_name}id` ]!== cusid))
            }
        }
    },[dtCustList])

    const delete_fun = () => {

        let forthis = ""
        if (module_name === "opportunity") {
            forthis = "opportunities/"
        } else if(module_name === "report"){
            forthis = "reportdelete?report_id="
        } else {
            forthis = module_name + "s/"
        }
        deleteData("/" + tenantCname + "/api/" + forthis + cusid, '', setDtCustList, setErr);

    }

    useEffect(() => {
        if(isrest){ 
            search();
            }
    }, [isrest]);
    
    const search = (e) => {
        if (e) {
            e.preventDefault();
        }
    
        const filters = [];
        let isFilterSet = false;
    
        for (const key in valuex) {
            if (valuex.hasOwnProperty(key)) {
                // Remove commas from the value and add it to filters
                const sanitizedValue = valuex[key].replace(/,/g, '');
                filters.push(`${key}=${sanitizedValue}`);
                isFilterSet = true;
            }
        }
    
        if (!isFilterSet) {
            error_msg.push("Please provide something to search")
            setSmShowError(true)
            return;
        }
    
        const filterString = filters.join('@');
    
        let m_name = ''
        if (module_name === "report") {
            m_name = "userreportlist"
            getData(SEARCHREPORT_CUS_LIST_API(tenantCname, m_name), setCustomerListData, setErr, data4, storage);
            // setIsrestApi(!isrestApi)
        } else {
            m_name = module_name
        }
        if(localStorage.getItem("pageData") !== null){
            let param={ 
                data24: {
                    params: {
                        "ipp": authState.line || details.per_page,
                        "page": localStorage.getItem("page"),
                        "filter": valuexy,
                        "order": authState.order
                    }
                },
            }
        getData(SEARCH_CUS_LIST_API(m_name), setCustomerListData, setErr, param.data24, storage);
        setIsrest(true)
        // setIsrestApi(!isrestApi)
        }else{ 
        getData(SEARCH_CUS_LIST_API(m_name), setCustomerListData, setErr, data4, storage);
        // setIsrestApi(!isrestApi)
        setIsrest(true)
        }
        localStorage.setItem("filterPage1",JSON.stringify(cuslist))
        setIsSearchPerformed(true);
    }

  



    // const search = (e) => {
    //     e.preventDefault();
    //     const filters = [];
    //     let isFilterSet = false;

    //     for (const key in valuex) {
    //       if (valuex.hasOwnProperty(key)) {
    //          // Remove commas from the value and add it to filters
    //     const sanitizedValue = valuex[key].replace(/,/g, '');
    //     filters.push(`${key}=${sanitizedValue}`);
    //     isFilterSet = true;
    //       }
    //     }

    // // Show alert if no input is provided by the user
    //   if (!isFilterSet) {
    //     error_msg.push("Please provide something to search")
    //     setSmShowError(true)
    //     return;
    //     }
        
    //     const filterString = filters.join('@');

    //     let m_name = ''
    //     if (module_name === "report") {
    //         m_name = "userreportlist"
    //         getData(SEARCHREPORT_CUS_LIST_API(tenantCname, m_name), setCustomerListData, setErr,data4,storage);
    //     } else {
    //         m_name = module_name
    //     }
    //     getData(SEARCH_CUS_LIST_API(m_name), setCustomerListData, setErr,data4,storage);
    // }

    const reset = (one) => {
        let m_name = ''
        if (module_name === "report") {
            m_name = "userreportlist"
        } else {
            m_name = module_name
        }
        setResetData(true)
        setSortTrue(false)
        setValuex({})
        setIsrest(false)
        localStorage.removeItem("pageData")
        localStorage.removeItem("filterPage1")
        nice = ""
        getData(RESET_CUS_LIST_API(m_name), setResetCustomerListData, setErr,data5,storage);
        setNoofdata(details.per_page)
    }
    const mobilesearch = () => {
        let m_name = ''
        if (module_name === "report") {
            m_name = "userreportlist"
        } else {
            m_name = module_name
        }

        if (related_module !== null) {     

            getData(MOB_R_LIST_API(tenantCname), setRListData, setErr,data10,storage);
        }
        else {                                                    
            getData(MOB_SEARCH_R_LIST_API(m_name), setMobileSearchData, setErr, data6,storage);
        }
    }

    (table_header).slice(0).reverse().map((h) => (
        h.listview == 1 ? h.sequence > 0 ?
            COLUMNS.unshift({
                Header: h.fieldlabel.replace("&pound;", "£"),
                accessor: h.fieldname,
                input: h.fieldname,
                ui_type: h.uitype,
                picOption: h.options,
                relatedOption: h.relatedto,
                show_hide_criteria: h.show_hide_criteria
            }
            ) : null : null
    ))


    const columns = useMemo(() => COLUMNS, [table_header])
    const datainstance = useMemo(() => cuslist, [cuslist])
    const tableInstance = useTable({
        columns: columns,
        data: datainstance
    },
        useGlobalFilter,
        useFilters,
        useRowSelect,
        (hooks) => {
            if (module_name !== "report") {
                hooks.visibleColumns.push((columns) => {
                    return [
                        {
                            customerid: 'selection',
                            Header: ({ getToggleAllRowsSelectedProps }) => (
                                <IndeterminateCheckbox  {...getToggleAllRowsSelectedProps()} />
                            ),
                            Cell: ({ row }) => (
                                <IndeterminateCheckbox  {...row.getToggleRowSelectedProps()} />
                            )
                        },
                        ...columns
                    ]
                })
            } else if (authState.roleid === "1" && module_name === "report") {
                hooks.visibleColumns.push((columns) => {
                    return [
                        {
                            customerid: 'selection',
                            Header: ({ getToggleAllRowsSelectedProps }) => (
                                <IndeterminateCheckbox  {...getToggleAllRowsSelectedProps()} />
                            ),
                            Cell: ({ row }) => (
                                <IndeterminateCheckbox  {...row.getToggleRowSelectedProps()} />
                            )
                        },
                        ...columns
                    ]
                })
            }
        }
    )

    // console.log('tableInstance', tableInstance)

    // console.log('authstate latst', authState)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state,
        setGlobalFilter,
    } = tableInstance

    useEffect(() => {
        setAuthState((prevAuthState) => {
            if (selectedFlatRows.length > 0) {
                try {
                    const jsonString = JSON.stringify(selectedFlatRows, (key, value) => {
                        if (typeof value === 'object' && value !== null) {
                            if (seen.has(value)) {
                                return '[Circular Reference]';
                            }
                            setSeen((prevSeen) => new Set(prevSeen.add(value)));
                        }
                        return value;
                    });

                    return {
                        ...prevAuthState,
                        selectedFlatRows: jsonString,
                    };
                } catch (error) {
                    console.error('Error stringifying selectedFlatRows:', error);
                    return prevAuthState;
                }
            } else {
                const { selectedFlatRows, ...newAuthState } = prevAuthState;
                return newAuthState;
            }
        });
    }, [selectedFlatRows.length]);

    const { globalFilter } = state


//     const sort = (accr, ad) => {
//         console.log("54777",accr,authState)
//         setAuthState({...authState,order: accr + ":" + ad})
//         console.log("5488",accr,authState)
//         setAccrValue(accr)
//         console.log("54999",accrValue,"22",accr)
//         setAdvalue(ad)
//         let spy = ''
//         if (module_name === "report") {
//             spy = "userreportlist"
//         } else {
//             spy = module_name
//         }
   
//         if (ad == 'asc'&& accrValue !== null && accrValue !== "") {
//             console.log("aaaaaaaaaaaaa")
//             let param=  {  params:{
//                 "order": accr + ":" + "asc",
//                 "filter": valuexy,
//                 "page": localStorage.getItem("page"),
//                 "ipp": localStorage.getItem("line")
//                 }}
//             getData(SORT_CUS_DATA(tenantCname,spy), setSortData, setErr, param);
//         }else if(ad == "desc"){
//             console.log("bbbbbbbbbbbbbbbbbbbbb")
//             getData(SORT_CUS_DATA(tenantCname,spy),setDescSortData, setErr, data16);
//         }

// }

const sort = async (accr, ad) => {
    try {
      setAuthState({ ...authState, order: accr + ":" + ad });
      setAccrValue(accr);
      setAdvalue(ad);
      setSortTrue(true)
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    
    let spy = '';
    let param = {};
    if (module_name === "report") {
      spy = "userreportlist";
    } else {
      spy = module_name;
    }

    if (adValue === 'asc' && accrValue !== null && accrValue !== "") {

    if (module_name === "report") {
        param = {
            params: {
                "order": accrValue + ":" + "asc",
            }
          };
    } else {
        param = {
            params: {
              "order": accrValue + ":" + "asc",
              "filter": valuexy,
              "page": localStorage.getItem("page"),
              "ipp": localStorage.getItem("line")
            }
          };
    }
      
      sort(accrValue, adValue); // Trigger the state updates
      getData(SORT_CUS_DATA(tenantCname, spy), setSortData, setErr, param,storage);
    } else if (adValue === "desc") {
      sort(accrValue, adValue); // Trigger the state updates
      getData(SORT_CUS_DATA(tenantCname, spy), setDescSortData, setErr, data16,storage);
    }
  }, [accrValue, adValue]);

  

    {

        return (
            <UpdateCustList.Provider value={{cuslist, setCuslist}} >
            <UpdateDetails.Provider value={{details, setDetails}}>
            <selecet_Rows.Provider value={{selectedFlatRows}}>
                <div className="parent_padding">
                    <div className="container-fluid col-12">
                        {
                            <div className='row'>
                                <div className="col-12">
                                    <div className="heading_para">
                                        <div className="page_head">
                                            <h3>List of <Trans>{module_name}</Trans>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="top_btns">                                  
                                    <ActionDropdown importSample={importSample} selectflatrows={selectedFlatRows} currentPageData={currentPageData}/>
                                    <MoreDropDown currentPageData={currentPageData}/>
                                    </div>

                                    <div className="global_filter">
                                        <div className="search_by_box">
                                            <Form.Control as="select" size="sm" className="nice-select" defaultValue={search_mobile} onChange={changeHandle2}>
                                                <option hidden>Search by</option>
                                                {
                                                    COLUMNS.map((COLUMN, i) => (
                                                        COLUMN.Header !== "Actions" ?
                                                            <option className="option" key={i} value={COLUMN.input}>{COLUMN.Header}</option> : null
                                                    ))
                                                }
                                            </Form.Control>
                                        </div>

                                        <div className="search_box">
                                            <input className="float-left" type="text" placeholder="Enter your Search"
                                                onChange={(e) => { setInput_mobile(e.target.value) }}></input>
                                            <span onClick={mobilesearch}><i><CgSearch /></i></span>
                                        </div>
                                    </div>
                                    {
                                       showMsg && cuslist[0] == undefined ? <div id='loader'>No Record(s) Found!</div> :
                                            <div className={`table forWidthOnly ${module_name === 'report' && 'report_table'} customer_table tableWrap`}>
                                                <table {...getTableProps()}>
                                                    <thead >
                                                        {headerGroups.map((headerGroup, h) => (
                                                            <tr key={h} {...headerGroup.getHeaderGroupProps()} style={{border: "none"}}>
                                                                {headerGroup.headers.map((column, c) => (
                                                                    cuslist.length >= 1 && column.show_hide_criteria != 0 ? <th key={c} {...column.getHeaderProps()}><><Trans>{column.render("Header")}</Trans></>

                                                                        <span className="sorticon1" onClick={() => sort(column.input, "asc")}><i></i></span>
                                                                        <span className="sorticon2" onClick={() => sort(column.input, "desc")}><i></i></span>

                                                                        <form onSubmit={(e)=>search(e)}>
                                                                            <div className="filter">
                                                                                {(column.input && ((column.ui_type === 15)||(column.ui_type === 1) || (column.ui_type === 3) || (column.ui_type === 5) || (column.ui_type === 6) || (column.ui_type === 11) || (column.ui_type === 8) || (column.ui_type === 9) || (column.ui_type === 100) || (column.ui_type === 101) || (column.ui_type === 102) || (column.ui_type === 104)|| (column.ui_type === 105))) ? column.render(
                                                                                    <input type="text"
                                                                                        name={column.input}
                                                                                        onChange={(e)=>changeHandle(e)}
                                                                                        value={valuex[column.input] ? valuex[column.input] : ''}
                                                                                        placeholder={column.Header.replace("&pound;", "£")}></input>
                                                                                ) :
                                                                                    (column.input && column.ui_type === 2) ? column.render(
                                                                                        <select name={column.input} value={valuex[column.input] || ""} onChange={changeHandle}>
                                                                                            <option hidden>Select</option>
                                                                                            {
                                                                                                (column.picOption || []).map((po) => (
                                                                                                    <option value={po.picklistvalue}>{po.picklistlabel} </option>
                                                                                                ))
                                                                                            }
                                                                                        </select>
                                                                                    ) :
                                                                                        (column.input && column.ui_type === 4) ? column.render(
                                                                                            <select name={column.input} value={valuex[column.input] || ""} onChange={changeHandle}>
                                                                                                <option hidden>Select</option>
                                                                                                {
                                                                                                    (column.picOption || []).map((po) => (
                                                                                                        <option value={po.picklistvalue}>{po.picklistlabel}</option>
                                                                                                    ))
                                                                                                }
                                                                                            </select>
                                                                                        ) :
                                                                                            (column.input && column.ui_type === 103) ? column.render(
                                                                                                <select name={column.input} value={valuex[column.input] || ""} onChange={changeHandle}>
                                                                                                    <option hidden>Select</option>
                                                                                                    {
                                                                                                        (column.picOption || []).map((po) => (
                                                                                                            <option value={po.picklistvalue}>{po.picklistlabel}</option>
                                                                                                        ))
                                                                                                    }
                                                                                                </select>
                                                                                            ) :
                                                                                            (column.input && column.ui_type === 7 || column.input && column.ui_type === 10) ? column.render(
                                                                                                <RelatedTableDateField acc={column.input} />
                                                                                             ) :

                                                                                                null
                                                                                }
                                                                                {
                                                                                    column.button ? column.render(
                                                                                        [isrest == false ? <button key="s" className="search_button"  type="submit">Search</button> :
                                                                                            <button key="r" className="reset_button" onClick={() => reset()} type="button">Reset</button>]
                                                                                    ) : null
                                                                                }
                                                                            </div>
                                                                        </form>
                                                                    </th> : null
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </thead>
                                                    <tbody {...getTableBodyProps()}> 
                                                     {rows.map((row, i) => { 
                                                        // console.log(row, 'row746');
                                                            prepareRow(row);
                                                            return (
                                                                <tr key={i} {...row.getRowProps()} className={
                                                                    selectedFlatRows.map((sel) => { 
                                                                        return row.original[module_name + "_num"] == sel.original[module_name + "_num"] ? " " + "highlightcss" + " " : null
                                                                    })
                                                                }>{row.cells.map((cell, i) => {
                                                                    return <td key={i} {...cell.getCellProps()}
                                                                        data-title={cell.column.Header != "Actions" && typeof (cell.column.Header) != "function" ? [cell.column.Header + ":"] : null}
                                                                        className={cell.column.Header == "Actions" ? "icon_cell_mobile" : null} >
                                                                        {(module_name === "report" && authState.roleid !== "1" ? i == 0 : i == 1) ?

                                                                            <Link className="td_a" target="_self" to={module_name === 'report' ? (linkChangeForOpportunity2 + row?.original?.reportid)  : (linkChangeForOpportunity2 + row.original[module_name + "id"])} >{module_name === 'report' ? <span onClick={() => localStorage.setItem('said', row?.original?.sa_id)}>{cell.render("Cell")}</span> : cell.render("Cell")}</Link> :

                                                                            (cell.value == "0") || (cell.value == "") ? "-" : (typeof (cell.column.Header) != "function" ? (cell.column.Header).match(/Date/g) :

                                                                                null) ?cell.row.original.close_date :

                                                                                (authState.roleid!== "1" ? (module_name === "report" && i == 1) : (module_name === "report" && i == 2)) ?
                                                                                    <Link  target="_self" className="td_a" to={"/home/" + (module_name === 'report' ? (row.original?.subject_area === 'Opportunity' ? 'Opportunities' : row.original?.subject_area || "I") : (row.original.primary_module || "I")).toLowerCase()} ><Trans>{module_name === 'report' ? row?.original?.subject_area :row.original.primary_module}</Trans></Link>
                                                                                    : cell.column.Header == "Stock Location" ? cell?.row?.original["warehouse_multiple_module"] + " " + [cell.value] : (module_name === 'report' && cell?.column?.ui_type === 10) ? (Moment(row?.original[cell.column.input], 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY HH:mm:ss') !== "Invalid date" ? Moment(row?.original[cell.column.input], 'YYYY-MM-DD HH:mm:ss').format("DD-MM-YYYY HH:mm:ss") : '-')  : (module_name === 'embedding' && cell.column.input === module_name + '_value' && row.original[module_name + '_value'].indexOf('trimmedValue') !== -1) ? window.location.origin + '/#/home' + row.original['embedding_value'].split('trimmedValue')[1] : cell.render("Cell")
                                                                        }   
                                                                    </td>
                                                                })}

                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                    }
                                </div>
                                <div className="col-lg-5"></div>
                                <div className="col-lg-7 col-12">
                                    <Pagination  currentPageData={currentPageData} reset={reset} valuexy={isSearchPerformed ? valuexy : undefined}/>
                                </div>

                                <ShowErrorMsg error_msg={error_msg} smShowError={smShowError} setSmShowError={setSmShowError} setError_msg={setError_msg} />


                         <Modal show={show3} onHide={handleClose3} className="modal_delete fade small_modal modal">
                            <Modal.Header closeButton>
                                <Modal.Title>Delete {module_name !== 'report' ? <Trans>{module_name}</Trans> : module_name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>Are you sure that you want to delete the selected {module_name !== 'report' ? <Trans>{module_name}</Trans> : module_name}?</h5>
                                {module_name !== 'report' &&
                                <h6>All data related to this <Trans>{module_name}</Trans> will be deleted (NOTE: this won't automatially delete related to records such as contacts, opportunities etc these will need to be deleted seperately).</h6>}

                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="secondary reset_button btn btn-primary" onClick={handleClose3}>
                                    Cancel
                                </Button>
                                <Button variant="danger" className="danger" onClick={delete_fun}>
                                    Yes Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>

                            </div>}
                    </div>
                </div>
            </selecet_Rows.Provider>
            </UpdateDetails.Provider>
            </UpdateCustList.Provider>
        )
    }
}

export default DataTable;

