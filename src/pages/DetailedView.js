/* eslint-disable */
import React, { useState, useEffect,useContext } from "react";
import "../assets/style/DetailedView.css";
import "../assets/style/OpCreateEdit.css";
import i18n from "../config/i18n";
import { Trans } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Moment from "moment";
import Header from "../layouts/Header";localStorage.getItem("c_id")
import LineOrder from "../components/DetailedView/LineOder";
import { createContext } from "react";
import GenerateQuote from "../components/GenerateQuote";
import RelatedIconList from "../components/RelatedIconlist";
import { CheckModuleName } from "../utils/CheckModuleName";
import DetailViewActionDropDown from "../components/DetailViewActionDropdown.js";
import { AuthContext } from "../config/Authentications/AuthContext";
import useGetReq from "../service/useGetReq";
import { APIPATH, FIELDSAPI, WORKFLOWAPI } from "../service/ApiPath";
import Footer from "../layouts/Footer";
import { r_value,linee_value, opCreatePageData } from "../navigation/PageRoutes";
import axios from "../config/Axios"
import BackToLinks from "../components/UitypeComponents/BackToLinks";
import SupplierorderReceiptLines from "../components/SupplierorderReceiptLines";
import useStorage from "../service/useStorage.js";
import useFetch from "../service/GetApiResponse.js";
import { recordErrorAPIdata } from "../service/useApiData.js";

export const blockeDetail = createContext();
export const cDetails2 = createContext();
export const linedetails = createContext();
export const linee1 = createContext();
export const gen_pdf = createContext();
export const dblocke_value = createContext();


function DetailedView() {
  const storage = useStorage();
  const { authState, setAuthState } = useContext(AuthContext)
  let { line, setLine,netProfit, setNetProfit, TsalesPrice, TcostPrice, TnetOfTaxes,setTnetOfTaxes, grand, vat, TCdiscount, Tdiscount, Tmargin, setTmargin, Tmarginper,g_total, setG_total,total1, settotal1, lineObject, setLineObject} = useContext(linee_value)
    const { add, setAdd } = useContext(opCreatePageData)
  const tenantCname = authState.tenant_cname
  const [blocke, setBlocke] = useState([])
  const {rlist, setRlist,add_forName, setAdd_forName,setuitype6_value }= useContext(r_value)
  let [linee, setLinee] = useState([])
  const [product_Table, setProduct_Table] = useState("")
  const [cdetails, setCdetails] = useState([])
  const [c_id, setC_id] = useState('')
  const [dybtn, setDybtn] = useState([])
  const [dy_btn_form, setDy_btn_form] = useState([])
  const [snum, setSnum] = useState({})
  const [dy_form_data, setDy_form_data] = useState({})
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [norecord, setNorecord] = useState('')
  const [warningModal, setWarningModal] = useState(false)
  const [warning, setWarning] = useState(localStorage.getItem("warning") || "null")
  const [cdetailsLines, setCdetailsLines] = useState([])
  const [generatePdf, setGeneratePdf] = useState(false)
  const [getData] = useGetReq();
  const [workflowData, setWorkflowData] = useState("")
  const [fieldsData, setFieldsData] = useState("")
  const [apiPathData, setApiPathData] = useState("")
  const [newErr, setNewErr] = useState("")
  const [err, setErr] = useState("")
  const [wstepsData, setWstepsData] = useState("")
  const [wstepsData1, setWstepsData1] = useState("")
  const [uiType14Module,setUiType14Module] = useState('')
  const [opExpTotAmount, setOpExpTotAmount] = useState('')
  const [payCostTotAmount, setPayCostTotAmount] = useState('')

  const [expenseEdit, setExpenseEdit] = useState(0)
  const [payrollEdit, setPayrollEdit] = useState(0)
  const [copyCost,setCopyCost] = useState(true)
  const [pdfOption, setPdfOption] = useState("")
  const [groupName, setGroupName] = useState([])
  const [show2, setShow2] = useState(false);
  const [warehouse_multiple_record, setWarehouse_multiple_record] = useState("")
 
  const handleClose = () => setShow(false);
  const handleCloseWarningModal = () => setWarningModal(false);
  const handleResetStorage = () => {
    setWarningModal(false);
    localStorage.setItem("warning", null);
  };

  let { id } = useParams();
  let { e_module_name } = useParams();
  let { epid } = useParams();

  const editCustomerDetail = () => {
    localStorage.setItem("customerDetails", JSON.stringify(cdetails))
    setAuthState({ ...authState, customerDetails: JSON.stringify(cdetails) })
  }


  let navigate = useNavigate();

  const lang = localStorage.getItem("language");
  if (lang) {
    i18n.changeLanguage(lang);
  }
  let module_name = CheckModuleName();
  let related_list_link = module_name;
  if(related_list_link == "customer"){
    related_list_link = "accounts"
  }

  let logData = [];
  let viewData = {};
  viewData = {'view_name': sessionStorage.getItem('vwname'), 'company_id': localStorage.getItem('companyId'), 'user_id': localStorage.getItem('userid'), 'user_ip': sessionStorage.getItem('ipAddress'), };

  // if (module_name === ("opportunity" || "invoice" || "supplierorder")) {
  //   window.location.hash = "#/home/" + module_name + "/detail-op/" + id;
  // }

  localStorage.setItem("prev_module_name", module_name);

  let related_module = localStorage.getItem("relatedmodule");
  let selectedFlatRows = localStorage.getItem("selectedFlatRows");
  let selectedFlatRowsmy = JSON.parse(selectedFlatRows);

  useEffect(()=>{setuitype6_value({})},[])

  useEffect(() => {
    if (fieldsData) {
      setBlocke(fieldsData.block);
      setRlist(fieldsData.related);
      setLinee(fieldsData?.line?.block);
      setGeneratePdf(fieldsData.related);
    }
    if (workflowData) {
      setDybtn(workflowData);
    }
    if (apiPathData) {
      // console.log(apiPathData,"apiPathData")
      setAdd_forName({})
      setAdd({})
      setCdetails(apiPathData[0])
      setCdetailsLines(apiPathData[0]?.lines?.Group)
      setProduct_Table(apiPathData.data)
      functioncall(apiPathData[0])
      newline(apiPathData[0]);
      localStorage.setItem("c_id", id)
      setAuthState({...authState, c_id:id, cdetails:apiPathData[0][`${module_name}_name`] && apiPathData[0][`${module_name}_name`]})
      localStorage.removeItem("customerDetails")
      localStorage.setItem("cdetailsName",apiPathData[0][`${module_name}_name`])
      localStorage.setItem("cdetailsNum",apiPathData[0][`${module_name}_num`])
      localStorage.setItem("initial_op", JSON.stringify(apiPathData[0]))
      localStorage.setItem("expense_updated", "0")
      localStorage.setItem("payroll_updated", "0")
      localStorage.setItem("initial_payroll", apiPathData&&apiPathData[0]?.payroll_costs)
     
      setExpenseEdit(apiPathData[0].operational_expenses)
      setPayrollEdit(apiPathData[0].payroll_costs)
      setCopyCost(apiPathData[0].copy_costs)
      setPdfOption(apiPathData[0].pdf_download)

      if (related_module === null) {
        localStorage.setItem("prev_c_id", id)
        setAuthState({...authState,prev_c_id:id})
      }
      setNorecord('')
    }
    if (newErr) {
      setTimeout(() => {
        setNorecord("No Record Found!")
      }, 1000);
    }
    if (wstepsData1) {
      setSnum(wstepsData1);
      setDy_btn_form(wstepsData1.fields);
      window.open( "/#" + wstepsData1[0].button_function + "&supplierorder=/" +id)
    }
    if (wstepsData) {
      setDy_btn_form(wstepsData.fields);
      setSnum(wstepsData);
      if (wstepsData.fields == undefined && wstepsData.stepnum) {
        dysubmit(wstepsData.stepnum);
      }
    }

  }, [fieldsData, workflowData, wstepsData1, wstepsData,apiPathData])

    useEffect(() => {
      let param = {
        params: {
          module: module_name,
        }
      }
      getData(FIELDSAPI(tenantCname),setFieldsData,setErr,param,storage)

      if (
        module_name != "supplier" && module_name != "contact" && module_name != "invoice" 
      ) {
        let param = {
          params: {
            module: module_name,
            view: "detail",
          }
        }
        getData(WORKFLOWAPI(tenantCname),setWorkflowData,setErr,param,storage)
        
      }
    }, [id]);
    useEffect(() => {
        if (warning !== "null") {
            setWarningModal(true)
        }
        let forthis = ""
        if (module_name === "opportunity") {
            forthis = "opportunitie"
        } else {
            forthis = module_name
        }
        let apiPath = '';
        if (module_name === "payrollcosts") {
            apiPath = "/api/" + forthis + "/" + id
        } else {
            apiPath = "/api/" + forthis + "s/" + id
        }
        let param = {
          params: {
            "company_id": authState.companyId||authState.company_id
        }
        }
        getData(APIPATH(tenantCname,apiPath),setApiPathData,setNewErr,param,storage)
       
    }, [id])
  const [swid, setSwid] = useState("");
  const dyclick = (dy, dyt) => {
    let param = {
      params: {
        module: module_name,
        view: "detail",
        wid: dy,
        formtype: "1",
      }
  }

    getData("/"+tenantCname+"/api/wsteps",setWstepsData1,setErr,param,storage)
   
    setSwid(dy)
    if (dyt == "Webform") { setShow(true) }
    else { setShow(false) }
  }

  const dysubmit = (num) => {
    let param = {
      params: {
        module: module_name,
        view: "detail",
        wid: swid,
        formtype: "1",
        stepnum: num,
        email: dy_form_data.email,
      }
    }
    getData(WSTEPS(tenantCname),setWstepsData,setErr,param,storage) 
}

useEffect(() => {
  fetchData();
}, []);

useEffect(() => {
  fetchDataPay();
}, []);


useEffect(() => {
  fetchOppExpData();
  fetchPayCostData();
}, [])


const fetchOppExpData = async () => {
  //to get total amount of operational expense
  if(module_name == "opportunity" && related_module == "operationalexpense"){
    await axios.get("/"+tenantCname+"/api/relatedmodule", {
    headers: {
      "Accept": "application/JSON",
      "Authorization": "Bearer" + " " + localStorage.getItem('token')
    },
    params: {
      "module": "opportunity",
      "relatedmodule": "operationalexpense",
      "ipp": "200",
      "recordid": id
    }
  }

  )
    .then(res => {
      let totAmnt = 0;
      for (let i = 0; i < res.data.data.length; i++) {
        totAmnt = totAmnt + parseFloat(res.data.data[i].amount)
      }
      setOpExpTotAmount(totAmnt)
      logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
        "module": "opportunity",
        "relatedmodule": "operationalexpense",
        "ipp": "200",
        "recordid": id
      }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
      if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
      }
    })
    .catch(err => {
      console.log(err)
      setLoading(err.message)
      logData = [{...viewData, 'module_name': module_name, 'api': `/${'relatedmodule'}`, 'payload':{
        "module": "opportunity",
        "relatedmodule": "operationalexpense",
        "ipp": "200",
        "recordid": id
      }, 'response':[], 'error_details': err, 'status_code':'' }];
      if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
        recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
      }
    })
}}

const fetchPayCostData = async () => {
  //to get total amount of payroll costs
  if(module_name == "opportunity" && related_module == "payrollcosts"){
  await axios.get("/"+tenantCname+"/api/relatedmodule", {
    headers: {
      "Accept": "application/JSON",
      "Authorization": "Bearer" + " " + localStorage.getItem('token')
    },
    params: {
      "module": "opportunity",
      "relatedmodule": "payrollcosts",
      "ipp": "200",
      "recordid": id
    }
  })
    .then(res => {
      let totAmnt = 0;
      for (let i = 0; i < res.data.data.length; i++) {
        totAmnt = totAmnt + parseFloat(res.data.data[i].amount)
      }
      setPayCostTotAmount(totAmnt)
      logData = [{...viewData, 'module_name': 'opportunity', 'api': `/${'relatedmodule'}`, 'payload':{
        "module": "opportunity",
        "relatedmodule": "operationalexpense",
        "ipp": "200",
        "recordid": id
      }, 'response':res.data, 'status_code': res.status, 'error_details': ''}];
      if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
          recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
      }
    })
    .catch(err => {
      console.log(err)
      setLoading(err.message)
      logData = [{...viewData, 'module_name': 'opportunity', 'api': `/${'relatedmodule'}`, 'payload':{
        "module": "opportunity",
        "relatedmodule": "operationalexpense",
        "ipp": "200",
        "recordid": id
      }, 'response':[], 'error_details': err, 'status_code':'' }];
      if(Number(process.env.REACT_APP_DEBUG_MODE) === 1 || Number(sessionStorage.getItem('debugMode')) === 1){ 
        recordErrorAPIdata(localStorage.getItem('tenant_cname'), ...logData);
      }
    })
}}

const fetchData = async () => {
if(related_module=="operationalExpense"){
  getData(FIELDSAPI(tenantCname),(data)=>setDydata(data.block.Expense_Details),(err)=>console.log(err),{params: {"module": "operationalExpense"}},storage)
}
}

const fetchDataPay = async () => {
  if(related_module=="payrollcosts") useFetch(FIELDSAPI(tenantCname),(data)=>setDydataPay(data.block.Payroll_Details),(err)=>console.log(err))
}


  const all_accounts = () => {
    // navigate(-1)
    if (
      !(
        e_module_name === undefined &&
        localStorage.getItem("prev_module_name") === "opportunity" &&
        (localStorage.getItem("relatedmodule") === "operationalexpense" ||
          localStorage.getItem("relatedmodule") === "payrollcosts")
      )
    ) {
      localStorage.removeItem("relatedmodule");
    }
  };

  let mergedLineItems = []

Object.keys(cdetailsLines || {}).map((mergre => (
  mergedLineItems = [...mergedLineItems, ...cdetailsLines[mergre]]
)))

 TsalesPrice = mergedLineItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.sales_price) * Number(currentValue.qty), 0)
 TcostPrice = mergedLineItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.cost_price) * Number(currentValue.qty), 0)

 TnetOfTaxes = mergedLineItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.total_without_tax), 0)
 grand = mergedLineItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.line_total), 0)
 vat = (grand - TnetOfTaxes)
 Tdiscount = (TsalesPrice - TnetOfTaxes)
 TCdiscount = (TcostPrice - TnetOfTaxes)
 Tmargin = (TsalesPrice - (TcostPrice + Tdiscount))
 Tmarginper = (Tmargin / TsalesPrice) * 100

  let xlink = "";

  if (e_module_name != undefined) {
    let markchange = "";  
    if (e_module_name === "customer") {
      markchange = "accounts";
    } else {
      markchange = e_module_name;
    }
   
    if (e_module_name == "opportunity" || e_module_name == "opportunities" ) {
      xlink = "/home/" + markchange + "/detail-op/" + epid;
    } else { 
      xlink = "/home/" + markchange + "/detail/" + epid;
    }
  } else {
    let markchange = "";
    if (localStorage.getItem("prev_module_name") === "customer") {
      markchange = "accounts";
    } else if (localStorage.getItem("prev_module_name") === "contact") {
      markchange = "contacts";
    } else if (localStorage.getItem("prev_module_name") === "product") {
      markchange = "inventory";
    } else if (localStorage.getItem("prev_module_name") === "equipment") {
      markchange = "equipment";
    }else if(localStorage.getItem("prev_module_name") === "evmapping"){
        markchange = "evmapping"
    }else if(localStorage.getItem("prev_module_name") === "eqchild"){
        markchange = "eqchild"
    }else if(localStorage.getItem("prev_module_name") === "eqcalendar"){
        markchange = "eqcalendar"
    } else if (localStorage.getItem("prev_module_name") === "opportunity") {
      markchange = "opportunities";
    } else { 
      if (
        localStorage.getItem("relatedmodule") === "operationalexpense" ||
        localStorage.getItem("relatedmodule") === "payrollcosts"
      ) {
        localStorage.setItem("prev_c_id", cdetails.related_opportunityid);
        localStorage.setItem("prev_module_name", "opportunity");
        markchange =
          "opportunity/relatedlist/" + localStorage.getItem("prev_c_id");
      } else {
        markchange = localStorage.getItem("prev_module_name");
      }
    }
    xlink = "/home/" + markchange;
    if(localStorage.getItem('prev_module_name2') && markchange === "supplierorderreceipt"){
      xlink = "/home/" + localStorage.getItem('prev_module_name2');
    }
  }

    useEffect(() => {
    calcNetProfit();
  }, [cdetails, cdetailsLines,payrollEdit,expenseEdit])


    useEffect(() => {
      setLineObject({...lineObject, "grand_total": grand, "total_tax": vat, "operational_expenses":opExpTotAmount,"payroll_costs":payCostTotAmount, "expected_sales": TnetOfTaxes ,"expected_profit":Tmargin, "net_profit":netProfit})
    }, [cdetails, cdetailsLines,netProfit])

  const calcNetProfit = () => {
    if(copyCost){
      let grossProfit = parseFloat(Tmargin) ? parseFloat(Tmargin) : 0;
      let oppExp = parseFloat(String(expenseEdit).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) || 0;
      let payrollExp = parseFloat(String(payrollEdit).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) || 0;
      let otherExp = parseFloat(String(add['other_costs']).replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')) || 0;
      let nettProfit = Tmargin - oppExp - payrollExp - otherExp
      setNetProfit(nettProfit);
    }
    else{
      let grossProfit = apiPathData[0]["expected_profit"] || 0;
      let oppExp = apiPathData[0]["operational_expenses"] || 0;
      let payrollExp = apiPathData[0]["payroll_costs"] || 0;
      let otherExp = apiPathData[0]["other_costs"] || 0;
      let nettProfit = grossProfit - oppExp - payrollExp - otherExp
      setNetProfit(nettProfit);
    }
  }

  const functioncall = (data) => {
    data && Object.keys(data).map((k) => {
      let matchField = k.match(/_module$/g)
      if (matchField != null) {
        setUiType14Module(data[k])
      }

    })
  }
  let uiType14Module_name = uiType14Module

    if (uiType14Module_name == "customer") {
      uiType14Module_name = "accounts"
    }
    else if (uiType14Module_name == "opportunity") {
      uiType14Module_name = "opportunities"
    }
  const newline = (res)=> {
    var tempLines = null;
    if(res?.lines?.Group){
      tempLines = res.lines.Group;
      if(tempLines.nogrp){
      for(let i=0; i < tempLines.nogrp.length; i++){
        if(tempLines.nogrp[i].line_order !== (i+1)){
          tempLines.nogrp[i].line_order = i+1
        }
      }
    }}
    setCdetailsLines(tempLines)
}


  return (
    <><blockeDetail.Provider value={{blocke,setBlocke}}>
     <cDetails2.Provider value={{cdetails, setCdetails}}>
     <linedetails.Provider value={{cdetailsLines,setCdetailsLines}}>
     <linee1.Provider value={{linee, setLinee}}>
     <gen_pdf.Provider value={{generatePdf, setGeneratePdf}}> 
       
       
     <Header />
      <div className="detail_parent parent_padding">
        <div className="container-fluid col-12 pl-4 pr-4">
          {(cdetails || []).status != undefined ? (
            <div className="row pr-1">
              <div className="col-12">
                <BackToLinks  module_name={module_name} all_accounts={all_accounts} related_module={related_module} xlink={xlink} />
                
                <div className="view_page_head">
                  <div className="page_head mt-2">
                    <h3>
                      {cdetails != null
                        ? cdetails[module_name + "_name"] ||  cdetails[module_name + "_num"]
                        : "----"}
                    </h3>
                  </div>

                          <div className="crt_btn_div crt_btn_div_tab_margin">
                            {dybtn.length >= 1 ? (
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="success"
                                  className="btn-more"
                                  id="dropdown-basic dropdownMoreButton"
                                >
                                  More
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  {dybtn.map((dybt, d) => (
                                    <Dropdown.Item
                                      onClick={() => {
                                        dyclick(dybt.workflow_id, dybt.type);
                                      }}
                                      href="#"
                                      key={dybt.workflow_id}
                                    >
                                      {dybt.button_label}
                                    </Dropdown.Item>
                                  ))}
                                </Dropdown.Menu>
                              </Dropdown>
                            ) : null}
                            <DetailViewActionDropDown detailViewFiles={apiPathData && apiPathData[0].files[0]}  pdfOption={pdfOption}/>
                            {cdetails.type <= 2 ? null : (
                              <Link target='_self' to={(module_name == "opportunity" || module_name == "supplierorder" || module_name == "invoice" || module_name == "supplierorderreturn") ? "/home/" + related_list_link + "/add-edit-op" : "/home/" + related_list_link + "/add-edit"}>
                                <button onClick={editCustomerDetail} className="crt_btn edit_btn">Edit</button>
                              </Link>
                            )}
                          </div>
                        </div>
                        <RelatedIconList c_id={c_id} cdetails={cdetails} />
                        {
                          Object.keys(blocke).map((k, index) => (
                            [
                              (k != "Summary_Quote") && <div className="detail_div1" key={index}><h4 className="cst_inf">{k.replace(/_/g, " ")}</h4>
                                {
                                  k === "Opportunity_Financials" ?
                                    <div className="crncydiv">
                                      {
                                        blocke[k].map((acc, i) => (
                                          acc.show_hide_criteria === "1" && acc.fieldname === "currency" ?
                                            [
                                              <label key={i}>{acc.fieldlabel}</label>,
                                              // cdetails[acc.fieldname]
                                              // <select key={acc.fieldname} name={acc.fieldname} value={add['currencyid'] || custom.currency} onChange={changeHandle}>
                                              <label key={acc.fieldname} name={acc.fieldname} defaultValue={cdetails[acc.fieldname]} style={{ color: 'black' }} disabled>

                                                {/* <option hidden>Select</option> */}
                                                { <option key={i} >{cdetails[acc.fieldname]}</option>}
                                              </label>
                                            ] : null
                                        ))
                                      }
                                    </div> : null
                                }
                              </div>,
                              <div className={k === "Contact_Information" ? "detail_div2 with_salutation" : "detail_div2"} key={k}>
                                <div className="details_field_1">
                                  <div className="row">
                                    {
                                      blocke[k].map((acc, i) => (
                                        acc.show_hide_criteria == 1 && acc.fieldname != "currency" && acc.uitype !== 10 && acc.fieldname != "quote_summary" ?
                                          [acc.fieldname != "currency" ?
                                            <div key={acc.fieldlabel} className="col-lg-2 col-md-5 col-sm-5 col-12">
                                              <div className="key"><><Trans>{acc.fieldlabel}</Trans></></div>
                                            </div> : null,
                                            acc.fieldname !== "salutation" ?
                                              <div key={acc.fieldname} className="col-lg-3 col-md-7 col-sm-7 col-12">
                                                {acc.uitype !== 14 ?
                                                  acc.uitype !== 6 ?
                                                  acc.uitype !== 11 ?
                                                    acc.uitype !== 5 ?
                                                      acc.uitype !== 3 ?
                                                        (<div className="value">{(cdetails[acc.fieldname] == "" && (acc.fieldname === "block" ||acc.fieldname === "min_hour" || acc.fieldname === "max_hour")) ? "0" : cdetails[acc.fieldname] == "0" ? " " : (((cdetails[acc.fieldname] || '') && acc.uitype == 9) ? (cdetails[acc.fieldname]) : acc.fieldname === "date" ? (Moment(cdetails[acc.fieldname]).format("DD-MM-YYYY") == "Invalid date" ? cdetails.date : Moment(cdetails[acc.fieldname]).format("DD-MM-YYYY")) : <>{cdetails[acc.fieldname]}</>)}</div>) :
                                                        <div className="value pre"><pre>{cdetails[acc.fieldname] == "0" ? " " : (module_name === 'embedding' && cdetails["embedding_type"] === 'IFrame' && cdetails[acc.fieldname].indexOf('trimmedValue') !== -1) ? window.location.origin + '/#/home' + cdetails[acc.fieldname].split('trimmedValue')[1] : cdetails[acc.fieldname]}</pre></div> :
                                                     (cdetails[acc.fieldname] === "1" || 1) && acc.uitype === 5?
                                                        <input type="checkbox" readonly checked={true}>
                                                          </input> : <input type='checkbox' readonly checked={false}></input>
                                                      :
                                                      // uitype 11
                                                         
                                                      <div className="value"> { lineObject[acc.fieldname]&&lineObject[acc.fieldname]?(copyCost ? cdetails[acc.fieldname]||parseInt(lineObject[acc.fieldname]).toFixed(2) : cdetails[acc.fieldname]): cdetails[acc.fieldname]}</div>
                                                    :
                                                    // uitype 6
                                                    (cdetails[acc.fieldname] || '').match("(Deleted)") ? <div className="value newValue"><Link to="#" onClick={() => setSmShow(true)} rel="noopener noreferrer">{cdetails[acc.fieldname] == "0" ? " " : cdetails[acc.fieldname]}</Link></div> :
                                                      <div className="value">
                                                        <Link target='_self' onClick={() => localStorage.setItem("prev_module_name", acc.fieldname.slice(8, acc.fieldname.length))}
                                                          to={"/home/" + (acc.fieldname.slice(8, acc.fieldname.length) === 'customer' ? 'accounts' : acc.fieldname.slice(8, acc.fieldname.length) === 'opportunity' ? 'opportunities' : acc.fieldname.slice(8, acc.fieldname.length))
                                                            + [["/detail/" + cdetails["related_" + acc.fieldname.slice(8, acc.fieldname.length) + "id"]]]} rel="noopener noreferrer"> {cdetails[acc.fieldname] == "0" ? "" : cdetails[acc.fieldname]}
                                                        </Link>
                                                      </div>
                                                  // uitype 14
                                                  :
                                                  <div className="value">
                                                      
                                                  {acc.fieldlabel === "Event" || acc.fieldlabel === "Stock Location" ||  acc.fieldlabel === "Related To" || acc.fieldlabel === "Delivery Location" || acc.fieldlabel === "Related Record" ?   
                                                   acc.fieldlabel === "Event"||acc.fieldlabel === "Stock Location" || acc.fieldlabel === "Delivery Location"  ? <><span className="relatedLableColor"><Trans>{cdetails[acc.fieldname.replace(/_record$/g, "_module")]}</Trans></span><Link target='_self' onClick={() => localStorage.setItem("prev_module_name", uiType14Module)}
                                                     to={"/home/" + cdetails[acc.fieldname.replace(/_record$/g, "_module")] + '/detail/' + [cdetails[acc.fieldname.replace(/_record$/g, "_record") + 'id']]} rel="noopener noreferrer"> {cdetails[acc.fieldname]}
                                                     </Link></> : <><span className="relatedLableColor"><Trans>{cdetails?.module_name==="contact"?cdetails?.contactrelatedto_multiple_module:cdetails.related_module}</Trans></span><Link target='_self' onClick={() => localStorage.setItem("prev_module_name", uiType14Module)}
                                                     to={"/home/" + uiType14Module_name + '/detail/' + [cdetails[acc.fieldname + 'id']]} rel="noopener noreferrer">  {cdetails[acc.fieldname]}
                                                     </Link></> : <Link target='_self' onClick={() => localStorage.setItem("prev_module_name", uiType14Module)} to={((uiType14Module_name == 'invoice') || (uiType14Module_name == "supplierorder") || (uiType14Module_name == 'opportunity') ? ("/home/" + uiType14Module + '/detail-op/' + [cdetails[acc.fieldname + 'id']])
                                                       : "/home/" + uiType14Module_name + '/detail/' + [cdetails[acc.fieldname + 'id']])} rel="noopener noreferrer">  {(cdetails[acc.fieldname] == "0" ? "" : cdetails[acc.fieldname])}
                                                   </Link>}
                                                  </div>
                                                }

                                              </div> : null,
                                            acc.fieldname === "salutation"
                                              ?
                                              <div key={acc.fieldname} className={"col-lg-3 col-md-7 col-sm-7 col-12" + (cdetails[acc.fieldname] === null ? " no_salutation salute_column" : " salute_column")}>
                                                <div className="row salute_row">
                                                  <div className="col-lg-3 col-md-4 col-sm-3 col-4 pr-0">
                                                    {cdetails[acc.fieldname] == "0" ? " " : cdetails[acc.fieldname]}
                                                  </div>
                                                </div>
                                              </div> : null,

                                            // acc.fieldname == "warehouse_multiple_record"
                                            //   ?
                                            //   <div key={acc.fieldname} className={"col-lg-3 col-md-7 col-sm-7 col-12" + (cdetails["warehouse_multiple_module"] === null ? " no_salutation salute_column" : " warehouse_multiple_module")}>
                                            //     <div className="row salute_row">
                                            //       <div>
                                            //       <Trans>{cdetails["warehouse_multiple_module"] == "0" ? " " :  cdetails["warehouse_multiple_module"] === "warehouse" ? "Warehouse": cdetails["warehouse_multiple_module"]}</Trans> 
                                            //       </div>
                                            //     </div>
                                            //   </div> : null,



                                            // acc.fieldname == "deliverylocation_multiple_record"
                                            //  ?
                                            //  <div key={acc.fieldname} className={acc.fieldname === "deliverylocation_multiple_record" && module_name== "supplierorderreturn"?"col-lg-3 col-md-7 col-sm-7 col-12  deliverylocation_multiple_loction":"col-lg-3 col-md-7 col-sm-7 col-12  deliverylocation_multiple_module"}>
                                            //   <div className="row salute_row">
                                            //       <div>
                                            //  {cdetails["deliverylocation_multiple_module"] == "0" ? " " : cdetails["deliverylocation_multiple_module"]}
                                            //   </div>
                                            //  </div>
                                            //   </div> : null,

                                            acc.full_width === 1
                                              ? [
                                                <div key={i} className="col-lg-1"></div>,
                                                <div
                                                  key={acc.fieldlabel}
                                                  className="col-lg-2 col-md-5 col-sm-5 col-12"
                                                ></div>,
                                                <div
                                                  key={acc.fieldname}
                                                  className="col-lg-3 col-md-7 col-sm-7 col-12"
                                                ></div>,
                                              ]
                                              : null,

                                            <div className="col-lg-1" key={i}></div>
                                          ]
                                          : null
                                      ))
                                    }
                                  </div>
                                </div>
                              </div>, (k.match(/_Information/g) || k.match(/_Details/g) || k.match(/_Info/g) || k.match(/Details/g)) ?
                                <div className="detail_div3" key={index + k}>
                                  <div className="row">
                                    {
                                      blocke[k].map((acc, i) => (
                                        acc.uitype === 10 ?
                                          <div className="col-lg-2 col-md-5 col-sm-5 col-12" key={i}>
                                            <div className="created_date">{acc.fieldlabel} <span>{Moment(cdetails[acc.fieldname])._i}</span></div>
                                          </div> : null
                                      ))

                                    }
                                    <div className="col-lg-1"></div>
                                  </div>
                                </div> : null,

                            ]
                          ))

                        }
                        {(module_name == "opportunity" || module_name == "invoice" || module_name == "supplierorder" || module_name == "supplierorderreturn") && <LineOrder netProfit={netProfit} />}

                        {( module_name=="supplierorderreceipt") && <dblocke_value.Provider value={{blocke,groupName, setGroupName, linee, setLinee, show2, setShow2, warehouse_multiple_record, setWarehouse_multiple_record,apiPathData }}><SupplierorderReceiptLines s=" "/></dblocke_value.Provider> }
                        
                        {(module_name == "opportunity" || module_name == "invoice" || module_name == "supplierorder" || module_name == "supplierorderreturn") && <GenerateQuote generatePdf={generatePdf} rList={rlist} />}

                        {/* modal for Dynamic BUtton xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                        <Modal
                          className="dynmc_btn_mdl"
                          show={show}
                          onHide={handleClose}
                          scrollable={true}
                        >
                          <Modal.Body>
                            {snum != "run Query{}" && dy_btn_form != null
                              ? dy_btn_form.map((dbf) => [
                                <label key={dbf.fieldlabel}>{dbf.fieldlabel}</label>,
                                <br></br>,
                                <input
                                  key={dbf.fieldkey}
                                  type="text"
                                  name={dbf.fieldkey}
                                  onChange={(e) => {
                                    setDy_form_data({
                                      ...dy_form_data,
                                      [e.target.name]: e.target.value,
                                    });
                                  }}
                                ></input>,
                                <br></br>,
                              ])
                              : null}
                            <button
                              type="submit"
                              onClick={() => {
                                dysubmit(snum.stepnum);
                              }}
                              className="dynmc_btn_mdl_sub_btn"
                            >
                              Submit
                            </button>
                          </Modal.Body>
                        </Modal>

                        {/* Modal for deleted record xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                        <Modal
                          size="sm"
                          show={smShow}
                          onHide={() => setSmShow(false)}
                          aria-labelledby="example-modal-sizes-title-sm"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                              <Trans>Related Record Deleted</Trans>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>This record has been deleted.</Modal.Body>
                        </Modal>

                        {/* Modal for warning xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                        <Modal
                          show={warningModal}
                          onHide={handleCloseWarningModal}
                          className="modal_delete fade small_modal modal"
                        >
                          <Modal.Header>
                            <Modal.Title>
                              <Trans>Warning</Trans>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {/* <h5>Are you sure that you want to delete the selected <Trans>{module_name}</Trans>?</h5> */}
                            <h6>{warning}</h6>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="danger"
                              className="danger"
                              onClick={handleResetStorage}
                            >
                              Ok
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  ) : (
                    <div id="loader">{norecord}</div>
                  )}
                </div>
              </div>
              {/* </RelatedList.Provider> */}
            </gen_pdf.Provider>
          </linee1.Provider>
        </linedetails.Provider>
      </cDetails2.Provider> </blockeDetail.Provider> <Footer /> </>
  );
}

export default DetailedView;