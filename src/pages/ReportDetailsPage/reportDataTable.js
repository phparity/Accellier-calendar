import React, { useState, useEffect, useMemo, useRef, createContext } from 'react'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useTable, useRowSelect, useGlobalFilter, useFilters } from 'react-table'
import { IndeterminateCheckbox } from '../../middleware/IndeterminateCheckbox'
import "../../assets/style/CustomerList.css"
import { Trans } from 'react-i18next';
import i18n from "../../config/i18n"
import Dropdown from "react-bootstrap/Dropdown"
import { MdModeEdit } from "react-icons/md"
import { CgSearch } from "react-icons/cg"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { useLocation } from 'react-router';
import ReportPagination from './reportPagination'
import useGetReq from "../../service/useGetReq";
import useDeleteReq from "../../service/useDeleteReq";
import { MOB_R_LIST_API, MOB_SEARCH_R_LIST_API, RESET_CUS_LIST_API, SEARCHREPORT_CUS_LIST_API, SORT_CUS_DATA, LISTREPORTDETAILSDATA } from '../../service/ApiPath'
import { CheckModuleName, PrevModuleName } from "../../utils/CheckModuleName"
import { useContext } from 'react'
import { AuthContext } from '../../config/Authentications/AuthContext'
import useFetch from '../../service/GetApiResponse'
import { Param } from '../../components/Params'
import { opCreatePageData, searchTableModuleValue } from '../../navigation/PageRoutes';
import axios from "../../config/Axios"
import { d_table } from './reportDetailsPage'
import ShowErrorMsg from '../../components/ShowErrorMsg'
import { BiDownload, BiPrinter } from "react-icons/bi"
import Moment from 'moment';
import { Spinner } from 'react-bootstrap'
import ReportGraph from './reportGraph'
import RelatedTableDateField from '../../components/DateModalForRelatedTable/RelatedTableDateField'
import useStorage from '../../service/useStorage'
import { recordErrorAPIdata } from '../../service/useApiData'

export const UpdateCustList = createContext();
export const UpdateDetails = createContext();
export const selecet_Rows = createContext();
const ReportDataTable = (props) => {
    const storage = useStorage();
    const { smShowError, setSmShowError, error_msg, setError_msg } = useContext(searchTableModuleValue)
    const { reportId } = props;
    const { authState, setAuthState } = useContext(AuthContext)
    const { current_pages, setCurrent_pages } = useContext(d_table)
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
    const [offset, setOffset] = useState(authState.page || 1);
    const [adminpermission, setAdminpermission] = useState(true)
    const [importSample, setImportSample] = useState("")
    const prevModuleValue = useRef("")
    const [getData] = useGetReq();
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
    const [csvData, setCSVData] = useState("");
    const [tempErr, setTempErr] = useState("");
    const [graphlistData, setGraphlistData] = useState([]);
    let navigate = useNavigate();

    const base_url = process.env.REACT_APP_BASE_URL;

    let reportSaid = localStorage.getItem('said');
    let logData = [];
    let viewData = {};
    viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            //    e.preventDefault();
            //    e.returnValue = "";
            localStorage.setItem("page", 1)
        }
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [])

    const lang = authState.language
    let { pvid } = useParams();
    let prev_module_name = PrevModuleName()

    if (lang) {
        i18n.changeLanguage(lang)
    }


    let module_name = CheckModuleName()
    const handleQueryString = useLocation().search;


    let nice = ""

    useEffect(() => {
        localStorage.removeItem("page")
    }, [module_name])

    useEffect(() => {
        localStorage.removeItem("prev_c_id")
        setAuthState({ ...authState, duplicate: '' })
    }, [module_name])

    useEffect(() => {
        prevModuleValue.current = module_name
        nice = handleQueryString.replace('?', '').replace(/%20/g, " ")
    }, [module_name])

    let valuexy = JSON.stringify(valuex).replace(/[\{\}\"]/g, '').replace(/:/s, "=").replace(/,/g, "&")

    let data1 = { params: { 'report_id': reportId } }
    let data2 = { params: { 'report_id': reportId, 'page': 1, 'ipp': authState.line || details.per_page } }
    let dataSetSearch = { params: { 'report_id': reportId, 'report_filter': valuexy } }
    let dataSetReset = { params: { 'report_id': reportId, 'page': authState.page } }
    let data6 = Param.data10(search_mobile, input_mobile, authState.order, authState.line)
    let data10 = Param.data13(prev_module_name, related_module, pvid, search_mobile, input_mobile, authState.order, authState.line)

    useEffect(() => {
        setValuex("")
    }, [module_name])

    useEffect(() => {
        // first page data
        if (listReportData) {
            setCurrent_pages(listReportData?.current_page)
            setAuthState({ ...authState, customerDetails: '' })
            setAdminpermission(true)
            setCuslist(listReportData?.data)
            setGraphlistData(listReportData?.graph_data)
            setDetails(listReportData)
            setIsrest(false)
            setTimeout(() => {
                setShowMsg(true)
            }, 1000)

            if (err) {
                setCuslist([])
            }
        }
    }, [listReportData, module_name])

    useEffect(() => {

        if (CustomerListData) {
            CustomerListData.from == null && CustomerListData.to == null ? alert("No Record(s) Found") :
                setCuslist(CustomerListData?.data)
            setDetails(CustomerListData)
            setIsrest(true)
            // setValuex({})
            if (err) {
                console.log(err)
            }
        }
    }, [CustomerListData])

    useEffect(() => {
        if (listViewApiData) {
            setTable_header(listViewApiData?.fields)
        }
        if (currentPageData) {
            setOffset(currentPageData?.current_page)
            setAuthState({ ...authState, customerDetails: '' })
            setAdminpermission(true)
            setCuslist(currentPageData.data)
            setDetails(currentPageData)
            setIsrest(false)
            setTimeout(() => {
                setShowMsg(true)
            }, 1000)

            if (err) {
                setCuslist([])
            }
        }
        // if (listReportData) {
        //     console.log(145, listReportData);
        //     setCuslist(listReportData.data)
        //     setDetails(listReportData)
        //     setAuthState({ ...authState, customerDetails: '' })
        // }
        if (err) {
            setCuslist([])
        }

        if (resetCustomerListData && isrest) {
            setCuslist(resetCustomerListData.data)
            setDetails(resetCustomerListData)
            setIsrest(false)
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
            setValuex({})
            if (err) {
                console.log(err)
            }
        }

        if (sortData && adValue === "asc") {
            setCuslist(sortData.data)
            setDetails(sortData)
        }
        if (descsortData && adValue === "desc") {
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
    }, [descsortData, sortData, CustomerListData, resetCustomerListData, cusList_desc_Data, rList_desc_Data, rListHistory_desc_Data, r_List_Data, r_List_asc_Data, rListData, rListHistoryData, listViewApiData, currentPageData, listReportData])

    useFetch(LISTREPORTDETAILSDATA(tenantCname, module_name, 'getreportfield'), setListViewApiData, setErr, data1)
    useFetch(LISTREPORTDETAILSDATA(tenantCname, module_name, 'getreport'), setListReportData, setErr, data2)

    let COLUMNS = [
        {
            Header: 'Actions',
            accessor: 'type',
            button: "button",
            show: false,
            report_field_display_name: '',
            Cell: (accessor) => {
                setAdminpermission(false); return <div className="act_icons"> </div>
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
        }
    };
    const changeHandle2 = (e) => {
        setSearch_mobile(e.target.value)
    }



    const search = (e) => {
        e.preventDefault();
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
            error_msg.push("Please provide search")
            setSmShowError(true)
            return;
        }

        const filterString = filters.join('&');
        let m_name = "getreport"
        getData(SEARCHREPORT_CUS_LIST_API(tenantCname, m_name), setCustomerListData, setErr, dataSetSearch,storage);
        // getData(SEARCH_CUS_LIST_API(m_name), setCustomerListData, setErr, dataSetSearch);

        // setIsrest(true);
    }

    const reset = (one) => {
        let m_name = "getreport"
        setValuex({})
        nice = ""
        getData(RESET_CUS_LIST_API(m_name), setResetCustomerListData, setErr, dataSetReset,storage);
        setNoofdata(details.per_page)
    }
    const mobilesearch = () => {

        let m_name = "getreport"

        if (related_module !== null) {

            getData(MOB_R_LIST_API(tenantCname), setRListData, setErr, data10,storage);
        }
        else {
            getData(MOB_SEARCH_R_LIST_API(m_name), setMobileSearchData, setErr, data6,storage);
        }
    }

    (table_header).slice(0).reverse().map((h) => (
        h.sequence > 0 ?
            COLUMNS.unshift({
                Header: h.fieldlabel.replace("&pound;", "£"),
                accessor: h.fieldname,
                input: h.fieldname,
                ui_type: h.uitype,
                picOption: h.options,
                relatedOption: h.relatedto,
                show_hide_criteria: h.show_hide_criteria,
                report_field_display_name: h.report_field_display_name
            }
            ) : null
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
            if (authState.roleid === "1" && module_name === "report") {
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

    const sort = async (accr, ad) => {
        try {
            setAuthState({ ...authState, order: accr + ":" + ad });
            setAccrValue(accr);
            setAdvalue(ad);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        let spy = "getreport"
        if (adValue === 'asc' && accrValue !== null && accrValue !== "") {
            let dataSetAsc = { params: { 'report_id': reportId, 'report_sorting': accrValue + ":" + adValue } }

            sort(accrValue, adValue); // Trigger the state updates
            getData(SORT_CUS_DATA(tenantCname, spy), setSortData, setErr, dataSetAsc,storage);
        } else if (adValue === "desc") {
            let dataSetDesc = { params: { 'report_id': reportId, 'report_sorting': accrValue + ":" + adValue } }

            sort(accrValue, adValue); // Trigger the state updates
            getData(SORT_CUS_DATA(tenantCname, spy), setDescSortData, setErr, dataSetDesc,storage);
        }
    }, [accrValue, adValue]);

    const onClickEdit = () => {
        console.log(props, 'props');
        // const{said, reportId} = authState;
        setAuthState({ ...authState, reportId: reportId })
        localStorage.setItem('reportId', reportId)
        localStorage.setItem('said', reportSaid);
        navigate(`/home/${module_name}/add-edit-report/${reportSaid}`)
    }

    const printOnClick = (e) => {
        e.preventDefault();
        // var printContent = document.getElementById('reportTable').innerHTML;
        // var originalContent = document.body.innerHTML;
        // document.body.innerHTML = printContent;
        window.print();
        // document.body.innerHTML = originalContent;
    }

    const downloadCSVonClick = (e) => {
        e.preventDefault();
        if (reportId !== null) {
            axios.get("/" + tenantCname + "/api/reportingexport", {
                headers: {

                    "Accept": "application/JSON",
                    "Authorization": "Bearer" + " " + localStorage.getItem('token')
                },
                params: {
                    "report_id": reportId
                }
            }

            )
                .then(res => {
                    setCSVData(res.data)
                    window.open(base_url + (res.data).substring(0, (res.data).indexOf("<")))
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'reportingexport'}`, 'payload':{
                        "report_id": reportId
                    }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                    recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
                .catch(err => {
                    console.log(err)
                    logData = [{...viewData, 'module_name': module_name, 'api': `/${'reportingexport'}`, 'payload':{
                        "report_id": reportId
                    }, 'response':[], 'error_details': err, 'status_code':'' }];
                    if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
                      recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
                    }
                })
        }
    }
    const detectId = (item) => {
        let itemIndex = item?.lastIndexOf("_");
        let result = item?.substr(itemIndex);
        return result;
    }

    const convertId = (item) => {
        let result = item?.replace("_name", "_id");
        return result;
    }

    const changeLink = (item) => {
        let linkText = item.slice(0, -5);
        let transTitle = linkText
        return transTitle;
    }

    const styleProperty = (styleValue, direction) => {
        // console.log(styleValue, direction, 'styleValue, direction');
        let styleObject = {};
        if (styleValue !== undefined) {
            const styleString = styleValue;
            const cleanedStyleString = styleString.replace(/'/g, '');
            return styleObject = Object.fromEntries(
                cleanedStyleString
                    .split(',')
                    .map((pair) => {
                        let [key, value] = pair.split(':').map((str) => str.trim());
                        if (direction === 'row') {
                            return [key.split('-')[1], value];
                        } else if (direction === 'cell') {
                            return [key, value];
                        }
                    })
            );
        } else {
            return styleObject = {}
        }
    }


    {

        return (
            <UpdateCustList.Provider value={{ cuslist, setCuslist }} >
                <UpdateDetails.Provider value={{ details, setDetails }}>
                    <selecet_Rows.Provider value={{ selectedFlatRows }}>
                        <div className="parent_padding">
                            <div className="container-fluid col-12">
                                {
                                    <div className='row'>
                                        <div className="col-12">
                                            <div className="bread_crumb">
                                                <Link target='_self' to={`/home/${module_name}s`}
                                                //onClick={()=>(all_accounts(), clear())}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#4E73DF"></path></svg>
                                                    <Trans>
                                                        {"All " + module_name + 's'} </Trans>
                                                </Link>
                                            </div>
                                            <div className='view_page_head'>
                                                <div className="page_head mt-2">
                                                    <h3><Trans>{listViewApiData?.report_name}</Trans></h3>
                                                </div>
                                            </div>
                                            <div className="top_btns">
                                                <div>
                                                    {/* <div class="bulk_icons">
                                                        <div class="btn_actions dropdown">
                                                                <Dropdown autoClose="outside">
                                                                    <Dropdown.Toggle className="btn-more" id="dropdown-basic3 dropdownMoreButton">
                                                                        Select Actions
                                                                    </Dropdown.Toggle>

                                                                {listViewApiData?.search_param !== null ?
                                                                    <Dropdown.Menu>
                                                                        {(listViewApiData?.search_param !== null && listViewApiData?.search_param.length > 0) && listViewApiData?.search_param.map((item, id) => {
                                                                            <Dropdown.Item
                                                                                key={id}
                                                                                as="button"
                                                                            >
                                                                                {item}
                                                                            </Dropdown.Item>
                                                                        })}

                                                                    </Dropdown.Menu>
                                                                    : ''   
                                                                }
                                                                </Dropdown> 
                                                                
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="crt_btn_div">
                                                    <div className="bulk_icons jbjb">
                                                        {(listViewApiData?.module_access === '4') ?
                                                            (<Dropdown className="btn_actions">
                                                                <Dropdown.Toggle className="btn-more" id="dropdown-basic3">
                                                                    <Trans>Action</Trans>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item as="button" onClick={(e) => printOnClick(e)}><i><BiPrinter /></i>Print <Trans>{module_name}</Trans></Dropdown.Item>
                                                                    <Dropdown.Item as="button" onClick={(e) => downloadCSVonClick(e)}><i><BiDownload /></i> Download CSV <Trans>{module_name}</Trans></Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>)
                                                            : ''}

                                                    </div>
                                                    <button className="crt_btn" onClick={() => onClickEdit()} style={{ minWidth: '100px' }}><div><i className="crt_btn_i"><MdModeEdit /></i> Edit</div></button>
                                                </div>
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
                                            {(cuslist.length > 0) ?
                                                (showMsg && cuslist[0] == undefined ? <div id='loader'>No Record(s) Found!</div> :
                                                    <div className={`table forWidthOnly report_table customer_table tableWrap report_details`}>
                                                        <table {...getTableProps()}>
                                                            <thead >
                                                                {headerGroups.map((headerGroup, h) => (
                                                                    <tr key={h} {...headerGroup.getHeaderGroupProps()} style={{ border: "none" }}>
                                                                        {headerGroup.headers.map((column, c) => (
                                                                            cuslist.length >= 1 && column.show_hide_criteria != 0 ? <th key={c} {...column.getHeaderProps()}><><Trans>{column.render("report_field_display_name")}</Trans></>

                                                                                <span className="sorticon1" onClick={() => sort(column.input, "asc")}><i></i></span>
                                                                                <span className="sorticon2" onClick={() => sort(column.input, "desc")}><i></i></span>

                                                                                <form onSubmit={(e) => search(e)}>
                                                                                    <div className={`filter ${column.button ? 'filter_search' : ''}`}>
                                                                                        {(column.input && ((column.ui_type === 1) || (column.ui_type === 3) || (column.ui_type === 5) || (column.ui_type === 6) || (column.ui_type === 8) || (column.ui_type === 9) || (column.ui_type === 100) || (column.ui_type === 101) || (column.ui_type === 102) || (column.ui_type === 104) || (column.ui_type === 105) || (column.ui_type === 11))) ? column.render(
                                                                                            <input type="text"
                                                                                                name={column.input}
                                                                                                onChange={changeHandle}
                                                                                                value={valuex[column.input] ? valuex[column.input] : ''}
                                                                                                placeholder={column.report_field_display_name.replace("&pound;", "£")}></input>
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
                                                                                                [isrest == false ? <button key="s" className="search_button" onClick={(e) => search(e)} type="submit">Search</button> :
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
                                                                    prepareRow(row);
                                                                    return (
                                                                        <tr key={i} {...row.getRowProps()} className={
                                                                            selectedFlatRows.map((sel) => {
                                                                                return row.original[module_name + "_num"] == sel.original[module_name + "_num"] ? " " + "highlightcss" + " " : null
                                                                            })
                                                                        }
                                                                            // style={styleProperty(row?.original[row?.cells[i]?.column.input + "_styles"], 'row')}
                                                                        >
                                                                            {row.cells.map((cell, i) => {
                                                                                // console.log(cell, 'cell');
                                                                                return <td key={i} {...cell.getCellProps()}
                                                                                    data-title={cell.column.Header != "Actions" && typeof (cell.column.Header) != "function" ? [cell.column.Header + ":"] : null}
                                                                                    className={cell.column.Header == "Actions" ? "icon_cell_mobile" : null}
                                                                                style={styleProperty(row?.original[cell.column.input + "_styles"], 'cell')}
                                                                                >
                                                                                    {(detectId(convertId(cell.column.input)) === '_id' && row?.original[convertId(cell.column.input)] !== undefined) ?
                                                                                        <Link target='_blank' to={`/home/${detectId(cell.column.input) === '_name' ? cell.column.input.slice(0, -5) === 'customer' ? 'accounts' : cell.column.input.slice(0, -5) === 'product' ? 'inventory' : changeLink(cell.column.input) : cell.column.input}/${changeLink(cell.column.input) === 'opportunity' || changeLink(cell.column.input) === 'invoice' || changeLink(cell.column.input) === 'supplierorder' ? 'detail-op' : 'detail'}/${row?.original[convertId(cell.column.input)]}`}><Trans>{cell.render("Cell")}</Trans></Link> : <Trans>{detectId(cell.column.input) === '_date' ? (Moment(row?.original[cell.column.input], 'YYYY-MM-DD').format('DD-MM-YYYY') !== "Invalid date" ? Moment(row?.original[cell.column.input], 'YYYY-MM-DD').format("DD-MM-YYYY") : '-') : cell.column.input == "email" ? cell?.row?.original["email"] : cell.column.Header == "Stock Location" ? cell?.row?.original["warehouse_multiple_module"] + " " + [cell.value] : cell.render("Cell")}</Trans>}

                                                                                </td>
                                                                            })}

                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) :
                                                (<div className='loaderWrap'>
                                                    <Spinner animation="border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </Spinner>
                                                </div>)
                                            }
                                        </div>
                                        {(cuslist.length > 0) && <><div className="col-lg-5"></div>
                                            <div className="col-lg-7 col-12">
                                                <ReportPagination currentPageData={listReportData} reportId={reportId} reset={reset} valuexy={valuexy} />
                                            </div></>}
                                        <ShowErrorMsg error_msg={error_msg} smShowError={smShowError} setSmShowError={setSmShowError} setError_msg={setError_msg} />
                                    </div>}
                                <div className='row' style={{ marginBottom: '80px' }}>
                                    <ReportGraph graphlistData={graphlistData} />
                                </div>
                            </div>
                        </div>
                    </selecet_Rows.Provider>
                </UpdateDetails.Provider>
            </UpdateCustList.Provider>
        )
    }
}

export default ReportDataTable;


