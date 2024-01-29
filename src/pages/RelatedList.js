/* eslint-disable */
import React, { useState, useEffect, useMemo, useCallback,createContext, useContext } from 'react'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useTable, useRowSelect, useGlobalFilter, useFilters } from 'react-table'
import "../assets/style/CustomerList.css"
import "../assets/style/CreateCustomer.css";
import i18n from "../config/i18n";
import { Trans } from 'react-i18next'
import { Modal, Button } from "react-bootstrap"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdModeEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import { IoMdEye } from "react-icons/io"
import { FaCopy } from 'react-icons/fa';
import { RiAddCircleLine } from "react-icons/ri"
import { CgSearch } from "react-icons/cg"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Slider from 'react-slick'
import ReactPaginate from 'react-paginate';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
import { EditorState } from 'draft-js';
import Grid from '@mui/material/Grid';
import SVG from 'react-inlinesvg';
import Header from '../layouts/Header';
import { AuthContext } from '../config/Authentications/AuthContext';
import CreateModulePage from './CreateModulePage';
import useGetReq from '../service/useGetReq';
import { FIELDSAPI, LISTVIEWAPI, RELATEDMODULE, R_LIST_API, R_LIST_HISTORY_API, WORKFLOWAPI } from '../service/ApiPath';
import OpCreatePage from './OpCreatePage';
import axios from "../config/Axios"
import { opCreatePageData, r_value } from '../navigation/PageRoutes';
import Uitype9DateModal from '../components/DateModalForRelatedTable/Uitype9DateModal';
import RelatedTableDateField from '../components/DateModalForRelatedTable/RelatedTableDateField';
import ShowErrorMsg from '../components/ShowErrorMsg';
import { searchTableModuleValue } from '../navigation/PageRoutes';
import Uitype10DateTimeModal from '../components/DateModalForRelatedTable/Uitype10DateTimeModal';
import useStorage from '../service/useStorage';
import { recordErrorAPIdata } from '../service/useApiData';
export const rlist1= createContext()

function RelatedList(props) {
    const storage = useStorage();
  const {smShowError, setSmShowError,error_msg, setError_msg,setUitype_module } = useContext(searchTableModuleValue)
    const {authState,setAuthState} = useContext(AuthContext)
    const {rlist, setRlist,setAdd_forName,setuitype6_value}= useContext(r_value)
    const { valuex, setValuex,setAdd,setCountry,setLinearray} = useContext(opCreatePageData)
    const tenantCname = authState.tenant_cname
    const [cuslist, setCuslist] = useState([]);
    const [details, setDetails] = useState({})
    const [search_mobile, setSearch_mobile] = useState('')
    const [input_mobile, setInput_mobile] = useState('')
    const [dybtn, setDybtn] = useState([])
    const [dy_btn_form, setDy_btn_form] = useState([])
    const [snum, setSnum] = useState({})
    let [dy_form_data, setDy_form_data] = useState({})
    const [show, setShow] = useState(false);
    const [show3, setShow3] = useState(false);
    const [table_header, setTable_header] = useState([])
    const [cusid, setCusid] = useState("")
    const [exp_cus_id, setExp_cus_id] = useState("")
    const [noofdata, setNoofdata] = useState("")
    const [isrest, setIsrest] = useState(false)
    const [loading, setLoading] = useState('')
    const [relcrtpop, setRelcrtpop] = useState(false)
    const [offset, setOffset] = useState(1);
    const [refreshList, setRefreshList] = useState(true)
    const [totalAmount, setTotalAmount] = useState(0)
    const [getData] = useGetReq();
    const [listviewData, setlistviewData] = useState("")
    const [workflowData, setWorkflowData] = useState("")
    const [historyOne, setHistoryOne] = useState("")
    const [historyFive, setHistoryFive] = useState("")
    const [historyMob, setHistoryMob] = useState("")
    const [rListData, setRListData] = useState("")
    const [fieldsData, setFieldsData] = useState("")
    const [wstepsData,setWstepsData] = useState("")
    const [wstepsData1,setWstepsData1] = useState("")
    const [relatedModuleApiData, setRelatedModuleApiData] = useState("")
    const [rErr, setRErr] = useState("")
    const [err, setErr] = useState("")
    const handleListRefresh = (e) => {
        if (refreshList) {
            setRefreshList(false)
        } else {
            setRefreshList(true)
        }
    }
    let [dyNum, setDyNum] = useState()
    const [workf_error, setWorkf_error] = useState("")
    const [dyData1, setDydata1] = useState({})
    const handleClose = () => setShow(false);
    const handleClose3 = () => {
        setShow3(false);
    }

    let expense_updated = localStorage.getItem('expense_updated');
    let payroll_updated = localStorage.getItem('payroll_updated');

    let module_name = localStorage.getItem("relatedmodule")
    const [related_module, setRelated_module] = useState(localStorage.getItem("relatedmodule"))
    let logData = [];
    let viewData = {};
    viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };
    let { prev_module_name } = useParams();
    let  prev_module_name2  = prev_module_name;
    let { pvid } = useParams();
    let allAccountsLink = prev_module_name
    let prevmodule = prev_module_name
    if(prevmodule ==="opportunity"){
        prevmodule = "opportunities"
    }
    if (prev_module_name === "accounts") {
        prev_module_name = "customer"
    } else if (prev_module_name === "contacts") {
        prev_module_name = "contact"
    } else if (prev_module_name === "opportunities") {
        prev_module_name = "opportunity"
    }else if (prev_module_name === "inventory") {
        prev_module_name = "product"
    }else if (prev_module_name === "equipment") {
        prev_module_name = "equipment"
    }else if(prev_module_name === "evmapping"){
        prev_module_name = "evmapping"
    }else if(prev_module_name === "eqchild"){
        prev_module_name = "eqchild"
    }else if(prev_module_name === "eqcalendar"){
        prev_module_name = "eqcalendar"
    } else if (prev_module_name === "venues") {
        prev_module_name = "venue"
    } else if (prev_module_name === "suppliers") {
        prev_module_name = "supplier"
    }else if (prev_module_name === "supplierorders") {
        prev_module_name = "supplierorder"
    }

    let linkChangeForOpportunity = ""
    let linkChangeForOpportunity2 = ""
    if ((module_name === "opportunity") || (module_name === "invoice") || (module_name === "opportunities")||  (module_name === "supplierorderreturn") ||  (module_name === "supplierorders")) {
        let markchange = ""
        if (module_name === "opportunity") {
            markchange = "opportunities"
        }else if (module_name === "supplierorder") {
            markchange = "supplierorders"
        }
         else {
            markchange = module_name
        }
     
        linkChangeForOpportunity = "/home/" + markchange + "/add-edit-op"
        linkChangeForOpportunity2 = "/home/" + prevmodule + '/' + pvid + "/detail-op/" + markchange + '/'
    } else {
        let markchange = ""
        if (module_name === "customer") {
            markchange = "accounts"
        } else if (module_name === "contact") {
            markchange = "contacts"
        } else if (module_name === "product") {
            markchange = "inventory"
        } else if (module_name === "equipment") {
            markchange = "equipment"
        }else if(module_name === "evmapping"){
            markchange = "evmapping"
        }else if(module_name === "eqchild"){
            markchange = "eqchild"
        }else if(module_name === "eqcalendar"){
            markchange = "eqcalendar"
        } 
         else if (module_name === "venue") {
            markchange = "venues"
        } else if (module_name === "supplier") {
            markchange = "suppliers"
        }
        else {
            markchange = module_name
        }

        linkChangeForOpportunity = "/home/" + markchange + "/add-edit"
        linkChangeForOpportunity2 = "/home/" + prevmodule + '/' + pvid + "/detail/" + markchange + '/'
    }

    useEffect (()=>{
        setRListData("")
    },[related_module])

    const catchrelatemodule = (lop) => {
        setCuslist([])
        setDetails([])
        module_name = lop.toLowerCase()
        setRelated_module(lop.toLowerCase())
        setLoading('No Record Found!')
        setRelated_module_popup(false)
    }

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );


    const base_url = ""

    const lang = localStorage.getItem("language")
    if (lang) {
        i18n.changeLanguage(lang)
    }
    const dy_changeHandle = (e) => {
        setDy_form_data({ ...dy_form_data, [e.target.name]: e.target.value })
    }

    const [relatedFields, setRelatedFields] = useState();

    useEffect(() => {
        if (rListData.data && Array.isArray(rListData.data)) {
          const names = rListData.data.map(item => {
            const name = Object.keys(item)
            .filter(key => key.startsWith('related_customer') && !key.endsWith('id'))
              .map(key => key.replace('related_', ''))
              .join(', '); 
            return name;
          });
          setRelatedFields(names);
        }
      }, [rListData.data]);
      
      let modRel_name =""

      if (relatedFields?.length > 0) {
        if (relatedFields[0] === "customer") {
          modRel_name = "accounts";
        } else {
          modRel_name = relatedFields[0];
        }
      }
    useEffect(()=>{
        if(listviewData){
            setTable_header(listviewData&&listviewData?.fields?.sort((a, b) => a.listsequence - b.listsequence))
        }
        if(workflowData){
            setDybtn(workflowData)
        }
        if(historyOne){
            setCuslist(historyOne)
            setDetails(historyOne)
            localStorage.removeItem("page")
            localStorage.removeItem("line")
            if (historyOne[0] === undefined) {
                setLoading('No Record Found!')
            } 
            else {
                setLoading('No Record Found!')
            }
        }
        if(rListData && module_name !=="history"){
            setCuslist(rListData.data)
            setDetails(rListData)
            setIsrest(false)
            localStorage.removeItem("page")
            localStorage.removeItem("line")
            if (rListData && rListData.data[0] === undefined) {
                setLoading('No Record Found!')
            } 
            else {
                setLoading('No Record Found!')
            }
            if ((related_module == "operationalexpense") || (related_module == "payrollcosts")) {
                let totAmnt = 0;
                for (let i = 0; i < rListData.data.length; i++) {
                    totAmnt = totAmnt + parseFloat(rListData.data[i].amount)
                }
                setTotalAmount(totAmnt.toFixed(2));
            }
        }
        if(rErr){
            setLoading(rErr.message || rErr)
        }
        if(fieldsData){
            setRlist(fieldsData.related)
        }
        if(historyFive){
            setCuslist(historyFive)
            setDetails(historyFive)
        }
        if(historyMob){
            historyMob == null ? alert("No Record(s) Found") :
                    setCuslist(historyMob)
                    setDetails(historyMob)
                    setIsrest(true)
        }
        if(wstepsData){
            setDy_btn_form(wstepsData.fields)
                setSnum(wstepsData)
                // if ((wstepsData.fields == undefined) && (wstepsData.stepnum)) {
                //     dysubmit(wstepsData.stepnum)
                // }
        }
        if(wstepsData1){
        //  for dysubmit
        if(dyNum !== 2){ 
        setSnum(wstepsData1)
        setDy_btn_form(wstepsData1.fields)
        }
        if ((wstepsData1.fields == undefined) && (wstepsData1.stepnum)) {
        dysubmit(wstepsData1.stepnum)
        }
        setWorkf_error("")
        setDy_form_data("")
       
        if (dyNum > 1) {
            setWorkf_error("Field(s) Required")
        } 
  }
          if(relatedModuleApiData){
            setCuslist(relatedModuleApiData.data)
                    setDetails(relatedModuleApiData)
                    localStorage.setItem("page", offset)
          }
    
    },[listviewData,workflowData,relatedModuleApiData,historyOne,historyFive,rListData,rErr,fieldsData,historyMob,wstepsData,wstepsData1])

    useEffect(() => {
        
        if ((related_module === "history" )|| (related_module ==="comment") || (related_module ==="calendar")) {
            let param = {
                params: {
                    "module": related_module,
                    "importfile": 0
                }
            }
            related_module && getData(LISTVIEWAPI(tenantCname),setlistviewData,setErr,param,storage)
          
        } else {
            let param = {
                params: {
                    "module": related_module
                }
            }
            related_module && getData(LISTVIEWAPI(tenantCname),setlistviewData,setErr,param,storage)   
        }

        {
            let param = {
                params: {
                    "module": module_name,
                    "view": "index"
                }
            }
            module_name && getData(WORKFLOWAPI(tenantCname),setWorkflowData,setErr,param,storage)
        
        }        
        if (related_module === "history") {
            let param = {
                params: {
                "module": localStorage.getItem("prev_module_name"),
                "recordid": pvid,
                "page": localStorage.getItem("page")
                // "ipp": localStorage.getItem("line") || details.per_page
            }
            }
            getData(R_LIST_HISTORY_API(tenantCname),setHistoryOne,setErr,param,storage)
           
        } 
        else {
            let param = {
                params: {
                    "module": prev_module_name,
                    "relatedmodule": related_module,
                    "recordid": pvid,
                    "ipp": ((related_module == "operationalexpense") || (related_module == "payrollcosts")) ? "200" : localStorage.getItem("line") || details.per_page,
                    "page": localStorage.getItem("page"),
                    // "order": localStorage.getItem("order")
                }

            }
            related_module && getData(R_LIST_API(tenantCname),setRListData,setRErr,param,storage)
           
        }
    }, [related_module, expense_updated, payroll_updated, refreshList])

 
    const clickOpeExp = () =>{
        if(localStorage.getItem('clickOpExp') === "true"){
            let a = document.getElementById('OperationalExpense')
        }
    }

    const clickOpExp = () =>{
        if(localStorage.getItem('clickOpExp') === "true"){
            let opExpIcon = document.getElementById('OperationalExpense')
        }
    }

    const delete_fun = () => {
        if (selectedFlatRows.length >= 1) {
            selectedFlatRows.forEach(original => {
                axios.delete("/"+tenantCname+"/api/" + related_module + "s/" + original.original[module_name + "id"], {
                    headers: {
                        "Accept": "application/JSON",
                        "Authorization": "Bearer" + " " + localStorage.getItem('token')
                    }
                }

                )
                    .then(res => {
                        setShow3(false);
                        window.location.reload()
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${related_module}s`, 'payload':{'id' : module_name + "id"}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${related_module}s`, 'payload':{'id' : module_name + "id"}, 'response':[], 'error_details': err, 'status_code':'' }];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
            });
        } else {
            let apiPath = ''
            
            if (related_module === "payrollcosts") {
                apiPath = "/api/" + related_module + "/" + cusid
            }else if(related_module === "opportunity"){
                apiPath = "/api/opportunities/" + cusid
            }else {
                apiPath = "/api/" + related_module + "s/" + cusid
            }
            axios.delete("/"+tenantCname+apiPath, {
                headers: {
                    "Accept": "application/JSON",
                    "Authorization": "Bearer" + " " + localStorage.getItem('token')
                }
            }

            )
                .then(res => {
                    setShow3(false);
                    window.location.reload()
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${related_module}s`, 'payload':{"id": cusid}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
                .catch(err => {
                    console.log(err)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${related_module}s`, 'payload':{"id": cusid}, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        }
    }

    const handleEdit = (row) => {
        localStorage.setItem("customerDetails", JSON.stringify(row));
        localStorage.removeItem("c_id")
            setAuthState({...authState, duplicate: '',customerDetails:JSON.stringify(row)})
    }

    const duplicate = (row) => {
        localStorage.setItem("duplicate", JSON.stringify(row));
        localStorage.removeItem("c_id")
        localStorage.removeItem("customerDetails")
        setAuthState({...authState, duplicate: JSON.stringify(row),customerDetails:''})
    }

    const handleDelete = (row) => {
        setShow3(true)
        setCusid(row[module_name + "id"])
    }


    useEffect(() => {
        let forthis = ''
        if (prev_module_name === 'opportunity') {
            forthis = 'opportunitie'
        } else {
            forthis = prev_module_name
        }  
        let param = {
            params: {
                "module": localStorage.getItem('prev_module_name')
            }
        }
        getData(FIELDSAPI(tenantCname),setFieldsData,setErr,param,storage)
        
    }, [localStorage.getItem("c_id")])



    let COLUMNS = [
        {
            Header: 'Actions',
            accessor: 'type1',
            // Filter: ColumnButton,
            button: "button",
            show: false,
            Cell: (accessor) => {
                if (accessor.value == 4 && related_module !== "history") {
                    return <>
                        <div className="act_icons">
                            <Link target='_self' to={linkChangeForOpportunity} data-tooltip="Edit" className="tooltip"><i onClick={() => handleEdit(accessor.row.original)}><MdModeEdit /></i></Link>
                            <Link target='_self' to={linkChangeForOpportunity} data-tooltip="Duplicate" className="tooltip"><i onClick={() => duplicate(accessor.row.original[module_name + "id"])}><FaCopy /></i></Link>
                            <Link target='_self' to={linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]} data-tooltip="Detail View" className="tooltip"><i onClick={() => handleEdit(accessor.row.original)}><IoMdEye /></i></Link>
                            <i data-tooltip="Delete" className="tooltip del_icons" onClick={() => handleDelete(accessor.row.original)}><MdDelete /></i>
                        </div>
                        <div className="mobile_visible">
                            <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><BsThreeDotsVertical /></i>}>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => handleEdit(accessor.row.original)}><i><MdModeEdit /></i>Edit Customer</Dropdown.Item>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => duplicate(accessor.row.original[module_name + "id"])}><i><FaCopy /></i>Create Duplicate</Dropdown.Item>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]} onClick={() => handleEdit(accessor.row.original)}><i><IoMdEye /></i>View Customer</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => handleDelete(accessor.row.original)}><i className="del_icons"><MdDelete /></i>Delete Customer</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </>
                }
                else if (accessor.value == 3 && related_module !== "history") {
                    return <> <div className="act_icons">
                        <Link target='_self' to={linkChangeForOpportunity} data-tooltip="Edit" className="tooltip"><i onClick={() => handleEdit(accessor.row.original)}><MdModeEdit /></i></Link>
                        <Link target='_self' to={linkChangeForOpportunity} data-tooltip="Duplicate" className="tooltip"><i onClick={() => duplicate(accessor.row.original[module_name + "id"])}><FaCopy /></i></Link>
                        <Link target='_self' to={linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]} data-tooltip="Detail View" className="tooltip"><i onClick={() => handleEdit(accessor.row.original)}><IoMdEye /></i></Link>
                    </div>
                        <div className="mobile_visible">
                            <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><BsThreeDotsVertical /></i>}>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => handleEdit(accessor.row.original)}><i><MdModeEdit /></i>Edit Customer</Dropdown.Item>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => duplicate(accessor.row.original.venuid)}><i><FaCopy /></i>Create Duplicate</Dropdown.Item>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]} onClick={() => handleEdit(accessor.row.original)}><i><IoMdEye /></i>View Customer</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </>
                }
                else if (accessor.value == 2 && related_module !== "history") {
                    return <> <div className="act_icons">
                        <Link target='_self' to={linkChangeForOpportunity} data-tooltip="Edit" className="tooltip"><i onClick={() => handleEdit(accessor.row.original)}><MdModeEdit /></i></Link>
                        <Link target='_self' to={linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]} data-tooltip="Detail View" className="tooltip"><i onClick={() => handleEdit(accessor.row.original)}><IoMdEye /></i></Link>
                    </div>
                        <div className="mobile_visible">
                            <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><BsThreeDotsVertical /></i>}>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => handleEdit(accessor.row.original)}><i><MdModeEdit /></i>Edit Customer</Dropdown.Item>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]} onClick={() => handleEdit(accessor.row.original)}><i><IoMdEye /></i>View Customer</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </>
                }
                else if (accessor.value == 1 && related_module !== "history") {
                    return <> <div className="act_icons">
                        <Link target='_self' to={linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]} data-tooltip="Detail View" className="tooltip"><i onClick={() => handleEdit(accessor.row.original)}><IoMdEye /></i></Link>
                    </div>
                        <div className="mobile_visible">
                            <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><BsThreeDotsVertical /></i>}>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]} onClick={() => handleEdit(accessor.row.original)}><i><IoMdEye /></i>View Customer</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </>
                } else if (related_module === "history") {
                    return <>
                        <div className="act_icons">
                            <i> </i>
                            <i> </i>
                            <i> </i>
                            <i> </i>
                        </div>
                    </>
                }
                else {
                    return <>
                        <div className="act_icons">
                            <Link target='_self' to={linkChangeForOpportunity}  data-tooltip="Edit" className='tool'><i onClick={() => handleEdit(accessor.row.original)}><MdModeEdit /></i></Link>
                            <Link target='_self' to={linkChangeForOpportunity} data-tooltip="Duplicate" className='tool' ><i onClick={() => duplicate(accessor.row.original[module_name + "id"])}><FaCopy /></i></Link>
                            <Link target='_self' to={linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]}  data-tooltip="Detail View" className='tool' ><i onClick={() => handleEdit(accessor.row.original)}><IoMdEye /></i></Link>
                            <i style={{cursor:"pointer"}}   data-tooltip="Delete" className='tool delete_icon' onClick={() => handleDelete(accessor.row.original)}><MdDelete /></i>
                        </div>
                        <div className="mobile_visible">
                            <DropdownButton className="mobile_visible_bgrmv" id="dropdown-basic-button" title={<i><BsThreeDotsVertical /></i>}>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => handleEdit(accessor.row.original)}><i><MdModeEdit /></i>Edit Customer</Dropdown.Item>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity} onClick={() => duplicate(accessor.row.original[module_name + "id"])}><i><FaCopy /></i>Create Duplicate</Dropdown.Item>
                                <Dropdown.Item href={"#" + linkChangeForOpportunity2 + accessor.row.original[module_name + "id"]} onClick={() => handleEdit(accessor.row.original)}><i><IoMdEye /></i>View Customer</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => handleDelete(accessor.row.original)}><i className="del_icons"><MdDelete /></i>Delete Customer</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </>
                }


            }
        }
    ]

    // const changeHandle = (event) => {
    //     const { name, value } = event.target;
    //     setValuex((prevState) => ({
    //       ...prevState,
    //       [name]: value,
    //     }));
    //   };


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
        }
      };


    const changeHandle2 = (e) => {
        setSearch_mobile(e.target.value)
    }

    const valuexy = JSON.stringify(valuex).replace(/[\{\}\"]/g, '').replace(/:/g, "=")

    useEffect(()=>{
        setValuex("")
    },[module_name])

    const search = (e) => {
        e.preventDefault()
        const filters = [];
        let isFilterSet = false;

        for (const key in valuex) {
          if (valuex.hasOwnProperty(key)) {
            filters.push(`${key}=${valuex[key]}`);
            isFilterSet = true;
          }
        }

     // Show alert if no input is provided by the user
      if (!isFilterSet) {
        error_msg.push("Please provide something to search")
        setSmShowError(true)
        return;
        }

        const filterString = filters.join('&');
        
        if (related_module === 'history') {
            axios.get("/"+tenantCname+"/api/history", {
                headers: {
                    "Accept": "application/JSON",
                    "Authorization": "Bearer" + " " + localStorage.getItem('token')
                },
                params: {
                    "module": localStorage.getItem("prev_module_name"),
                    "recordid": pvid,
                    "filter": valuexy,
                    "order": localStorage.getItem("order"),
                    "ipp": localStorage.getItem("line")
                }
            }

            )
                .then(res => {
                    res.data == null ? alert("No Record(s) Found") :
                   
                    setCuslist(res.data)
                    setDetails(res.data)
                    setIsrest(true)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'history'}`, 'payload':{
                    "module": localStorage.getItem("prev_module_name"),
                    "recordid": pvid,
                    "filter": valuexy,
                    "order": localStorage.getItem("order"),
                    "ipp": localStorage.getItem("line")
                }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
                .catch(err => {
                    console.log(err)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'history'}`, 'payload':{
                    "module": localStorage.getItem("prev_module_name"),
                    "recordid": pvid,
                    "filter": valuexy,
                    "order": localStorage.getItem("order"),
                    "ipp": localStorage.getItem("line")
                }, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        } else {
            axios.get("/"+tenantCname+"/api/relatedmodule", {
                headers: {
                    "Accept": "application/JSON",
                    "Authorization": "Bearer" + " " + localStorage.getItem('token')
                },
                params: {
                    "module": prev_module_name,
                    "relatedmodule": related_module,
                    "recordid": pvid,
                    "filter": filterString,
                    "order": localStorage.getItem("order"),
                    "ipp": localStorage.getItem("line")
                }
            }

            )
                .then(res => {
                    setCuslist(res.data.data)
                    setDetails(res.data)
                    setIsrest(true)
                    if (res.data.data[0] === undefined) {
                        setLoading('No Record Found!')
                    } else {
                        setLoading('No Record Found!')
                    }
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                        "module": prev_module_name,
                        "relatedmodule": related_module,
                        "recordid": pvid,
                        "filter": filterString,
                        "order": localStorage.getItem("order"),
                        "ipp": localStorage.getItem("line")
                    }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                   
                })
                .catch(err => {
                    console.log(err)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                        "module": prev_module_name,
                        "relatedmodule": related_module,
                        "recordid": pvid,
                        "filter": filterString,
                        "order": localStorage.getItem("order"),
                        "ipp": localStorage.getItem("line")
                    }, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        }
    }

    const reset = (e, one) => {
        setAdd_forName({})
        setuitype6_value({})
        setUitype_module({})
        setAdd({})
        setCountry(1)
        setLinearray([])
        setValuex({})
        if (related_module === 'history') {
            axios.get("/"+tenantCname+"/api/history", {
                headers: {
                    "Accept": "application/JSON",
                    "Authorization": "Bearer" + " " + localStorage.getItem('token')
                },
                params: {
                    "module": localStorage.getItem("prev_module_name"),
                    "recordid": pvid,
                    "page": one == null ? localStorage.getItem("page") : one,
                    "ipp": localStorage.getItem("line") || details.per_page
                }
            }

            )
                .then(res => {
                    setCuslist(res.data)
                    setDetails(res.data)
                    setIsrest(false)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'history'}`, 'payload':{
                      "module": localStorage.getItem("prev_module_name"),
                    "recordid": pvid,
                    "page": one == null ? localStorage.getItem("page") : one,
                    "ipp": localStorage.getItem("line") || details.per_page
                    }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
                .catch(err => {
                    console.log(err)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'history'}`, 'payload':{
                      "module": localStorage.getItem("prev_module_name"),
                    "recordid": pvid,
                    "page": one == null ? localStorage.getItem("page") : one,
                    "ipp": localStorage.getItem("line") || details.per_page
                    }, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        } else {
            axios.get("/"+tenantCname+"/api/relatedmodule", {
                headers: {
                    "Accept": "application/JSON",
                    "Authorization": "Bearer" + " " + localStorage.getItem('token')
                },
                params: {
                    "module": prev_module_name,
                    "relatedmodule": related_module,
                    "recordid": pvid,
                    "page": one == null ? localStorage.getItem("page") : one,
                    "ipp": localStorage.getItem("line") || details.per_page
                }
            }

            )
                .then(res => {
                    setCuslist(res.data.data)
                    setDetails(res.data)
                    setIsrest(false)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                      "module": prev_module_name,
                    "relatedmodule": related_module,
                    "recordid": pvid,
                    "page": one == null ? localStorage.getItem("page") : one,
                    "ipp": localStorage.getItem("line") || details.per_page
                    }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
                .catch(err => {
                    console.log(err)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                      "module": prev_module_name,
                    "relatedmodule": related_module,
                    "recordid": pvid,
                    "page": one == null ? localStorage.getItem("page") : one,
                    "ipp": localStorage.getItem("line") || details.per_page
                    }, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        }
    }


    const mobilesearch = () => {
        if (related_module === 'history') {
            let param = {
                params: {
                    "module": localStorage.getItem("prev_module_name"),
                    "recordid": pvid,
                    "filter": search_mobile + "=" + input_mobile,
                    "order": localStorage.getItem("order"),
                    "ipp": localStorage.getItem("line")
                }
            }
            getData(R_LIST_HISTORY_API(tenantCname),setHistoryMob,setErr,param,storage)
           
        } else {
            let param = {
                params: {
                    "module": prev_module_name,
                    "relatedmodule": related_module,
                    "recordid": pvid,
                    "filter": search_mobile + "=" + input_mobile,
                    "order": localStorage.getItem("order"),
                    "ipp": localStorage.getItem("line")
                }
            }
            getData(R_LIST_API(tenantCname),setHistoryMob,setErr,param,storage)
         
        }
    }

    table_header?.slice(0).reverse().map((h) => (
        h.relatedlistview == 1 ? h.sequence > 0 ?
            COLUMNS.unshift({
                Header: h.fieldlabel,
                accessor: h.fieldname,
                input: h.fieldname,
                ui_type: h.uitype,
                picOption: h.options,
                relatedOption: h.relatedto,
                show_hide_criteria: h.show_hide_criteria

            }
            )
            : null : null
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
    )

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

    const { globalFilter } = state





    const [swid, setSwid] = useState('')

    const dyclick = (dy, dyt) => {
        let param = {
            params: {
                "module": module_name,
                "view": "index",
                "wid": dy,
                "formtype": "1",
                "records": exp_cus_id
            }
      }
    
      getData("/" + tenantCname + "/api/wsteps",setWstepsData,setErr,param,storage)
        setSwid(dy)
        if (dyt == "Webform") { setShow(true) }
        else { setShow(false) }
      }


    // const dysubmit = (num) => {
    //     axios.get("/"+tenantCname+"/api/wsteps", {
    //         headers: {
    //             "Accept": "application/JSON",
    //             "Authorization": "Bearer" + " " + localStorage.getItem('token')
    //         },
    //         params: {
    //             "module": module_name,
    //             "view": "index",
    //             "wid": swid,
    //             "formtype": "1",
    //             "stepnum": num,
    //             "email": dy_form_data,
    //             "records": exp_cus_id
    //         }
    //     }
    //     )
    //         .then(res => {
    //             setDy_btn_form(res.data.fields)
    //             setSnum(res.data)
    //             if ((res.data.fields == undefined) && (res.data.stepnum)) {
    //                 dysubmit(res.data.stepnum)
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    const dysubmit = (num) => {
        dy_form_data = ({
            ...dy_form_data,
            "module": module_name,
            "view": "index",
            "wid": swid,
            "formtype": "1",
            "stepnum": num,
            "records": exp_cus_id
        })

        let param = {
            params: 
                dy_form_data
            }
        getData("/" + tenantCname + "/api/wsteps",setWstepsData1,setErr,param,storage)
        setDyNum(num)
    }


    const sort = (accr, ad) => {
        if (ad == 'asc') {
            if (related_module === 'history') {
                axios.get("/"+tenantCname+"/api/history", {
                    headers: {
                        "Accept": "application/JSON",
                        "Authorization": "Bearer" + " " + localStorage.getItem('token')
                    },
                    params: {
                        "module": localStorage.getItem("prev_module_name"),
                        "recordid": pvid,
                        "order": accr + "~" + "asc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")
                    }
                }
                )
                    .then(res => {

                        setCuslist(res.data)
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${'history'}`, 'payload':{
                            "module": localStorage.getItem("prev_module_name"),
                        "recordid": pvid,
                        "order": accr + "~" + "asc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")
                        }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${'history'}`, 'payload':{"module": localStorage.getItem("prev_module_name"),
                        "recordid": pvid,
                        "order": accr + "~" + "asc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")}, 'response':[], 'error_details': err, 'status_code':'' }];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
            } else {
                axios.get("/"+tenantCname+"/api/relatedmodule", {
                    headers: {
                        "Accept": "application/JSON",
                        "Authorization": "Bearer" + " " + localStorage.getItem('token')
                    },
                    params: {
                        "module": prev_module_name,
                        "relatedmodule": related_module,
                        "recordid": pvid,
                        "order": accr + "~" + "asc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")
                    }
                }
                )
                    .then(res => {
                        setCuslist(res.data.data)
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${"relatedmodule"}`, 'payload':{
                        "module": prev_module_name,
                        "relatedmodule": related_module,
                        "recordid": pvid,
                        "order": accr + "~" + "asc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")
                    }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${"relatedmodule"}`, 'payload':{
                        "module": prev_module_name,
                        "relatedmodule": related_module,
                        "recordid": pvid,
                        "order": accr + "~" + "asc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")
                    }, 'response':[], 'error_details': err, 'status_code':'' }];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
            }
        } else {
            if (related_module === 'history') {
                axios.get("/"+tenantCname+"/api/history", {
                    headers: {
                        "Accept": "application/JSON",
                        "Authorization": "Bearer" + " " + localStorage.getItem('token')
                    },
                    params: {
                        "module": localStorage.getItem("prev_module_name"),
                        "recordid": pvid,
                        "order": accr + "~" + "desc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")
                    }
                }
                )
                    .then(res => {
                        setCuslist(res.data)
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${"history"}`, 'payload':{
                        "module": localStorage.getItem("prev_module_name"),
                        "recordid": pvid,
                        "order": accr + "~" + "desc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")}, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${"history"}`, 'payload':{
                        "module": localStorage.getItem("prev_module_name"),
                        "recordid": pvid,
                        "order": accr + "~" + "desc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")}, 'response':[], 'error_details': err, 'status_code':'' }];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
            } else {
                axios.get("/"+tenantCname+"/api/relatedmodule", {
                    headers: {
                        "Accept": "application/JSON",
                        "Authorization": "Bearer" + " " + localStorage.getItem('token')
                    },
                    params: {
                        "module": prev_module_name,
                        "relatedmodule": related_module,
                        "recordid": pvid,
                        "order": accr + "~" + "desc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")
                    }
                }
                )
                    .then(res => {
                        setCuslist(res.data.data)
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${"relatedmodule"}`, 'payload':{

                        "module": prev_module_name,
                        "relatedmodule": related_module,
                        "recordid": pvid,
                        "order": accr + "~" + "desc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")
                        }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        logData = [{...viewData, 'module_name': module_name, 'api': `/${"relatedmodule"}`, 'payload':{

                        "module": prev_module_name,
                        "relatedmodule": related_module,
                        "recordid": pvid,
                        "order": accr + "~" + "desc",
                        "filter": valuexy,
                        "page": localStorage.getItem("page"),
                        "ipp": localStorage.getItem("line")
                        }, 'response':[], 'error_details': err, 'status_code':'' }];
                        if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                        }
                    })
            }
        }

    }

    let page = [];

    for (var pages = 1; pages <= [details.total / details.per_page]; pages++) {
        page.push(pages)
    }
    if (details.total % details.per_page != 0) {
        page.push(page.length + 1)
    }
    let noOfData = [10, 25, 50, 75, 100, 250, 500];

    const datanum_chnage = (num) => {
        setNoofdata(num)
        if (related_module === "history") {
            let param = {
                params: {
                    "module": localStorage.getItem("prev_module_name"),
                    "recordid": localStorage.getItem("c_id"),
                    "page": localStorage.getItem("page"),
                    "ipp": num
                }
            }
            getData(R_LIST_HISTORY_API(tenantCname),setHistoryFive,setErr,param,storage)
            
        } else {
            axios.get("/"+tenantCname+"/api/relatedmodule", {
                headers: {
                    "Accept": "application/JSON",
                    "Authorization": "Bearer" + " " + localStorage.getItem('token')
                },
                params: {
                    "module": prev_module_name,
                    "relatedmodule": related_module,
                    "recordid": pvid,
                    "page": details.current_page,
                    "ipp": num
                }
            }
            )
                .then(res => {
                        (res.data.from == null && res.data.to == null ? (reset(1), localStorage.setItem("page", 1)) :
                            setCuslist(res.data.data),
                            setDetails(res.data))
                            logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                                "module": prev_module_name,
                                "relatedmodule": related_module,
                                "recordid": pvid,
                                "page": details.current_page,
                                "ipp": num
                            }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                            if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                              recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                            }
                })
                .catch(err => {
                    console.log(err)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
                        "module": prev_module_name,
                        "relatedmodule": related_module,
                        "recordid": pvid,
                        "page": details.current_page,
                        "ipp": num
                    }, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        }
        localStorage.setItem("line", num)
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
        pgination(e.selected)
    };

    const pgination = useCallback((es) => {
        if (related_module !== "history" && es != 0) {
            let param = {
                params: {
                    "module": prev_module_name,
                    "relatedmodule": related_module,
                    "recordid": pvid,
                    "page": es + 1,
                    "ipp": localStorage.getItem("line") || details.per_page
                }
            }
            getData(RELATEDMODULE(tenantCname,related_module),setRelatedModuleApiData,setErr,param,storage)
            
        }
    }, [offset])

    const all_accounts = () => {
        localStorage.removeItem("relatedmodule")
        localStorage.removeItem("prev_c_id")
        localStorage.removeItem("c_id")
        setAuthState({...authState,relatedmodule:"",prev_c_id:''})
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 13,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [calendarModal, setCalendarModal] = useState(false)
    const [related_module_popup, setRelated_module_popup] = useState(false)

    const handleCalendar = () => {
        setCalendarModal(true)
        localStorage.removeItem("c_id")
        setRelcrtpop(true)
        setRelated_module_popup(true)
        setAuthState({...authState, customerDetails: "",duplicate: ''})
    }

    return (
        <><rlist1.Provider value={{rlist,setRlist}}>
        <Header/>
            <div className="parent_padding detail_parent">
                <div className="container-fluid col-12 pl-4 pr-4">
                    <div className='row pr-1'>
                        <div className="col-12">
                            <div className="bread_crumb"><Link target='_self' to={"/home/" + prevmodule} onClick={all_accounts}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#4E73DF"></path></svg>
                                <Trans>{"All" + prev_module_name2}</Trans></Link>
                            </div>
                            <div className="view_page_head">
                                <div className="page_head mt-2">
                                <h3>{localStorage.getItem("cdetailsName") === "undefined" ? localStorage.getItem("cdetailsNum"):localStorage.getItem("cdetailsName")}
                                        
                                    </h3>
                                </div>

                                <div className="crt_btn_div crt_btn_div_tab_margin">
                                    {dybtn.length >= 1 ?
                                        <Dropdown >
                                            <Dropdown.Toggle className="btn-more" variant="success" id="dropdown-basic dropdownMoreButton">
                                                More
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {dybtn.map((dybt) => (
                                                    <Dropdown.Item
                                                        onClick={() => {
                                                            dyclick(dybt.workflow_id, dybt.type)
                                                        }}
                                                        href="#"
                                                        key={dybt.workflow_id}>{dybt.button_label}</Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        : null
                                    }
                                    {
                                        related_module !== "history" ?
                                            <button onClick={handleCalendar} className="crt_btn">
                                                <i className="crt_btn_i"><RiAddCircleLine /></i>
                                                
                                                <Trans>{"Create " + ((fieldsData && related_module === "customer") ? fieldsData?.related[0].relatedlistname : related_module)} </Trans>
                                            </button> :
                                            null
                                    }

                                </div>
                            </div>

                            <div className="mobile_icons_div mobile_icons_div1">
                                <div className="mobile_icons_left">
                                    <span className="float-left wordi">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none"><g clipPath="url(#clip0)"><path d="M13.5001 1.5C14.3251 1.5 14.9926 2.175 14.9926 3L15.0001 15C15.0001 15.825 14.3326 16.5 13.5076 16.5H4.50009C3.67509 16.5 3.00009 15.825 3.00009 15V6L7.50009 1.5H13.5001ZM8.25009 6.75V2.625L4.12509 6.75H8.25009Z" fill="#4E73DF" /><rect width="5.78572" height="0.964285" transform="matrix(-1 0 0 1 13.5 10.9287)" fill="white" /><rect width="7.07143" height="0.964285" transform="matrix(-1 0 0 1 13.5 12.8569)" fill="white" /></g><path d="M18.9648 6.17871C15.4548 6.17871 12.6066 9.02691 12.6066 12.5369C12.6066 16.0469 15.4548 18.8951 18.9648 18.8951C22.4748 18.8951 25.323 16.0469 25.323 12.5369C25.323 9.02691 22.4748 6.17871 18.9648 6.17871Z" fill="#4E73DF" stroke="white" strokeWidth="2" /><defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)" /></clipPath></defs></svg>

                                    </span>
                                    <span className="float-left wordp"><p>Details</p></span>
                                </div>

                                <div className="mobile_icons_right">
                                    <div className="relatedlist_drpdwn">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Related List
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="related_drop">
                                                <Dropdown.Item href={"#" + linkChangeForOpportunity2 + pvid}
                                                    onClick={() => localStorage.removeItem("relatedmodule")}>
                                                    <div className="di_icons">
                                                        <span className="related_svg_icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none"><g clipPath="url(#clip0)"><path d="M13.5001 1.5C14.3251 1.5 14.9926 2.175 14.9926 3L15.0001 15C15.0001 15.825 14.3326 16.5 13.5076 16.5H4.50009C3.67509 16.5 3.00009 15.825 3.00009 15V6L7.50009 1.5H13.5001ZM8.25009 6.75V2.625L4.12509 6.75H8.25009Z" fill="#4E73DF" /><rect width="5.78572" height="0.964285" transform="matrix(-1 0 0 1 13.5 10.9287)" fill="white" /><rect width="7.07143" height="0.964285" transform="matrix(-1 0 0 1 13.5 12.8569)" fill="white" /></g><path d="M18.9648 6.17871C15.4548 6.17871 12.6066 9.02691 12.6066 12.5369C12.6066 16.0469 15.4548 18.8951 18.9648 18.8951C22.4748 18.8951 25.323 16.0469 25.323 12.5369C25.323 9.02691 22.4748 6.17871 18.9648 6.17871Z" fill="#4E73DF" stroke="white" strokeWidth="2" /><defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)" /></clipPath></defs></svg>
                                                        </span>
                                                        <span className="r_name">Details</span>
                                                    </div>
                                                </Dropdown.Item>
                                                                   
                                                {
                                                    
                                                    rlist&&rlist.map((r) => (
                                                                <Dropdown.Item key={r.seq} href={r.name == "Comment"?"#/home/" + prevmodule + "/relatedlist/nn/" + pvid:"#/home/" + prevmodule + "/relatedlist/" + pvid}
                                                                    onClick={() => (localStorage.setItem("relatedmodule", r.name.toLowerCase()), catchrelatemodule(r.name))}> 
                                                                    <div className="di_icons" id={r.name}>
                                                                        <span className="related_svg_icon">{[<SVG src={r.related_icon}/>]}</span>
                                                                        <span className="r_name">{r.name}</span>
                                                                    </div>
                                                                   
                                                                </Dropdown.Item>
                                                                
                                                        ))
                                                    
                                                }
                                                 
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    {clickOpeExp()}
                                </div>
                            </div>
                            {clickOpExp()}
                          
                            {rlist[0] == undefined ? null :
                                <div className="icons_div">
                                    <span className="prev_arrow"></span>
                                    <Slider {...settings}>
                                        <div className="detail_icons">
                                            <li onClick={() => localStorage.removeItem("relatedmodule")}> 
                                                <a href={prevmodule === "opportunity" || prevmodule === "invoice"  || prevmodule === "opportunities" || prevmodule === "supplierorder" || prevmodule === "supplierorderreturn" ? ("#/home/" + prevmodule + "/detail-op/" + pvid) :  ("#/home/" + prevmodule + "/detail/" + pvid)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none"><g clipPath="url(#clip0)"><path d="M13.5001 1.5C14.3251 1.5 14.9926 2.175 14.9926 3L15.0001 15C15.0001 15.825 14.3326 16.5 13.5076 16.5H4.50009C3.67509 16.5 3.00009 15.825 3.00009 15V6L7.50009 1.5H13.5001ZM8.25009 6.75V2.625L4.12509 6.75H8.25009Z" fill="#4E73DF" /><rect width="5.78572" height="0.964285" transform="matrix(-1 0 0 1 13.5 10.9287)" fill="white" /><rect width="7.07143" height="0.964285" transform="matrix(-1 0 0 1 13.5 12.8569)" fill="white" /></g><path d="M18.9648 6.17871C15.4548 6.17871 12.6066 9.02691 12.6066 12.5369C12.6066 16.0469 15.4548 18.8951 18.9648 18.8951C22.4748 18.8951 25.323 16.0469 25.323 12.5369C25.323 9.02691 22.4748 6.17871 18.9648 6.17871Z" fill="#4E73DF" stroke="white" strokeWidth="2" /><defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)" /></clipPath></defs></svg>
                                                    <p>Details</p>
                                                </a>
                                            </li>
                                        </div>
                                       
                                        {
                                            rlist&&rlist.sort((a, b) => a.seq - b.seq).map((r) => (
                                                        [<div className="detail_icons"><li key={1} className={related_module == r.name.toLowerCase() ? "active" : ""}
                                                            onClick={() => (localStorage.setItem("relatedmodule", r.name.toLowerCase()), catchrelatemodule(r.name))}>{localStorage.setItem("filterIsrest",true)}
                                                           <a href={r.name == "Comment"? "#/home/" + prevmodule + "/relatedlist/nn/" + pvid: (prevmodule==="opportunity" || prevmodule==="opportunities") ?"#/home/" + "opportunities" + "/relatedlist/" + pvid:"#/home/" + prevmodule + "/relatedlist/" + pvid}>{[<SVG src={r.related_icon}/>]}<p><Trans>{r.name == 'Customer' ? r.relatedlistname : r.name}</Trans></p></a>
                                                        </li></div>] 
                                                ))
                                        }
                                    </Slider>
                                    
                                    <span className="next_arrow"></span>
                                </div>
                            }
                            <div className="global_filter">
                                <select className="float-left" name="search_mobile" defaultValue={search_mobile} onChange={changeHandle2}>
                                    <option className="option" hidden>Search by</option>
                                    {
                                        COLUMNS.map((COLUMN, i) => (
                                            COLUMN.Header !== "Actions" ?
                                                <option className="option" key={i} value={COLUMN.input}>{COLUMN.Header}</option> : null
                                        ))
                                    }
                                </select>
                                <div className="search_box">
                                    <input className="float-left" type="text" placeholder="Enter your Search"
                                        onChange={(e) => { setInput_mobile(e.target.value) }}></input>
                                    <span onClick={mobilesearch}><i><CgSearch /></i></span>
                                </div>
                            </div>
                            {columns.length <= 1 ?
                                <div id='loader'>
                                    {loading}</div> :
                                <div className="table forWidthOnly customer_table contact_tab tableWrap">
                                    <table {...getTableProps()}>
                                        <thead>
                                            {headerGroups.map(headerGroup => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map(column => (
                                                        <th  {...column.getHeaderProps()}> <Trans>{column.render("Header")}</Trans>
                                                            <span className="sorticon1" onClick={() => sort(column.input, "asc")}><i></i></span>
                                                            <span className="sorticon2" onClick={() => sort(column.input, "desc")}><i></i></span>
                                                            <form onSubmit={search}>
                                                                <div className="filter">
                                                                    {
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

                                                                        (column.input && column.ui_type === 9) ? column.render(
                                                                           <Uitype9DateModal acc={column.input} />
                                                                        ) :

                                                                        (column.ui_type === 10 )? column.render(
                                                                            <Uitype10DateTimeModal acc={column.input} />
                                                                         ) :

                                                                        (column.input && column.ui_type === 7) ? column.render(
                                                                           <RelatedTableDateField acc={column.input} />
                                                                        ) :
                                                                     
                                                                        column.input ? column.render(
                                                                            <input type="text"
                                                                                name={column.input}
                                                                                onChange={changeHandle}
                                                                                value={valuex[column.input] || ""}
                                                                                placeholder={column.Header}></input>
                                                                        ) : null

                                                                    }
                                                                   
                                                                    {
                                                                        column.button ? column.render(
                                                                            [isrest == false ? <button key="s" className="search_button" type="submit">Search</button> :
                                                                                <button key="r" className="reset_button" onClick={reset} type="button">Reset</button>]
                                                                        ) : null
                                                                    }
                                                                </div>
                                                            </form>
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody {...getTableBodyProps()}>
                                            {cuslist&&cuslist[0] === undefined ? (  <tr>
                          <td colSpan={columns.length}><div id='loader'> {loading}</div>
                                        </td>  </tr> ) :
                                                rows.map((row, i) => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr {...row.getRowProps()} className={
                                                            selectedFlatRows.map((sel) => {
                                                                return row.original.customer_num == sel.original.customer_num ? " " + "highlightcss" + " " : null
                                                            })
                                                        }>{row.cells.map((cell, i) => {
                                                            return <td  {...cell.getCellProps()}
                                                                data-title={cell.column.Header != "Actions" && typeof (cell.column.Header) != "function" ? [cell.column.Header + ":"] : null}
                                                                className={cell.column.Header == "Actions" ? "icon_cell_mobile" : null}>
                                                                    {(i == 1 && related_module !== "history" && cell.column.input ==="related_customer") ? <Link target='_self' className="td_a" to={ modRel_name +"/detail/" + cell.row.original[`related_${modRel_name ==="accounts" ?"customer" : modRel_name}id`]}>{cell.render("Cell")}</Link>  
                                                //    :          (i == 0 && related_module !== "history" && cell.column.input ==="related_customer") ?   <Link target='_self' className="td_a" to={cell.column.relatedOption[0] === "customer" ? "account"+ "/detail/" + row.original["related_customerid"]  : cell.column.relatedOption[0] + "/detail/" + row.original["related_customerid"]}>{cell.render("Cell")}</Link> 
                                                                  : (i == 0 && related_module !== "history" && cell.column.input !=="related_customer") ? <Link target='_self' className="td_a" to={linkChangeForOpportunity2 + row.original[module_name + "id"]}>{cell.render("Cell")}</Link> : (i == 1 && related_module !== "history" && cell.column.input ==="invoice_num") ? <Link target='_self' className="td_a" to={linkChangeForOpportunity2 + row.original[module_name + "id"]}>{cell.render("Cell")}</Link> : cell.value == "0" ? "-":cell.column.Header== "Date"? cell.row.original.date :cell.column.Header== "Start DateTime"? cell.row.original.start_datetime: cell.column.Header== "End DateTime"? cell.row.original.end_datetime:(cell.column.Header).match(/Date/g) ?cell.row.original.close_date || cell.row.original.timestamp:
                                                                    cell.render("Cell")}
                                                            </td>
                                                                ;

                                                        })}
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                        <div className="col-lg-11">
                            {[related_module === "operationalexpense" ?
                                (details.total === undefined) ? null :
                                    <div>
                                        <Grid container>
                                            <Grid item xs={7}></Grid>
                                            <Grid item xs={1}
                                                style={{
                                                    fontWeight: 'bold',
                                                    margin: 'auto',
                                                    textAlign: 'right',
                                                    paddingRight: '0%'
                                                }}>
                                                <label style={{ marginRight: "-38%" }}>Total Amount</label>
                                            </Grid>
                                            <Grid item xs={4}
                                                style={{
                                                    paddingRight: "7%",
                                                    paddingLeft: "4%"
                                                }}
                                            >
                                                <div className="filter opp">
                                                    <input type="text"
                                                        name="total_amount"
                                                        value={totalAmount}
                                                        placeholder="" readOnly></input>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                : related_module === "payrollcosts" ?
                                    (details.total === undefined) ? null :
                                        <div>
                                            <Grid container>
                                                <Grid item xs={7}></Grid>
                                                <Grid item xs={2}
                                                    style={{
                                                        fontWeight: 'bold',
                                                        margin: 'auto',
                                                        textAlign: 'right',
                                                        paddingRight: '0%'
                                                    }}>
                                                    <label style={{ marginRight: "-11%" }}>Total Amount</label>
                                                </Grid>
                                                <Grid item xs={3}
                                                    style={{
                                                        paddingRight: "4%",
                                                        paddingLeft: "2.5%"
                                                    }}
                                                >
                                                    <div className="filter payroll">
                                                        <input type="text"
                                                            name="total_amount"
                                                            value={totalAmount}
                                                            placeholder="" readOnly></input>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                    </div>
                                    : null]
                            }

                        </div>
                        <div className="col-lg-12 col-12">
                            <div className="para">
                                {details.total === undefined ? null :
                                    <div className="d-flex show-tab">
                                        <label>Show</label>
                                        <Dropdown drop='up'>
                                            <Dropdown.Toggle className="btn btn-more dropdown-toggle" id="dropdown-basic dropdownShowButton">
                                                {noofdata || details.per_page}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {
                                                    noOfData.map((number) => (
                                                        <Dropdown.Item key={number} href="#" onClick={() => datanum_chnage(number)}>{number}</Dropdown.Item>
                                                    ))
                                                }

                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                }
                                <nav aria-label="pagination">
                                    <ul className="pagination">
                                        {details.total !== undefined ?
                                            <ReactPaginate
                                                disableInitialCallback={false}
                                                previousLabel={"Prev"}
                                                nextLabel={"Next"}
                                                breakLabel={"..."}
                                                breakClassName={"break-me"}
                                                pageCount={details.last_page || 0}
                                                initialPage={offset-1}
                                                marginPagesDisplayed={1}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"} /> : null
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <ShowErrorMsg error_msg={error_msg} smShowError={smShowError} setSmShowError={setSmShowError} setError_msg={setError_msg} />


                        {/* modal for Dynamic BUtton xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                     
                    
                      {( 
                        <Modal  className="dynmc_btn_mdl" show={show} onHide={handleClose} scrollable={true}  >
                        <Modal.Header closeButton closeLabel="">
                        <Modal.Title>Workflow Title Here</Modal.Title>
                        </Modal.Header>
                          <Modal.Body>
                            {snum != "run Query{}" && dy_btn_form != null ?
                            dy_btn_form.map((dbf) => (  [
                                <label key={dbf.fieldlabel}>{dbf.fieldlabel}
                                  {dbf.mandatory == 1 ? <h6>{workf_error}</h6> : null}
                                </label>,
                                <br></br>,
                                   <input
                                  key={dbf.fieldkey}
                                  type="text"
                                  name={dbf.fieldkey}
                                //   onChange={(e) => { setDy_form_data(e.target.value);  }}
                                onChange={dy_changeHandle}
                                ></input>,
                                <br></br>,
                              ]
                            )) : null
                        }
                            {
                            snum.stepnum ? dy_btn_form == null ? null :
                                <button type="submit" onClick={() => { dysubmit(snum.stepnum) }} className="dynmc_btn_mdl_sub_btn">
                                    {dy_btn_form == null ? "Submit" : "Next"}
                                </button> :
                                <h4>{snum.commplete}</h4> 
                        }
                          </Modal.Body>
                        </Modal>
                      )} 
      


                        {/* <Modal className="dynmc_btn_mdl" show={show} onHide={handleClose} scrollable={true}>
                            
                            <Modal.Body>
                                {snum != "run Query{}" && dy_btn_form != null ?
                                    dy_btn_form.map((dbf) => (
                                        [
                                            <label key={dbf.fieldlabel}>{dbf.fieldlabel}</label>, <br></br>,
                                            <input key={dbf.fieldkey} type="text"
                                                name={dbf.fieldkey}
                                                onChange={(e) => { setDy_form_data(e.target.value) }}
                                            ></input>, <br></br>
                                        ]
                                    )) : null
                                }
                                <button type="submit" onClick={() => { dysubmit(snum.stepnum) }} className="dynmc_btn_mdl_sub_btn">Submit</button>

                            </Modal.Body>
                        </Modal> */}

                        {/* modal for delete xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                        <Modal show={show3} onHide={handleClose3} className="modal_delete fade small_modal modal">
                            <Modal.Header>
                                <Modal.Title>Delete <Trans>{module_name}</Trans></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>Are you sure that you want to delete the selected <Trans>{module_name}</Trans>?</h5>
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


                        {/* xxxxxxxxxxxxxx modal for related create records xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

                        <Modal backdrop="static" show={calendarModal} onHide={() => (setCalendarModal(false), setRelcrtpop(false), reset())} className="search_modal plus_modal related_create" scrollable={true} data-bs-backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    (related_module === "opportunity") || (related_module === "invoice") || (related_module === "supplierorderreturn") ||  (related_module === "supplierorders")?
                                        <OpCreatePage hide="hide" himmat={related_module} details={details.data} yes={relcrtpop} relatedPopUp={related_module_popup} closeBox={() => setCalendarModal(false)} /> :
                                        <CreateModulePage hide="hide" himmat={related_module} details={details.data && details.data [0] }refreshList={(e) => { handleListRefresh(e) }} yes={relcrtpop} relatedPopUp={related_module_popup} closeBox={() => setCalendarModal(false)} />
                                }

                            </Modal.Body> 
                        </Modal>

                    </div>
                </div>
            </div>
        </rlist1.Provider ></>
    )
}

export default RelatedList;